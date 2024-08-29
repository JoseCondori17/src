import { Menu } from "./menu";

export function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-[70px] border-r">
      <Menu></Menu>
    </aside>
  );
}