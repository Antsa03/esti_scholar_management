import { SidebarItemLinks } from "@/constants/sidebarData";
import React from "react";
import SidebarItem from "./sidebarItem";

export default function SidebarListItem() {
  return (
    <ul className="w-full flex flex-col list-none">
      {SidebarItemLinks.map((item, key) => (
        <li key={key}>
          <SidebarItem item={item} />
        </li>
      ))}
    </ul>
  );
}
