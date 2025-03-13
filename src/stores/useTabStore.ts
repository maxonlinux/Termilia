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
        tabs: [...state.tabs, { id: newId, title: `New Tab` }],
        activeTab: newId,
      };
    }),

  removeTab: (id: number) =>
    set((state) => {
      const filteredTabs = state.tabs.filter((x) => x.id !== id);

      const chooseTab = () => {
        // If no tabs remain
        if (filteredTabs.length === 0) {
          return -1;
        }

        // If removed tab is active (selected)
        if (id === state.activeTab) {
          const removedTabIndex = state.tabs.findIndex((tab) => tab.id === id);
          const newIndex = Math.max(removedTabIndex - 1, 0); // Select previous tab or first tab

          return filteredTabs[newIndex].id;
        }

        return state.activeTab;
      };

      return {
        tabs: filteredTabs,
        activeTab: chooseTab(),
      };
    }),

  setTabTitle: (id: number, title: string) =>
    set((state) => ({
      tabs: state.tabs.map((tab) => (tab.id === id ? { ...tab, title } : tab)),
    })),

  setActiveTab: (id) => set({ activeTab: id }),
}));
