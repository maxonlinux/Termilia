import { Menu, MenuOptions } from "@tauri-apps/api/menu";
import { useEffect } from "react";

export default function useContextMenu(
  ref: React.RefObject<HTMLElement>,
  options: MenuOptions
) {
  useEffect(() => {
    if (!ref.current) return;

    const menuPromise = Menu.new({ items: options.items });

    async function showContextMenu(event: MouseEvent) {
      event.preventDefault();
      const menu = await menuPromise;
      menu.popup();
    }

    const element = ref.current;
    element.addEventListener("contextmenu", showContextMenu);

    return () => {
      element.removeEventListener("contextmenu", showContextMenu);
    };
  }, [ref, options]);

  return null;
}
