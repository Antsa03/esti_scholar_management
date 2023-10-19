import { Sublink } from "@/constants/sidebarData";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

type SublinkProps = {
  sublink: Sublink[];
};

function Sublink({ sublink }: SublinkProps) {
  const pathname = usePathname();

  return (
    <ul className=" list-none h-auto pl-14 ">
      {sublink.map((sublink, key) => (
        <li
          key={key}
          className={`mb-2 ${pathname === sublink.route ? "active" : ""}`}
        >
          <Link href={sublink.route}>
            <div className=" block relative h-auto">{sublink.label}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Sublink;
