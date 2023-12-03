import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [navbar, setNavbar] = useState<boolean>(false);

  return (
    <>
      <div className="container flex justify-between p-4 items-center">
        <div>
          <Link
            href="/"
            className="font-bold text-3xl
                    text-transparent bg-clip-text
                    bg-gradient-to-r from-rose-400 to-rose-600"
          >
            MFMP
          </Link>
        </div>
        <div>
          <ul className="sm:flex hidden">
            <li className="navbtn">
              <Link href="/">Domů</Link>
            </li>
            <li className="navbtn">
              <Link href="/porovnani">Porovnání</Link>
            </li>
            <li className="navbtn">
              <Link href="/skoly">Školy</Link>
            </li>
          </ul>
          <div className="sm:hidden block">
            <button onClick={() => setNavbar(!navbar)}>
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`bg-zinc-50 text-center text-lg py-2 ${
          navbar ? "block" : "hidden"
        }`}
      >
        <li className="navbtn">
          <Link href="/">Domů</Link>
        </li>
        <li className="navbtn">
          <Link href="/porovnani">Porovnání</Link>
        </li>
        <li className="navbtn">
          <Link href="/skoly">Školy</Link>
        </li>
      </ul>
    </>
  );
}
