"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { NavbarTopUtilisateurDatas } from "@/constants/navbarTopUtilisateur";
import { usePathname } from "next/navigation";

function NavbarTopUtilisateur() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row justify-center gap-4 h-12 w-fit relative">
      {NavbarTopUtilisateurDatas.map((item, index) => (
        <Fragment key={index}>
          <div className=" w-fit mx-4">
            <Link
              href={item.routes}
              className={`block w-[80%] text-center whitespace-nowrap ${
                pathname == item.routes ? " text-blue-600 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
            <div
              className={`${
                pathname == item.routes
                  ? "w-[120%] h-[2px] bg-blue-500 "
                  : "bg-white"
              }`}
            ></div>
          </div>
        </Fragment>
      ))}
    </nav>
  );
}

export default NavbarTopUtilisateur;
