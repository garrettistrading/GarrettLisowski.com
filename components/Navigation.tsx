"use client";

import { List, X } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/sales-lab", label: "Sales Lab" },
  { href: "/#background", label: "Background" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      menuButton.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="/" aria-label="Garrett Lisowski home">
          <span className="wordmark-symbol">GL</span>
          <span>Garrett Lisowski</span>
        </Link>

        <div className="desktop-nav-links">
          {links.map((link) => (
            <Link
              className={(pathname.startsWith("/work") && link.label === "Work") || (pathname === "/sales-lab" && link.label === "Sales Lab") ? "is-active" : ""}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link className="nav-contact" href={`mailto:Garrett@GarrettLisowski.com`}>
          Email Garrett
        </Link>

        <button
          className="nav-menu-button"
          type="button"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          ref={menuButton}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={21} /> : <List size={21} />}
        </button>
      </nav>

      {isOpen && (
        <div className="mobile-navigation" id="mobile-navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
