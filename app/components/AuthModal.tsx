import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { createPortal } from "react-dom";
import { backendURL } from "../util/constants";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    firstName?: string;
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();

  // Validation functions
  const validateEmail = (emailValue: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const validatePassword = (passwordValue: string): string | null => {
    if (passwordValue.length < 7) {
      return "Password must be at least 7 characters";
    }
    return null;
  };

  const validateFirstName = (nameValue: string): string | null => {
    if (isSignUp && !nameValue.trim()) {
      return "First name is required";
    }
    if (isSignUp && !/^[a-zA-Z0-9]+$/.test(nameValue)) {
      return "First name can only contain letters and numbers";
    }
    return null;
  };

  const isFormValid = (): boolean => {
    if (isSignUp) {
      return (
        firstName.trim() !== "" &&
        email.trim() !== "" &&
        password.trim() !== "" &&
        !validateFirstName(firstName) &&
        !validateEmail(email) &&
        !validatePassword(password)
      );
    }
    return (
      email.trim() !== "" &&
      password.trim() !== "" &&
      !validateEmail(email) &&
      !validatePassword(password)
    );
  };

  const handleFieldBlur = (field: "firstName" | "email" | "password") => {
    let errorMsg: string | null = null;
    if (field === "firstName") {
      errorMsg = validateFirstName(firstName);
    } else if (field === "email") {
      errorMsg = validateEmail(email);
    } else if (field === "password") {
      errorMsg = validatePassword(password);
    }
    setFieldErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isSignUp) {
        // TODO: this needs to be connect in the backend
        const response = await fetch(`${backendURL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            firstName,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Sign up failed");
        }

        setMessage("Account created! Please sign in.");
        setIsSignUp(false);
      } else {
        // Login endpoint
        const response = await fetch(`${backendURL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Login failed");
        }

        const { access_token } = await response.json();

        if (!access_token) {
          throw new Error("Invalid response from server");
        }

        document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

        onClose();
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-center mb-8">
          <Icon />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Stock Viewer
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track and analyze your favorite stocks
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          {isSignUp && (
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => handleFieldBlur("firstName")}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John"
              />
              {fieldErrors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleFieldBlur("email")}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleFieldBlur("password")}
              required
              minLength={7}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 px-4 py-3 rounded-xl text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setFirstName("");
              setError(null);
              setMessage(null);
              setFieldErrors({});
            }}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AuthModal;
