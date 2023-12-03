import React from "react";
import skoly from "../../data/skoly.json";
import Link from "next/link";
import ubytovani from "../../data/ubytovani.json";
import removeAccents from "remove-accents";
import { useRouter } from "next/router";
import { icoList, Ubytovani } from "@/data/data";
import Head from "next/head";

interface Location {
  x: number;
  y: number;
}

export default function School() {
  const router = useRouter();
  const rout = router.query.rout;
  const ico: string | undefined = rout ? rout[0] : undefined;
  const obor: string | undefined = rout ? rout[1] : undefined;
  const activeSchool = skoly.find((school) => school.ico.toString() === ico);

  const locations: Location[] = ubytovani.map((u) => {
    const location: Location = { x: u.x, y: u.y };
    return location;
  });

  const getNearestLocation = (loc: Location, locList: Location[]): Location => {
    let nejblizsiLokace = locList[0];
    let nejblizsiVzdalenost = distance(loc, nejblizsiLokace);

    for (let i = 1; i < locList.length; i++) {
      const aktualniLokace = locList[i];
      const aktualniVzdalenost = distance(loc, aktualniLokace);

      if (aktualniVzdalenost < nejblizsiVzdalenost) {
        nejblizsiLokace = aktualniLokace;
        nejblizsiVzdalenost = aktualniVzdalenost;
      }
    }
    return nejblizsiLokace;
  };

  const distance = (loc1: Location, loc2: Location): number => {
    return Math.sqrt((loc1.x - loc2.x) ** 2 + (loc1.y - loc2.y) ** 2);
  };

  const nearestLocation: Location = getNearestLocation(
    { x: activeSchool?.x!, y: activeSchool?.y! },
    locations
  );

  const nearestAcc: Ubytovani | undefined = ubytovani.find(
    (u) => u.x === nearestLocation.x && u.y === nearestLocation.y
  );

  return (
    <>
      <Head>
        <title>MFMP | Zobrazení školy</title>
      </Head>
      <main className="bg-index-background bg-cover bg-no-repeat">
        <div className="container">
          {skoly.map(
            (school) =>
              school.ico.toString() === ico &&
              removeAccents(school.obor_nazev).toLocaleLowerCase() ===
                obor?.toLowerCase() && (
                <>
                  <div className="py-32">
                    <h1 className="font-semibold text-4xl">{school.nazev}</h1>
                    <h2 className="mt-4 text-zinc-700 font-semibold text-xl">
                      {school.obor_nazev}
                    </h2>
                    <hr className="my-6 w-1/2" />
                    <div className="flex flex-wrap gap-10">
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 shadow-lg">
                        <h3 className="text-2xl font-semibold">Studium</h3>
                        <ul className="text-lg mt-4">
                          <li>
                            <span className="font-semibold">
                              Kód studijního oboru:{" "}
                            </span>{" "}
                            {school.obor_kod}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Délka vzdělávání v letech:{" "}
                            </span>
                            {school.vzdelavani_delka_roky}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Způsob ukončení:{" "}
                            </span>
                            {school.zpusob_ukonceni_vzdelavani}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Forma vzdělávání:{" "}
                            </span>
                            {school.forma_vzdelavani}
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 shadow-lg">
                        <h3 className="text-2xl font-medium">O škole</h3>
                        <ul className="text-lg mt-4">
                          <li>
                            <span className="font-semibold">Zřizovatel: </span>{" "}
                            {school.zrizovatel}
                          </li>
                          {school.rocni_skolne !== 0 && (
                            <li>
                              <span className="font-semibold">
                                Roční školné:{" "}
                              </span>
                              {school.rocni_skolne}
                            </li>
                          )}
                          <li>
                            <span className="font-semibold">
                              Povinná lékařská prohlídka:{" "}
                            </span>
                            {school.povinna_lekarska_prohlidka}
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 shadow-lg">
                        <h3 className="text-2xl font-medium">
                          Přijímací řízení
                        </h3>
                        <ul className="text-lg mt-4">
                          <li>
                            <span className="font-semibold">
                              Přijímací zkouška:{" "}
                            </span>{" "}
                            {school.prijimaci_zkouska}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Počet nabízených míst:{" "}
                            </span>
                            {school.pocet_nabizenych_mist}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Počet přihlášených v 1. kole:{" "}
                            </span>
                            {school.pocet_prihl_1_kolo_prij_riz}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Počet přijatých v 1. kole:{" "}
                            </span>
                            {school.pocet_prij_1_kolo_prij_riz}
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 shadow-lg">
                        <h3 className="text-2xl font-medium">Kontakt</h3>
                        <ul className="text-lg mt-4">
                          <li>
                            {school.nazev_ulice} {school.cislo_domovni}
                          </li>
                          <li>{school.nazev_obce}</li>
                          <li>
                            <Link
                              href={school.www}
                              className="text-rose-500 underline hover:text-rose-600"
                              target="_blank"
                            >
                              {school.www}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 shadow-lg">
                        <h3 className="text-2xl font-medium">
                          Nejbližší ubytování
                        </h3>
                        <ul className="text-lg mt-4">
                          <li>{nearestAcc?.nazev_organizace}</li>
                          <li>
                            <span className="font-semibold">Obec: </span>
                            {nearestAcc?.nazev_obce}
                          </li>
                          <li>
                            <span className="font-semibold">Kapacita: </span>
                            {nearestAcc?.pocet_luzkove_kapacity}
                          </li>
                          <li>
                            <span className="font-semibold">
                              Počet ubytovaných:{" "}
                            </span>
                            {nearestAcc?.uhrnny_pocet_ubyt_studentu}
                          </li>
                          <li className="mt-4">
                            <Link
                              href={nearestAcc?.www!}
                              className="text-rose-500 underline hover:text-rose-600"
                              target="_blank"
                            >
                              {nearestAcc?.www}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 w-2/5 h-80 flex shadow-lg">
                        <h3 className="text-2xl font-medium">Mapa ubytování</h3>
                      </div>
                    </div>
                    <div className="mt-20">
                      <Link href={`/skola/${ico}`} className="normalbtn2">
                        Zpět na školu
                      </Link>
                    </div>
                  </div>
                </>
              )
          )}
          {!obor && icoList.includes(parseInt(ico!)) && (
            <>
              <div className="py-32">
                <h1 className="font-semibold text-4xl">
                  {activeSchool?.nazev}
                </h1>
                <hr className="my-6 w-1/2" />
                <h3 className="text-2xl font-medium">Obory</h3>
                <ul className="flex gap-x-8 flex-wrap mt-8">
                  {skoly.map(
                    (school) =>
                      school.ico.toString() === ico && (
                        <>
                          <li>
                            <Link
                              href={`/skola/${ico}/${removeAccents(
                                school.obor_nazev
                              )}`}
                              className="normalbtn2"
                            >
                              {school.obor_nazev}
                            </Link>
                          </li>
                        </>
                      )
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
