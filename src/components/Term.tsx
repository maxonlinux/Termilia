import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { spawn } from "tauri-pty";
import { useTabStore } from "../stores/useTabStore";
import { useSettingsStore } from "../stores/useSettingsStore";

const spawnSession = (term: Terminal) => {
  return spawn("zsh", [], {
    cols: term.cols,
    rows: term.rows,
    env: {
      TERM: "xterm-256color",
    },
  });
};

const Term = ({ tabId }: { tabId: number }) => {
  const { activeTab, removeTab } = useTabStore();
  const settings = useSettingsStore();

  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize the terminal
    const term = new Terminal({
      fontFamily: settings.fontFamily,
      cursorStyle: settings.cursorStyle,
      cursorBlink: settings.cursorBlink,
      fontSize: settings.fontSize,
      theme: settings.theme,
    });

    termRef.current = term;

    // Initialize FitAddon for terminal resizing
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon); // ✅ Load addon before fitting
    term.open(terminalRef.current);
    fitAddon.fit(); // ✅ Fit after opening

    // Spawn the PTY session based on the platform
    const pty = spawnSession(term);

    // Write PTY data to the terminal
    pty.onData((data) => {
      term.write(data);
    });

    // Handle PTY exit
    pty.onExit(({ exitCode }) => {
      // Remove tab in 0.5 sec if program closed
      if (exitCode === 0) {
        term.write(`\n\nExiting...`);
        setTimeout(() => {
          removeTab(tabId);
        }, 500);

        return;
      }

      term.write(`\n\nProgram exit: ${exitCode}`);
    });

    // Send terminal input to the PTY
    term.onData((data) => pty.write(data));

    const xtermScreen = terminalRef.current.querySelector(".xterm-screen");

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit();
      pty.resize(term.cols, term.rows);
    });

    const mutationObserver = new MutationObserver(() => {
      fitAddon.fit();
      pty.resize(term.cols, term.rows);
    });

    resizeObserver.observe(terminalRef.current);

    if (xtermScreen) {
      mutationObserver.observe(xtermScreen, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    // Cleanup on component unmount
    return () => {
      term.dispose();
      pty.kill();
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!termRef.current) return;

    termRef.current.options = settings;
  }, [settings]);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center size-full ${
        activeTab === tabId ? "" : "invisible"
      }`}
      ref={terminalRef}
    />
  );
};

export default Term;
