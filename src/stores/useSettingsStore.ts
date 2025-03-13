import { create } from "zustand";
import { LazyStore } from "@tauri-apps/plugin-store";
import { ITerminalOptions } from "@xterm/xterm";

// Создаем объект хранилища
const store = new LazyStore("settings.json");

// Типы для настроек терминала
interface TerminalSettings extends ITerminalOptions {
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setCursorStyle: (style: "block" | "underline" | "bar") => void;
  setCursorBlink: (blink: boolean) => void;
  setCursorInactiveStyle: (style: "block" | "underline" | "bar") => void;
  setLineHeight: (height: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setTheme: (theme: Partial<TerminalSettings["theme"]>) => void;
  saveSettings: () => void;
}

// Zustand-хранилище
export const useSettingsStore = create<TerminalSettings>((set, get) => ({
  fontSize: 11,
  lineHeight: 1,
  letterSpacing: 1,
  fontFamily: "monospace",
  cursorStyle: "underline",
  cursorInactiveStyle: "underline",
  cursorBlink: true,
  theme: {
    background: "#0000",
    red: "\x1b[38;2;248;113;133m",
    green: "\x1b[38;2;134;239;172m",
    yellow: "\x1b[38;2;253;224;71m",
    blue: "\x1b[38;2;147;197;253m",
    magenta: "\x1b[38;2;249;168;212m",
    cyan: "\x1b[38;2;103;232;249m",
  },

  setFontSize: (size) => {
    set({ fontSize: size });
    get().saveSettings();
  },

  setFontFamily: (family) => {
    set({ fontFamily: family });
    get().saveSettings();
  },

  setCursorStyle: (style) => {
    set({ cursorStyle: style });
    get().saveSettings();
  },

  setCursorBlink: (blink) => {
    set({ cursorBlink: blink });
    get().saveSettings();
  },

  setCursorInactiveStyle: (style) => {
    set({ cursorInactiveStyle: style });
    get().saveSettings();
  },

  setLineHeight: (height) => {
    set({ lineHeight: height });
    get().saveSettings();
  },

  setLetterSpacing: (spacing) => {
    set({ letterSpacing: spacing });
    get().saveSettings();
  },

  setTheme: (theme) => {
    set((state) => ({
      theme: { ...state.theme, ...theme },
    }));
    get().saveSettings();
  },

  saveSettings: async () => {
    await store.set("terminalSettings", get());
    await store.save();
  },
}));

// Загружаем настройки при старте
export async function loadSettings() {
  const settings = await store.get("terminalSettings");
  if (settings) {
    useSettingsStore.setState(settings as TerminalSettings);
  }
}
