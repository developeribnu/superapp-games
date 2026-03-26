"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, superappInfo } from "@/data/navigation";
import { useState } from "react";
import { Menu, X, Home, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-900 text-white p-2 rounded-lg"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-950 text-white z-40 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-800">
          <Link href="/" onClick={() => setOpen(false)}>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {superappInfo.name}
            </h1>
            <p className="text-xs text-gray-400 mt-1">{superappInfo.description}</p>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === "/"
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Home size={16} />
            Dashboard
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith(`/${item.slug}`)
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight size={14} className="opacity-50" />
            </Link>
          ))}
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
