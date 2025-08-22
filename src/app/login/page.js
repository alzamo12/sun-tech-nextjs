"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/products", // redirect after login
    });

    if (res.error) setError(res.error);
    else window.location.href = res.url;
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-lg space-y-6 bg-[var(--color-primary)] mt-24 md:mt-36">
      <h2 className="text-3xl font-bold text-center text-[var(--color-base-200)]">
        Login
      </h2>

      {/* Credentials login form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-[var(--color-secondary)] 
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] 
                 bg-white text-[var(--color-base-200)]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-[var(--color-secondary)] 
                 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] 
                 bg-white text-[var(--color-base-200)]"
          required
        />
        <button
          className="w-full py-3 rounded-lg font-semibold transition 
                 bg-[var(--color-base-200)] text-[var(--color-primary)] 
                 hover:bg-[var(--color-accent)]"
        >
          Login with Email
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center">
        <div className="flex-grow h-px bg-[var(--color-secondary)]"></div>
        <span className="px-3 text-[var(--color-base-200)]">or</span>
        <div className="flex-grow h-px bg-[var(--color-secondary)]"></div>
      </div>

      {/* Google login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/products" })}
        className="w-full py-3 rounded-lg font-semibold transition 
               bg-[var(--color-accent)] text-[var(--color-primary)] 
               hover:bg-[var(--color-base-200)]"
      >
        Login with Google
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>

  );
}
