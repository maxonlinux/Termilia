import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

const Titlebar = () => {
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);

  const handleAlwaysOnTop = async () => {
    await invoke("set_always_on_top", { alwaysOnTop: true });
    setIsAlwaysOnTop(!isAlwaysOnTop);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center h-titlebar"
      data-tauri-drag-region
    >
      <button
        className="absolute right-0 top-0 group flex items-center justify-center cursor-pointer h-full aspect-square"
        onClick={handleAlwaysOnTop}
      >
        <div
          className={`relative flex items-center justify-center size-[12px] border-2 rounded-full opacity-40 group-hover:opacity-80 ${
            isAlwaysOnTop
              ? "after:absolute after:content-[''] after:block after:size-1 after:bg-white after:rounded-full"
              : ""
          }`}
        />
      </button>
    </div>
  );
};

export default Titlebar;
