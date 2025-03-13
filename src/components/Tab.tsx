import { XMarkIcon } from "@heroicons/react/16/solid";
import { useTabStore } from "../stores/useTabStore";
import { formatDistanceToNow } from "date-fns";

const Tab = ({
  tab,
}: {
  tab: {
    id: number;
  };
}) => {
  const { activeTab, removeTab, setActiveTab } = useTabStore();

  const formatDate = (date: number) => {
    const formatted = formatDistanceToNow(date, { addSuffix: true });

    // if (formatted === "less than a minute ago") return "Just now";

    return formatted;
  };

  return (
    <label
      htmlFor="tab-button"
      className={`group flex items-center gap-1 px-1 ${
        activeTab === tab.id ? "" : ""
      }`}
    >
      <button
        name="tab-button"
        className={`truncate whitespace-nowrap pl-2 max-w-32 cursor-pointer ${
          activeTab === tab.id ? "opacity-70" : "opacity-30"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {formatDate(tab.id)}
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
