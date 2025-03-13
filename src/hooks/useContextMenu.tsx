import { useEffect } from "react";
import { Menu, MenuOptions } from "@tauri-apps/api/menu";
// import { listen } from "@tauri-apps/api/event";

export function useContextMenu(options: MenuOptions) {
  const menuPromise = Menu.new({ items: options.items });

  async function showContextMenu(event: MouseEvent) {
    event.preventDefault();
    const menu = await menuPromise;
    menu.popup();
  }

  useEffect(() => {
    document.addEventListener("contextmenu", showContextMenu);

    // const unlistenPromise = listen<string>("menu-event", (event) => {
    //   const menuItem = menuItems.find((x) => x.id === event.payload);

    //   if (menuItem && menuItem.onClick) {
    //     menuItem.onClick();
    //   }
    // });

    return () => {
      document.removeEventListener("contextmenu", showContextMenu);
      //   unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  return null;
}
