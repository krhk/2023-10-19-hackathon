export default defineEventHandler(async (event) => {
    const url = 'https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Počty_žáků_v_oborech_středních_škol_zřizovaných_krajem/FeatureServer/0/query?where=1%3D1&outFields=nazev_obce,nazev_ulice,cislo_domovni,typ_cisla_domovniho,cislo_orientacni,psc,obor_nazev,nazev_okresu,nazev_organizace&outSR=4326&f=json'
    const response = await fetch(url)
    const data = await response.json()
    const schools = data.features.map((school: any) => {
        return {
            name: school.attributes.nazev_organizace,
            street: school.attributes.nazev_ulice,
            streetNumber: school.attributes.cislo_domovni,
            streetNumberType: school.attributes.typ_cisla_domovniho,
            orientationNumber: school.attributes.cislo_orientacni,
            zipCode: school.attributes.psc,
            city: school.attributes.nazev_obce,
            district: school.attributes.nazev_okresu,
            field: school.attributes.obor_nazev,
        }
    })

    for (let i = schools.length - 1; i >= 0; i--) {
        if (schools[i].field.includes("Celkem") || schools[i].field.includes("celkového") || schools[i].field.includes("z toho") || schools[i].field.includes("z řádku")) {
            schools.splice(i, 1);
            //console.log("removed");
        }
    }

    // create a list of subjects
    const _Subjects = schools.map((school: any) => {
        return school.field
    })

    // remove duplicates
    const Subjects = [...new Set(_Subjects)]



    return Subjects
})