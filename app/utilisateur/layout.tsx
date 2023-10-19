import React from "react";
import NavbarTopUtilisateur from "@/components/utilisateur/navbarTopUtilisateur";

function UtilisateurLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 w-full p-[10px] mt-4">
      <NavbarTopUtilisateur />
      <div className="">{children}</div>
    </section>
  );
}

export default UtilisateurLayout;
