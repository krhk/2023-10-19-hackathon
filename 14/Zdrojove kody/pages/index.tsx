import Image from "next/image";
import { Inter } from "next/font/google";
import {
  faArrowDown,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [firstQuestion1, setFirstQuestion1] = useState<boolean>(false);
  const [firstQuestion2, setFirstQuestion2] = useState<boolean>(false);
  const [firstQuestion3, setFirstQuestion3] = useState<boolean>(false);
  const [firstQuestion4, setFirstQuestion4] = useState<boolean>(false);

  return (
    <>
      <Head>
        <title>MFMP | Domů</title>
      </Head>
      <div className="bg-index-background bg-no-repeat bg-cover bg-left">
        <div className="container">
          <section id="header">
            <div className="text-center pb-96 pt-44">
              <h1 className="font-semibold text-5xl pt-32">
                Chcete pomoct s výběrem středních škol?
              </h1>
              <h2 className="pt-6 text-3xl">Není problém!</h2>
              <Link
                href="#howitworks"
                className="border-2 rounded-full inline-flex
               justify center p-2 px-3 mt-6 animate-bounce
               border-rose-500 hover:border-rose-600
               snap-#howitworks"
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </Link>
            </div>
          </section>
          <section id="howitworks" className="mb-8">
            <div className="flex mb-8 gap-x-8">
              <div className="ml-6">
                <h3 className="h3text text-3xl">Jak to funguje?</h3>
                <div className="max-w-xl text-lg mt-4">
                  <ul className="list-disc ml-6">
                    <li>
                      Stačí přejít do sekce porovnávač. V této fázi si vybereš
                      dvě nebo více škol, mezi kterými se potřebuješ rozhodnout.
                    </li>
                    <li>
                      Následně si školy porovnej podle informací, které
                      potřebuješ.
                    </li>
                    <li>
                      Poté, co jsi se rozhodl, která škola ti vyhovuje nebo by
                      mohla vyhovovat, tak klikni na tlačítko {'"'}Více o škole
                      {'"'}. Zde se můžeš dozvědět více informací o škole a také
                      například zjistíš tvůj nejbližší a nejrychlejší spoj do
                      školy.
                    </li>
                    <li>
                      Takto funguje náš porovnávač, tak neváhej a klikni na
                      tlačítko níže a vyzkoušej ho!
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Link href="/porovnani" className="normalbtn2">
                    Porovnat
                  </Link>
                </div>
              </div>
              <div className="mt-16">
                <Image
                  width={800}
                  height={200}
                  src="/porovnavac.png"
                  alt="Porovnavac"
                  className="rounded-lg"
                />
              </div>
            </div>
          </section>
          <section>
            <div className="mt-32">
              <h3 className="h3text text-3xl">Nemáte co porovnat?</h3>
              <div className="max-w-xl text-lg mt-4">
                <ul className="list-disc ml-6">
                  <li>Vyhledej si školu podle kritérií</li>
                  <li>Stačí zvolit všechny kritéria</li>
                  <li>Vyhledávač pro tebe vyhledá perfektní školu</li>
                  <li>
                    Poté stačí na školu kliknout a budeš přesměrován na stránku
                    školy
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <Link href="/skoly" className="normalbtn2">
                  Školy
                </Link>
              </div>
            </div>
          </section>
          <section className="pb-32">
            <div className="text-center">
              <h3 className="h3text mt-32">Máte otázku?</h3>
              <h4 className="mt-4 text-lg">Zodpovíme ji!</h4>
            </div>
            <div className="flex flex-col mt-12 mb-20 gap-y-8">
              <div className="border-2 border-zinc-950 rounded-lg px-8 py-4 gap-x-4">
                <button
                  onClick={() => setFirstQuestion1(!firstQuestion1)}
                  className="flex items-center justify-between w-full"
                >
                  <p className="font-semibold">Kdo jsme?</p>
                  <FontAwesomeIcon icon={firstQuestion1 ? faMinus : faPlus} />
                </button>
                <p className={`${!firstQuestion1 && "hidden"} mt-4`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique asperiores culpa tempora quos quidem quis expedita
                  sapiente quo quasi obcaecati aut dolorem amet laborum dicta,
                  voluptatum quam deleniti inventore accusamus!{" "}
                </p>
              </div>
              <div className="border-2 border-zinc-950 rounded-lg px-8 py-4 gap-x-4">
                <button
                  onClick={() => setFirstQuestion2(!firstQuestion2)}
                  className="flex items-center justify-between w-full"
                >
                  <p className="font-semibold">Nenašel jsem školu co hledám</p>
                  <FontAwesomeIcon icon={firstQuestion2 ? faMinus : faPlus} />
                </button>
                <p className={`${!firstQuestion2 && "hidden"} mt-4`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dicta, facilis doloremque. Sapiente recusandae a, maxime quasi
                  fugiat obcaecati officiis excepturi repellat facilis
                  architecto quibusdam temporibus deserunt quod facere ab
                  assumenda.{" "}
                </p>
              </div>
              <div className="border-2 border-zinc-950 rounded-lg px-8 py-4 gap-x-4">
                <button
                  onClick={() => setFirstQuestion3(!firstQuestion3)}
                  className="flex items-center justify-between w-full"
                >
                  <p className="font-semibold">Nenašel jsem obor co hledám</p>
                  <FontAwesomeIcon icon={firstQuestion3 ? faMinus : faPlus} />
                </button>
                <p className={`${!firstQuestion3 && "hidden"} mt-4`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                  tenetur sunt suscipit soluta earum molestias, minus laudantium
                  provident temporibus. Saepe cum sunt numquam dolorem at
                  reprehenderit amet vel corporis officiis.{" "}
                </p>
              </div>
              <div className="border-2 border-zinc-950 rounded-lg px-8 py-4 gap-x-4">
                <button
                  onClick={() => setFirstQuestion4(!firstQuestion4)}
                  className="flex items-center justify-between w-full"
                >
                  <p className="font-semibold">
                    Je možné hledat i ve více krajích?
                  </p>
                  <FontAwesomeIcon icon={firstQuestion4 ? faMinus : faPlus} />
                </button>
                <p className={`${!firstQuestion4 && "hidden"} mt-4`}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
                  nulla numquam cum quam adipisci, eum quae amet reiciendis
                  ducimus id incidunt soluta dolore! Fugiat tempore a atque
                  impedit voluptas veritatis?{" "}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
