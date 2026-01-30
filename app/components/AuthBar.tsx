"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "./AuthModal";

interface UserSummary {
  email?: string | null;
}

const AuthBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<UserSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const getSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      setUser(user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!active) return;
        setUser(session?.user ?? null);
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
    }
  }, [pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-40 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 py-3 w-full max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-row items-center gap-3 flex-shrink-0">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Stock Viewer
            </h1>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Save your favorite stocks • Sign in to get started
          </p>

          {!loading && (
            <button
              onClick={user ? handleSignOut : () => setIsModalOpen(true)}
              className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto text-center"
            >
              {user ? "Logout" : "Sign In / Create Account"}
            </button>
          )}
        </div>
      </div>
      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default AuthBar;
