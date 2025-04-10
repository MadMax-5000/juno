import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthentificated = await isAuthenticated();
    if(isUserAuthentificated) redirect("/");
  return <div className="auth-layout bg-black">{children}</div>;
};

export default AuthLayout;
