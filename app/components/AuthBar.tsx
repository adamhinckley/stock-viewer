"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UserSummary {
  email?: string | null;
}

const AuthBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let active = true;

    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      setUser(user ?? null);
      setLoading(false);
      setShow(!!user);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        setUser(session?.user ?? null);
        setShow(!!session?.user);
        setLoading(false);
      },
    );

    return () => {
      active = false;
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  // Hide on auth page to keep landing clean
  useEffect(() => {
    if (pathname === "/") {
      setShow(false);
    }
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShow(false);
    router.push("/");
    router.refresh();
  };

  if (loading || !show) return null;

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between gap-4 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm">
      <div className="mx-auto px-4 w-full max-w-6xl flex items-center justify-between gap-3 sm:gap-4 flex-col sm:flex-row">
        <div className="leading-tight">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Stock Watcher
          </h1>
        </div>
        <button
          onClick={handleSignOut}
          className="cursor-pointer inline-flex items-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 text-white dark:text-gray-900 px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthBar;
