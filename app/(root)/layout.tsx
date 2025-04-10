import { isAuthenticated } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RouteLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthentificated = await isAuthenticated();
  if(!isUserAuthentificated) redirect("/sign-in");
  return (
    <div className="flex mx-auto max-w-7xl flex-col gap-12 my-12 px-16 max-sm:px-4 max-sm:my-8 bg-black">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <h2 className="text-white text-4xl">Juno</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RouteLayout;
