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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>

      {/* Credentials login form */}
      <form onSubmit={handleCredentialsLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Login with Email
        </button>
      </form>

      {/* Google login */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/products" })}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login with Google
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
