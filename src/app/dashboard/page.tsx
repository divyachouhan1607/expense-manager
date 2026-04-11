import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignOutButton } from "@/components/sign-out-button";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-gradient-to-r from-[#D4603A] to-[#E8854A] shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt=""
                className="h-8 w-8 rounded-full border-2 border-white/40 shadow-sm"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white leading-tight">
                {session.user?.name}
              </span>
              <span className="text-[10px] text-white/60 leading-tight">
                {session.user?.email}
              </span>
            </div>
          </div>
          <SignOutButton className="rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/25 active:scale-95">
            Sign out
          </SignOutButton>
        </div>
      </header>

      <iframe
        src="/expense-app.html"
        className="flex-1 w-full border-0"
        style={{ minHeight: "calc(100vh - 52px)" }}
      />
    </main>
  );
}
