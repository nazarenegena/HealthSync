"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button>
        <Link href={"/login"}>Log in</Link>
      </button>
      <button>
        {" "}
        <Link href={"/signup"}>Sign Up</Link>
      </button>
    </form>
  );
}
