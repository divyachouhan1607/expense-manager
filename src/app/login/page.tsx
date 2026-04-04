import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#FDF6F2] to-[#F5DDD0] px-6">
      {/* Background decorative elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#D4603A]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#E8854A]/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo & branding */}
        <div className="mb-8 text-center">
          <h1 className="flex items-center justify-center gap-0 text-3xl font-extrabold tracking-tight text-[#D4603A]">
            <span>Kharcha Saathi</span>
            <Image
              src="/mascot.png"
              alt="Kharcha Saathi mascot"
              width={80}
              height={80}
              className="-ml-1 -mr-[79px] drop-shadow-lg -scale-x-100"
              priority
            />
          </h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Track smarter! Spend better!
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl border border-white/50">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-[#D4603A]">Welcome back</h2>
            <p className="mt-1 text-sm text-gray-400">
              Sign in to continue tracking your expenses
            </p>
          </div>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-semibold text-gray-700 shadow-md border border-gray-200 transition-all hover:shadow-lg hover:border-gray-300 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">secure login</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="mt-4 flex justify-center gap-6 text-center">
            <div>
              <div className="text-lg">{"🔒"}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Encrypted</div>
            </div>
            <div>
              <div className="text-lg">{"⚡"}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Instant</div>
            </div>
            <div>
              <div className="text-lg">{"🆓"}</div>
              <div className="text-[10px] text-gray-400 mt-0.5">{"It's Free"}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          {"By signing in, you agree to let Kharcha Saathi help you save more ❤️"}
        </p>
      </div>
    </main>
  );
}
