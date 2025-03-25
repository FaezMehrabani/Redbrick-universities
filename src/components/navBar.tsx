"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname(); // Get the current pathname
  // Function to check if the current link is active
  const isActive = (link: string) => pathname === link;

  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link
            href="/"
            style={isActive("/") ? styles.activeLink : styles.link}
          >
            Home
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link
            href="/favorites"
            style={isActive("/favorites") ? styles.activeLink : styles.link}
          >
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#007bff",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    gap: "20px",
    padding: 0,
  },
  navItem: {
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },
  activeLink: {
    textDecoration: "underline",
    color: "#ffcc00",
    fontWeight: "bold",
  },
};

export default NavBar;
