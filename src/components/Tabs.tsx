import { useState, useEffect } from "react";
import { useTabStore } from "../stores/useTabStore";
import Tab from "./Tab";
import { PlusIcon } from "@heroicons/react/16/solid";

const Tabs = () => {
  const [_, setUpdateTrigger] = useState(Date.now()); // Used just to re-render component to update relative time labels on tab buttons

  const { tabs, addTab } = useTabStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger(Date.now());
    }, 1000 * 30); // every 30 seconds

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex items-center divide-x divide-white/10 text-xxs overflow-x-auto w-full no-scrollbar">
      {tabs.map((tab) => (
        <Tab key={tab.id} tab={tab} />
      ))}
      <button
        onClick={addTab}
        className="flex shrink-0 items-center justify-center text-white size-6 cursor-pointer"
      >
        <PlusIcon className="size-2.5" />
      </button>
    </div>
  );
};

export default Tabs;
