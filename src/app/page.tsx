import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { GoogleSignInButton } from "@/components/google-sign-in-button";

export default async function Home() {
  let session = null;
  try {
    session = await auth();
  } catch {
    // DB may be waking up (cold start) — show landing page anyway
  }
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FDF6F2] to-[#F5DDD0] overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-end sm:justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-xl font-bold text-[#D4603A]">Kharcha</span>
          <Image src="/mascot.png" alt="" width={32} height={32} className="inline-block" />
          <span className="text-xl font-bold text-[#D4603A]">Saathi</span>
        </div>
        <GoogleSignInButton className="rounded-full bg-[#D4603A] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#D4603A]/25 transition-all hover:bg-[#c0532f] hover:shadow-xl hover:shadow-[#D4603A]/30 active:scale-95">
          Sign In
        </GoogleSignInButton>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-20 max-w-6xl mx-auto text-center">
        <div className="inline-block rounded-full bg-[#D4603A]/10 px-4 py-1.5 text-sm font-medium text-[#D4603A] mb-6">
          {"Free · Simple · Smart"}
        </div>
        <h1 className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight text-center">
          <span>
            Kharcha<span className="text-[#D4603A]"> Saathi</span>
          </span>
          <Image
            src="/mascot.png"
            alt="Kharcha Saathi mascot"
            width={120}
            height={120}
            className="drop-shadow-lg -scale-x-100 sm:-ml-2 sm:-mr-[110px] sm:w-[112px] sm:h-[112px] lg:w-[128px] lg:h-[128px] lg:-mr-[126px]"
            priority
          />
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Your companion for smarter spending!
        </p>
        <div className="mt-10">
          <div className="flex justify-center">
            <GoogleSignInButton className="flex items-center gap-3 rounded-full bg-[#D4603A] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#D4603A]/25 transition-all hover:bg-[#c0532f] hover:shadow-2xl hover:shadow-[#D4603A]/30 active:scale-95">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="white" fillOpacity="0.8" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white" fillOpacity="0.8" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white" fillOpacity="0.8" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white" fillOpacity="0.8" />
              </svg>
              Get Started with Google
            </GoogleSignInButton>
          </div>
          <a href="#features" className="mt-4 inline-block text-sm font-medium text-gray-500 hover:text-[#D4603A] transition-colors">
            {"Learn more ↓"}
          </a>
        </div>
      </section>

      {/* App Preview */}
      <section className="px-6 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-[#E8854A]/20 shadow-2xl p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl bg-gradient-to-br from-[#D4603A] to-[#E8854A] p-4 text-white text-center">
              <div className="text-xs opacity-80 uppercase tracking-wide font-semibold">Safe to Spend</div>
              <div className="text-2xl sm:text-3xl font-extrabold mt-1">{"₹12,450"}</div>
              <div className="text-xs opacity-70 mt-1">{"₹415/day left"}</div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-xs text-[#D4603A] uppercase tracking-wide font-semibold">This Month</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{"₹17,550"}</div>
              <div className="text-xs text-gray-400 mt-1">42 expenses</div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-xs text-[#D4603A] uppercase tracking-wide font-semibold">Daily Avg</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{"₹585"}</div>
              <div className="text-xs text-green-500 mt-1">{"↓ 12% vs last month"}</div>
            </div>
            <div className="rounded-xl bg-white border border-gray-100 p-4 text-center shadow-sm">
              <div className="text-xs text-[#D4603A] uppercase tracking-wide font-semibold">Top Category</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">{"🍔"}</div>
              <div className="text-xs text-gray-400 mt-1">{"Food · ₹6,200"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {"Everything you need to manage your "}
            <span className="text-[#D4603A]">kharcha</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Powerful features, zero complexity. Built for real people who want to save more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎤"
            title="Voice Input"
            description={'Just say "200 food lunch at cafe" — we\'ll log it instantly. No typing needed.'}
          />
          <FeatureCard
            icon="💰"
            title="Safe to Spend"
            description="One number tells you exactly how much you can spend today without breaking your budget."
          />
          <FeatureCard
            icon="📈"
            title="Smart Analytics"
            description="Beautiful charts show where your money goes. Monthly trends, yearly overviews, category breakdowns."
          />
          <FeatureCard
            icon="🔄"
            title="Recurring Detection"
            description="Auto-detects your subscriptions and recurring expenses. Calendar view of upcoming charges."
          />
          <FeatureCard
            icon="🎯"
            title="Budget Tracking"
            description="Set category budgets and get visual alerts when you're close to limits. Stay on track effortlessly."
          />
          <FeatureCard
            icon="🌏"
            title="Multi-Currency"
            description="Support for 18 currencies with live formatting. Perfect for travelers and global users."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-r from-[#D4603A] to-[#E8854A] p-8 sm:p-12 text-white text-center">
          <Image
            src="/mascot.png"
            alt=""
            width={80}
            height={80}
            className="mx-auto mb-4 drop-shadow-md brightness-0 invert opacity-90"
          />
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Start tracking in 10 seconds
          </h3>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            No credit card. No complex setup. Just sign in with Google and start logging your first expense.
          </p>
          <GoogleSignInButton className="rounded-full bg-white px-8 py-4 text-base font-bold text-[#D4603A] shadow-xl transition-all hover:shadow-2xl active:scale-95">
            {"Get Started — It's Free"}
          </GoogleSignInButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 max-w-6xl mx-auto text-center border-t border-[#D4603A]/10">
        <div className="flex items-center justify-center gap-0 mb-2">
          <span className="font-bold text-[#D4603A]">Kharcha Saathi</span>
          <Image src="/mascot.png" alt="" width={28} height={28} className="-ml-0.5 -scale-x-100" />
        </div>
        <p className="text-sm text-gray-400">
          {"Your companion for smarter spending!"}
        </p>
        <p className="text-sm text-gray-400">
          {"Made with ❤️ in India."}
        </p>
        <a href="/privacy" className="text-xs text-gray-400 hover:text-[#D4603A] underline mt-2 inline-block">
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all hover:shadow-lg hover:border-[#E8854A]/30 hover:-translate-y-1">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}
