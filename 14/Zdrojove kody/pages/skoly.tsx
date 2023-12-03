import React, { useState } from "react";
import skoly from "../data/skoly.json";
import { School, obceList, okresyList, oboryList } from "../data/data";
import Select, { createFilter } from "react-select";
import Link from "next/link";
import Head from "next/head";

type Form = {
  okres: string;
  obec: string;
  obor: string;
  prijimaci_zkousky: boolean | null;
  maturita: boolean | null;
  zrizovatel: string;
};

const filterConfig = {
  ignoreCase: true,
  ignoreAccents: true,
};

const okresyOptions = okresyList.map((okres) => {
  return { value: okres, label: okres };
});

const obceOptions = obceList.map((obec) => {
  return { value: obec, label: obec };
});

const oboryOptions = oboryList.map((obor) => {
  return { value: obor, label: obor };
});

const prijimaciZkouskyOptions = [
  { value: true, label: "Ano" },
  { value: false, label: "Ne" },
];

const maturitaOptions = [
  { value: true, label: "Ano" },
  { value: false, label: "Ne" },
];

const zrizovatelOption = [
  { value: "privátní sektor", label: "Soukromá škola" },
  { value: "kraj", label: "Krajská škola" },
];

export default function Skoly() {
  const [filtered, setFiltered] = useState<School[]>();

  const [form, setForm] = useState<Form>({
    okres: "",
    obec: "",
    obor: "",
    prijimaci_zkousky: null,
    maturita: null,
    zrizovatel: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSchools: School[] = skoly.filter((school) => {
      if (school.nazev_okresu === form.okres) {
        if (school.nazev_obce === form.obec) {
          if (school.obor_nazev === form.obor) {
            if (
              (school.prijimaci_zkouska === "jednotná přijímací zkouška") ===
              form.prijimaci_zkousky
            ) {
              if (
                (school.zpusob_ukonceni_vzdelavani === "maturitní zkouška") ===
                form.maturita
              ) {
                if (school.zrizovatel === form.zrizovatel) {
                  return school;
                }
              }
            }
          }
        }
      }
    });

    setFiltered(filteredSchools);
  };

  return (
    <>
      <Head>
        <title>MFMP | Školy</title>
      </Head>
      <main className="bg-index-background bg-cover bg-no-repeat">
        <div className="container">
          <div className="py-32">
            <h1 className="font-semibold text-4xl">Vyhledávání škol</h1>
            <hr className="my-6 w-1/2" />
            <form onSubmit={onSubmit}>
              <div className="flex flex-wrap gap-6">
                <Select
                  options={okresyOptions}
                  placeholder="Okres"
                  filterOption={createFilter(filterConfig)}
                  onChange={(selectedOption: any) =>
                    setForm({ ...form, okres: selectedOption.value })
                  }
                  required
                  className="w-2/5"
                />
                <Select
                  options={obceOptions}
                  placeholder="Obec"
                  filterOption={createFilter(filterConfig)}
                  onChange={(selectedOption: any) =>
                    setForm({ ...form, obec: selectedOption.value })
                  }
                  required
                  className="w-2/5"
                />
                <Select
                  options={oboryOptions}
                  placeholder="Obor"
                  filterOption={createFilter(filterConfig)}
                  onChange={(selectedOption: any) =>
                    setForm({ ...form, obor: selectedOption.value })
                  }
                  required
                  className="w-2/5"
                />
                <Select
                  options={prijimaciZkouskyOptions}
                  placeholder="Přijímací zkoušky"
                  filterOption={createFilter(filterConfig)}
                  onChange={(selectedOption: any) =>
                    setForm({
                      ...form,
                      prijimaci_zkousky: selectedOption.value,
                    })
                  }
                  required
                  className="w-2/5"
                />
                <Select
                  options={maturitaOptions}
                  placeholder="Maturita"
                  filterOption={createFilter(filterConfig)}
                  isSearchable={false}
                  isClearable={false}
                  onChange={(selectedOption: any) =>
                    setForm({ ...form, maturita: selectedOption.value })
                  }
                  required
                  className="w-2/5"
                />
                <Select
                  options={zrizovatelOption}
                  placeholder="Zřizovatel"
                  filterOption={createFilter(filterConfig)}
                  isSearchable={false}
                  isClearable={false}
                  onChange={(selectedOption: any) =>
                    setForm({ ...form, zrizovatel: selectedOption.value })
                  }
                  required
                  className="w-2/5"
                />
              </div>
              <button type="submit" className="normalbtn2 mt-8 text-md">
                Vyhledat
              </button>
              <div className="mt-16">
                {filtered?.map((school) => (
                  <>
                    <div className="bg-zinc-100 border-rose-500 border-2 rounded-lg p-8 shadow-lg mt-8 flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{school.nazev}</h3>
                      <Link
                        href={`/skola/${school.ico}`}
                        className="normalbtn text-lg"
                      >
                        Více o škole
                      </Link>
                    </div>
                  </>
                ))}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
