import skoly from "../data/skoly.json";
import React, { useState } from "react";
import { School } from "../data/data";
import Select, { createFilter } from "react-select";
import removeAccents from "remove-accents";
import Link from "next/link";
import Head from "next/head";

export default function Porovnani() {
  const [schoolCount, setSchoolCount] = useState<number>(2);
  const [selectedSchool1, setSelectedSchool1] = useState<School>();
  const [selectedSchool2, setSelectedSchool2] = useState<School>();
  const [selectedSchool3, setSelectedSchool3] = useState<School>();
  const [selectedSchool4, setSelectedSchool4] = useState<School>();

  const options: Object[] = [];

  options.push({
    value: 0,
    label: "Vyberte školu",
  });

  skoly.forEach((school) => {
    options.push({
      value: school.OBJECTID,
      label: `${school.nazev} | ${school.obor_nazev}`,
    });
  });

  return (
    <>
      <Head>
        <title>MFMP | Porovnávání</title>
      </Head>
      <main className="bg-index-background bg-cover bg-no-repeat">
        <div className="container">
          <div className="pb-32">
            <h1 className="font-semibold text-4xl pt-32">Porovnávání škol</h1>
            <hr className="my-6 w-1/2" />
            <div className="flex gap-x-6 items-center">
              <label htmlFor="school-count" className="text-lg font-semibold">
                Vyberte počet škol:{" "}
              </label>
              <Select
                options={[
                  { value: 2, label: "2" },
                  { value: 3, label: "3" },
                  { value: 4, label: "4" },
                ]}
                defaultValue={{ value: 2, label: "2" }}
                isClearable={false}
                isSearchable={false}
                onChange={(selectedOption: any) => {
                  setSchoolCount(selectedOption.value);
                }}
              />
            </div>
            <div className="mt-16 flex gap-8 flex-wrap">
              <div className="w-2/5 border-2 border-rose-500 rounded-lg p-8 bg-zinc-100 shadow-lg">
                <Select
                  options={options.slice(1)}
                  defaultValue={options[0]}
                  filterOption={createFilter({
                    ignoreAccents: true,
                    ignoreCase: true,
                  })}
                  onChange={(selectedOption: any) => {
                    const school = skoly.find(
                      (school) => school.OBJECTID === selectedOption.value
                    );
                    setSelectedSchool1(school);
                  }}
                />
                {selectedSchool1 && (
                  <div className="mt-8 text-lg">
                    <ul>
                      <li>
                        <span className="font-semibold">Obor: </span>
                        {selectedSchool1.obor_nazev}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Délka vzdělávání v letech:{" "}
                        </span>
                        {selectedSchool1.vzdelavani_delka_roky}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Způsob ukončení vzdělávání:{" "}
                        </span>
                        {selectedSchool1.zpusob_ukonceni_vzdelavani}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Počet nabízených míst:{" "}
                        </span>
                        {selectedSchool1.pocet_nabizenych_mist}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Počet přihlášených:{" "}
                        </span>
                        {selectedSchool1.pocet_prihl_1_kolo_prij_riz}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Přijímací zkouška:{" "}
                        </span>
                        {selectedSchool1.prijimaci_zkouska}
                      </li>
                      <li>
                        <span className="font-semibold">Obec: </span>
                        {selectedSchool1.nazev_obce}
                      </li>
                      <li>
                        <span className="font-semibold">Zřizovatel: </span>
                        {selectedSchool1.zrizovatel}
                      </li>
                      <li className="mt-8">
                        <Link
                          href={`/skola/${selectedSchool1.ico}/${removeAccents(
                            selectedSchool1.obor_nazev
                          )}`}
                          className="normalbtn2"
                        >
                          Více
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="w-2/5 border-2 border-rose-500 rounded-lg p-8 bg-zinc-100 shadow-lg">
                <Select
                  options={options.slice(1)}
                  defaultValue={options[0]}
                  filterOption={createFilter({
                    ignoreAccents: true,
                    ignoreCase: true,
                  })}
                  onChange={(selectedOption: any) => {
                    const school = skoly.find(
                      (school) => school.OBJECTID === selectedOption.value
                    );
                    setSelectedSchool2(school);
                  }}
                />
                {selectedSchool2 && (
                  <div className="mt-8 text-lg">
                    <ul>
                      <li>
                        <span className="font-semibold">Obor: </span>
                        {selectedSchool2.obor_nazev}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Délka vzdělávání v letech:{" "}
                        </span>
                        {selectedSchool2.vzdelavani_delka_roky}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Způsob ukončení vzdělávání:{" "}
                        </span>
                        {selectedSchool2.zpusob_ukonceni_vzdelavani}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Počet nabízených míst:{" "}
                        </span>
                        {selectedSchool2.pocet_nabizenych_mist}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Počet přihlášených:{" "}
                        </span>
                        {selectedSchool2.pocet_prihl_1_kolo_prij_riz}
                      </li>
                      <li>
                        <span className="font-semibold">
                          Přijímací zkouška:{" "}
                        </span>
                        {selectedSchool2.prijimaci_zkouska}
                      </li>
                      <li>
                        <span className="font-semibold">Obec: </span>
                        {selectedSchool2.nazev_obce}
                      </li>
                      <li>
                        <span className="font-semibold">Zřizovatel: </span>
                        {selectedSchool2.zrizovatel}
                      </li>
                      <li className="mt-8">
                        <Link
                          href={`/skola/${selectedSchool2.ico}/${removeAccents(
                            selectedSchool2.obor_nazev
                          )}`}
                          className="normalbtn2"
                        >
                          Více
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              {schoolCount > 2 && (
                <div className="w-2/5 border-2 border-rose-500 rounded-lg p-8 bg-zinc-100 shadow-lg">
                  <Select
                    options={options.slice(1)}
                    defaultValue={options[0]}
                    filterOption={createFilter({
                      ignoreAccents: true,
                      ignoreCase: true,
                    })}
                    onChange={(selectedOption: any) => {
                      const school = skoly.find(
                        (school) => school.OBJECTID === selectedOption.value
                      );
                      setSelectedSchool3(school);
                    }}
                  />
                  {selectedSchool3 && (
                    <div className="mt-8 text-lg">
                      <ul>
                        <li>
                          <span className="font-semibold">Obor: </span>
                          {selectedSchool3.obor_nazev}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Délka vzdělávání v letech:{" "}
                          </span>
                          {selectedSchool3.vzdelavani_delka_roky}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Způsob ukončení vzdělávání:{" "}
                          </span>
                          {selectedSchool3.zpusob_ukonceni_vzdelavani}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Počet nabízených míst:{" "}
                          </span>
                          {selectedSchool3.pocet_nabizenych_mist}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Počet přihlášených:{" "}
                          </span>
                          {selectedSchool3.pocet_prihl_1_kolo_prij_riz}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Přijímací zkouška:{" "}
                          </span>
                          {selectedSchool3.prijimaci_zkouska}
                        </li>
                        <li>
                          <span className="font-semibold">Obec: </span>
                          {selectedSchool3.nazev_obce}
                        </li>
                        <li>
                          <span className="font-semibold">Zřizovatel: </span>
                          {selectedSchool3.zrizovatel}
                        </li>
                        <li className="mt-8">
                          <Link
                            href={`/skola/${
                              selectedSchool3.ico
                            }/${removeAccents(selectedSchool3.obor_nazev)}`}
                            className="normalbtn2"
                          >
                            Více
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
              {schoolCount > 3 && (
                <div className="w-2/5 border-2 border-rose-500 rounded-lg p-8 bg-zinc-100 shadow-lg">
                  <Select
                    options={options.slice(1)}
                    defaultValue={options[0]}
                    filterOption={createFilter({
                      ignoreAccents: true,
                      ignoreCase: true,
                    })}
                    onChange={(selectedOption: any) => {
                      const school = skoly.find(
                        (school) => school.OBJECTID === selectedOption.value
                      );
                      setSelectedSchool4(school);
                    }}
                  />
                  {selectedSchool4 && (
                    <div className="mt-8 text-lg">
                      <ul>
                        <li>
                          <span className="font-semibold">Obor: </span>
                          {selectedSchool4.obor_nazev}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Délka vzdělávání v letech:{" "}
                          </span>
                          {selectedSchool4.vzdelavani_delka_roky}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Způsob ukončení vzdělávání:{" "}
                          </span>
                          {selectedSchool4.zpusob_ukonceni_vzdelavani}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Počet nabízených míst:{" "}
                          </span>
                          {selectedSchool4.pocet_nabizenych_mist}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Počet přihlášených:{" "}
                          </span>
                          {selectedSchool4.pocet_prihl_1_kolo_prij_riz}
                        </li>
                        <li>
                          <span className="font-semibold">
                            Přijímací zkouška:{" "}
                          </span>
                          {selectedSchool4.prijimaci_zkouska}
                        </li>
                        <li>
                          <span className="font-semibold">Obec: </span>
                          {selectedSchool4.nazev_obce}
                        </li>
                        <li>
                          <span className="font-semibold">Zřizovatel: </span>
                          {selectedSchool4.zrizovatel}
                        </li>
                        <li className="mt-8">
                          <Link
                            href={`/skola/${
                              selectedSchool4.ico
                            }/${removeAccents(selectedSchool4.obor_nazev)}`}
                            className="normalbtn2"
                          >
                            Více
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
