"use client";
import React from "react";
import "../component/navbar.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="Navbar">
      <div className="NavLog w-80">
        <h1 className="NavHello">ToDo,</h1>
        <h1 className="NavName">Employee Task</h1>
      </div>
      <nav className="NavRoutes w-full justify-end">
        <Link
          href="/employee"
          className={
            pathname === "/employee" || pathname === "/" ? "active" : ""
          }
        >
          Employee
        </Link>
        <Link
          href="/project"
          className={pathname === "/project" ? "active" : ""}
        >
          Project
        </Link>
        <Link href="/task" className={pathname === "/task" ? "active" : ""}>
          Task
        </Link>
      </nav>
         
    </div>
  );
}
