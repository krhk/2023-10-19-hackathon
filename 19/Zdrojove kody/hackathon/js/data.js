
export async function seznamSkolPar(parametr) {
    async function seznamSkol(filtr) {
        const response = await fetch("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Seznam_škol_a_školských_zařízení/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=json");
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const skoly = data.features
                .filter(feature => feature.attributes.nazev.toLowerCase().includes(filtr.toLowerCase()))
                .map(feature => {
                    const skolaInfo = {
                        nazev: feature.attributes.nazev,
                        ico: feature.attributes.ico,
                        zrizovatel: feature.attributes.zrizovatel,
                        redizo: feature.attributes.redizo,
                        zarizeni_druh: feature.attributes.zarizeni_druh,
                        adresa: {
                            ulice: feature.attributes.nazev_ulice,
                            cislo_domovni: feature.attributes.cislo_domovni,
                            typ_cisla_domovniho: feature.attributes.typ_cisla_domovniho,
                            cislo_orientacni: feature.attributes.cislo_orientacni,
                            obec: feature.attributes.nazev_obce,
                            psc: feature.attributes.psc,
                        },
                        poloha: {
                            x: feature.attributes.x,
                            y: feature.attributes.y,
                        },
                        www: feature.attributes.www,
                    };

                    return parametr ? skolaInfo[parametr] : skolaInfo;
                });

            return skoly;
        } else {
            console.log("Nenalezeny žádné školy.");
            return [];
        }
    }

    try {
        const poleSkol = await seznamSkol("střední");
        //console.log(poleSkol);
        return poleSkol;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function seznamUbytoven(parametr) {
    async function seznamUbytoven(filtr) {
        const response = await fetch("https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počet_ubytovaných_v_DDM_a_internátech/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=json");
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const ubytovny = data.features
                .map(feature => {
                    const ubytovnaInfo = {
                        nazev_organizace: feature.attributes.nazev_organizace,
                        ico: feature.attributes.ico,
                        identifikator_reditelstvi: feature.attributes.identifikator_reditelstvi,
                        zrizovatel: feature.attributes.zrizovatel,
                        nazev_vusc: feature.attributes.nazev_vusc,
                        kod_vusc: feature.attributes.kod_vusc,
                        nazev_okresu: feature.attributes.nazev_okresu,
                        kod_okresu: feature.attributes.kod_okresu,
                        nazev_orp: feature.attributes.nazev_orp,
                        kod_orp: feature.attributes.kod_orp,
                        nazev_obce: feature.attributes.nazev_obce,
                        kod_obce: feature.attributes.kod_obce,
                        nazev_ulice: feature.attributes.nazev_ulice,
                        cislo_domovni: feature.attributes.cislo_domovni,
                        typ_cisla_domovniho: feature.attributes.typ_cisla_domovniho,
                        cislo_orientacni: feature.attributes.cislo_orientacni,
                        pocet_luzkove_kapacity: feature.attributes.pocet_luzkove_kapacity,
                        celkovy_pocet_pokoju: feature.attributes.celkovy_pocet_pokoju,
                        uhrnny_pocet_ubyt_studentu: feature.attributes.uhrnny_pocet_ubyt_studentu,
                        www: feature.attributes.www,
                        poloha: {
                            x: feature.attributes.x,
                            y: feature.attributes.y,
                        },
                    };

                    return parametr ? ubytovnaInfo[parametr] : ubytovnaInfo;
                });

            return ubytovny;
        } else {
            console.log("Nenalezeny žádné ubytovny.");
            return [];
        }
    }

    try {
        const poleUbytoven = await seznamUbytoven();
        // console.log(poleUbytoven);
        return poleUbytoven;
    } catch (error) {
        console.error(error);
        throw error;
    }
}