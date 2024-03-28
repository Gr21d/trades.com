import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/account/sing_in">Sign In</Link>
      <Link href="/account/sign_up">Sign Up</Link>
    </main>
  );
}
