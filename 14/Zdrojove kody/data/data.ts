import skoly from "./skoly.json";

export const icoList: number[] = skoly.map((school) => school.ico);

// vytvor mi pole vsech obci, kdyz jsou stejna, tak pouze jedno z nich

const obce: string[] = [];
const okresy: string[] = [];
const obory: string[] = [];

skoly.forEach(
  (school) => !obce.includes(school.nazev_obce) && obce.push(school.nazev_obce)
);

skoly.forEach(
  (school) =>
    !okresy.includes(school.nazev_okresu) && okresy.push(school.nazev_okresu)
);

skoly.forEach(
  (school) =>
    !obory.includes(school.obor_nazev) && obory.push(school.obor_nazev)
);

export const obceList: string[] = obce;
export const okresyList: string[] = okresy;
export const oboryList: string[] = obory;

export type School = {
  OBJECTID: number;
  nazev: string;
  ico: number;
  zrizovatel: string;
  pravni_forma: string;
  redizo: number;
  izo: string | number;
  obor_nazev: string;
  obor_kod: string;
  nazev_svp_zamereni_oboru: string;
  vzdelavani_delka_roky: number;
  zpusob_ukonceni_vzdelavani: string;
  pocet_prihl_1_kolo_prij_riz: number;
  pocet_prij_1_kolo_prij_riz: number;
  pocet_nabizenych_mist: number;
  rocni_skolne: number;
  prijimaci_zkouska: string;
  forma_vzdelavani: string;
  druh_vzdelavani: string;
  obor_urcen_pro_uchaz_s_uk_vzd: string;
  obor_vhodny_pro_ozp: string;
  povinna_lekarska_prohlidka: string;
  poznamka: string;
  nazev_vusc: string;
  kod_vusc: string;
  nazev_okresu: string;
  kod_okresu: string;
  nazev_orp: string;
  kod_orp: number;
  nazev_obce: string;
  kod_obce: number;
  nazev_ulice: string;
  cislo_domovni: number;
  typ_cisla_domovniho: string;
  cislo_orientacni: string | number;
  psc: number;
  www: string;
  wkt: string;
  x: number;
  y: number;
  dp_id: string;
};

export type Ubytovani = {
  OBJECTID: number;
  nazev_organizace: string;
  ico: number;
  identifikator_reditelstvi: number;
  zrizovatel: string;
  nazev_vusc: string;
  kod_vusc: string;
  nazev_okresu: string;
  kod_okresu: string;
  nazev_orp: string;
  kod_orp: number;
  nazev_obce: string;
  kod_obce: number;
  nazev_ulice: string;
  cislo_domovni: number;
  typ_cisla_domovniho: string;
  cislo_orientacni: string | number;
  pocet_luzkove_kapacity: number;
  celkovy_pocet_pokoju: number;
  uhrnny_pocet_ubyt_studentu: number;
  www: string;
  wkt: string;
  x: number;
  y: number;
  dp_id: string;
};
