import "./App.css";
import Term from "./components/Term";
import Tabs from "./components/Tabs";
import { useTabStore } from "./stores/useTabStore";
import { useContextMenu } from "./hooks/useContextMenu";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import Titlebar from "./components/Titlebar";
import { loadSettings } from "./stores/useSettingsStore";
import Settings from "./components/Settings";

async function handleResize() {
  const isFullscreen = await getCurrentWindow().isMaximized();

  document.body.classList.toggle("fullscreen", isFullscreen);
}

function App() {
  const { tabs, addTab } = useTabStore();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useContextMenu({
    items: [
      {
        id: "ctx_new_tab",
        text: "New Tab",
        action: () => addTab(),
        accelerator: "cmd+N",
      },
      { item: "Separator" },
      {
        id: "ctx_open_settings",
        text: "Settings",
        action: () => setSettingsOpen((prev) => !prev),
        accelerator: "cmd+S",
      },
    ],
  });

  useEffect(() => {
    loadSettings();
    handleResize();

    const unlisten = getCurrentWindow().listen("tauri://resize", async () => {
      handleResize();
    });

    return () => {
      unlisten.then((u) => u());
    };
  }, []);

  return (
    <div className="flex flex-col size-full">
      <Titlebar />
      <div className="flex size-full">
        <aside
          className={`flex flex-col transition-all h-full shrink-0 ${
            settingsOpen ? "w-64" : "w-0"
          }`}
        >
          <Settings setIsOpen={setSettingsOpen} />
        </aside>
        <main className="flex flex-col size-full overflow-auto">
          <div className="relative flex flex-1 px-1.5">
            {tabs.length > 0 ? (
              <div className="overflow-hidden size-full py-2 bg-black/30 border border-white/10 rounded-xl">
                <div className="relative h-full">
                  {tabs.map((tab) => (
                    <Term key={tab.id} tabId={tab.id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex size-full items-end p-1 text-xs">
                <div className="p-1 rounded-md border border-white/5 bg-white/5 shadow-md">
                  <span className="opacity-50">Press "+" to open new tab</span>
                </div>
              </div>
            )}
          </div>
          <Tabs />
        </main>
      </div>
    </div>
  );
}

export default App;
