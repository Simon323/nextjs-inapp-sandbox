import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav className="flex py-4 px-6 border-b border-gray-200">
      <Link className="ml-2" href="/">
        Home
      </Link>
      <Link className="ml-2" href="/jwt">
        JWT
      </Link>
      <Link className="ml-2" href="/sandbox">
        Sandbox
      </Link>
      <div className="ml-auto"></div>
    </nav>
  );
}

export default Nav;
