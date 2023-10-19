"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth";

import { faEnvelope, faBell, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopbarContainer() {
  const { data: session }: any = useSession();
  if (session)
    return (
      <div className="bg-custom-primary-white flex flex-row flex-nowrap justify-between items-center w-full h-[80] shadow-lg z-10">
        <div className="flex flex-row gap-0 items-center w-[257px]">
          <img
            src="/img/logo.png"
            alt="Logo de l'Esti"
            width={70}
            height={32}
            placeholder="blur"
          />
          <h1 className="text-orange-400 font-semibold text-base">
            Scholar Management
          </h1>
        </div>
        <div className="flex flex-row px-4 py-2 gap-4 justify-center items-center">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faBell} />
          <FontAwesomeIcon icon={faFlag} />
          <img
            src={`/img/photo_profil/${session?.user.image}`}
            className="rounded-full w-[48px] h-[48px]"
            alt="Image de profil"
          />
          <span>{session?.user.name}</span>
          <span>{session?.user.role}</span>
          <LogoutButton />
        </div>
      </div>
    );
}

export default TopbarContainer;
