import { XMarkIcon } from "@heroicons/react/16/solid";
import { useTabStore } from "../stores/useTabStore";
import { formatDistanceToNow } from "date-fns";
import useContextMenu from "../hooks/useContextMenu";
import { useRef, useState } from "react";
import InputAutosize from "./common/InputAutosize";

const Tab = ({
  tab,
}: {
  tab: {
    id: number;
    title: string;
  };
}) => {
  const { activeTab, removeTab, setActiveTab, setTabTitle } = useTabStore();

  const [isRenaming, setIsRenaming] = useState(false);

  const tabRef = useRef<HTMLLabelElement | null>(null);
  const tabNameRef = useRef<HTMLInputElement | null>(null);

  useContextMenu(tabRef, {
    items: [
      {
        id: `close-tab_${tab.id}`,
        text: "Close",
        action: () => removeTab(tab.id),
        accelerator: "option+C",
      },
      {
        id: `rename_tab_${tab.id}`,
        text: "Rename",
        action: () => {
          setIsRenaming(true);
        },
        accelerator: "option+R",
      },
    ],
  });

  return (
    <label
      ref={tabRef}
      htmlFor="tab-button"
      className="group flex items-center gap-1 px-1"
    >
      <button
        name="tab-button"
        className={`truncate whitespace-nowrap pl-2 max-w-32 cursor-pointer ${
          activeTab === tab.id || isRenaming ? "opacity-70" : "opacity-30"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {isRenaming ? (
          <InputAutosize
            type="text"
            ref={tabNameRef}
            value={tab.title}
            onChange={(e) => setTabTitle(tab.id, e.target.value)}
            autoFocus
            onBlur={() => setIsRenaming(false)}
            readOnly={!isRenaming}
          />
        ) : (
          tab.title || formatDistanceToNow(tab.id, { addSuffix: true })
        )}
      </button>
      <button
        className="flex items-center justify-center size-4 rounded-[5px] text-white/50 hover:text-white cursor-pointer"
        onClick={() => removeTab(tab.id)}
      >
        <XMarkIcon className="size-2.5" />
      </button>
    </label>
  );
};

export default Tab;
