import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="container">
        <div className="flex justify-between px-8 my-12">
          <div>
            <h4 className="font-semibold text-xl">MFMP</h4>
            <ul className="mt-2 list-disc ml-6">
              <li>
                <Link href="/" className="footeritem">
                  Domů
                </Link>
              </li>
              <li>
                <Link href="/porovnani" className="footeritem">
                  Porovnání
                </Link>
              </li>
              <li>
                <Link href="/skoly" className="footeritem">
                  Školy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl">Odkazy</h4>
            <ul className="mt-2 list-disc ml-6">
              <li>
                <Link href="#" className="footeritem">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="footeritem">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="footeritem">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl">Kontakt</h4>
            <ul className="mt-2 list-disc ml-6">
              <li>
                <Link href="mailto:mail@mail.com" className="footeritem">
                  Mail
                </Link>
              </li>
              <li>
                <Link href="#" className="footeritem">
                  Telefon
                </Link>
              </li>
              <li>
                <Link href="#" className="footeritem">
                  Adresa
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center py-8 text-xl">
          <h4 className="font-semibold">© MFMP 2023</h4>
          <h5 className="text-lg">
            Vytvořil{" "}
            <Link href="#" className="font-semibold hover:underline">
              MFMP
            </Link>
          </h5>
        </div>
      </div>
    </>
  );
}
