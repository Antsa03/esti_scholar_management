import React from "react";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]/index";
import Login from "./login";
import { redirect } from "next/navigation";

async function Auth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Login />;
  } else {
    return redirect("/accueil");
  }
}

export default Auth;
