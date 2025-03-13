import { create } from "zustand";

interface Tab {
  id: number;
  title: string;
}

interface TabStore {
  tabs: Tab[];
  activeTab: number;
  addTab: () => void;
  removeTab: (id: number) => void;
  setActiveTab: (id: number) => void;
  setTabTitle: (id: number, title: string) => void;
}

const initialTab = {
  id: Date.now(),
  title: "Get started",
};

export const useTabStore = create<TabStore>((set) => ({
  tabs: [initialTab],
  activeTab: initialTab.id,

  addTab: () =>
    set((state) => {
      const newId = Date.now();
      return {
        tabs: [...state.tabs, { id: newId, title: `${newId}` }],
        activeTab: newId,
      };
    }),

  removeTab: (id: number) =>
    set((state) => {
      const filteredTabs = state.tabs.filter((x) => x.id !== id);
      const isActiveRemoved = id === state.activeTab;

      return {
        tabs: filteredTabs,
        activeTab:
          filteredTabs.length === 0
            ? -1 // if no tabs remain
            : isActiveRemoved
            ? (() => {
                const removedTabIndex = state.tabs.findIndex(
                  (tab) => tab.id === id
                );
                const newIndex = Math.max(removedTabIndex - 1, 0); // Select previous tab or first tab
                return filteredTabs[newIndex].id;
              })()
            : state.activeTab,
      };
    }),

  setTabTitle: (id: number, title: string) =>
    set((state) => ({
      tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, title } : tab)),
    })),

  setActiveTab: (id) => set({ activeTab: id }),
}));
