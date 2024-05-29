"use client";
import "../component/navbar.scss";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="Navbar">
      <div className="NavLog">
        <h1 className="NavHello">Hello,</h1>
        <h1 className="NavName">my name Vero</h1>
      </div>
      <nav className="NavRoutes">
        <Link href="employee">Employee</Link>
        <Link href="project">Project</Link>
        <Link href="task">Task</Link>
      </nav>
    </div>
  );
}
