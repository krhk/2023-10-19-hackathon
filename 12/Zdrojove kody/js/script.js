"use strict";
var schools = [];
var currentSelection = [];
var obce = [];
var _obory = [];
var prijimacky = [];
const bounds = new L.LatLngBounds(new L.LatLng(50.8580089, 14.7970539), new L.LatLng(49.8999750, 16.7910717));
var map = L.map('map', {
    center: bounds.getCenter(),
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
}).setView([50.3993594, 15.8160350], 9);
async function getSchools() {
    const json = await (await fetch('./data/skoly.geojson')).json();
    const jsonPrijimacky = await (await fetch('./data/prijimaci_rizeni.geojson')).json();
    const jsonUbytovani = await (await fetch('./data/ubytovani.geojson')).json();
    json.features = json.features.filter((val) => {
        switch (val.properties.zarizeni_druh) {
            // case 'Základní škola':
            case 'Střední škola':
            case 'Vyšší odborná škola':
                // case 'Základní umělecká škola':
                //case 'Jazyková škola s právem státní jazykové zkoušky': //?
                //case 'Fakulta vojenského zdravotnictví':
                //case 'Přírodovědecká fakulta UHK':
                //case 'Lékařská fakulta':
                //case 'Farmaceutická fakulta':
                return true;
            default:
                return false;
        }
    });
    for (const s of json.features) {
        const props = s.properties;
        const prijimackyFiltered = jsonPrijimacky.features.filter((val) => {
            if (val.properties.nazev.toLocaleLowerCase() == props.nazev.toLocaleLowerCase())
                return true;
            return false;
        });
        let obory = [];
        for (const f of prijimackyFiltered) {
            const prij = f.properties;
            const obor = {
                nazev: prij.obor_nazev,
                kod: prij.obor_kod,
                delka_vzdelavani: prij.vzdelavani_delka_roky,
                forma_vzdelani: prij.forma_vzdelavani,
                zpusob_ukonceni: prij.zpusob_ukonceni_vzdelavani,
                prijimaci_zkouska: prij.prijimaci_zkouska,
                skolne: prij.rocni_skolne,
                uspesnost: {
                    prihlaseni: prij.pocet_prihl_1_kolo_prij_riz,
                    prijati: prij.pocet_prij_1_kolo_prij_riz,
                    mista: prij.pocet_nabizenych_mist
                }
            };
            obory.push(obor);
        }
        if (obory.length === 0) {
            obory = null;
        }
        ;
        const ubytovaniFiltered = jsonUbytovani.features.filter((val) => {
            if (val.properties.nazev_organizace.toLocaleLowerCase() == props.nazev.toLocaleLowerCase())
                return true;
            return false;
        });
        let ubytovani = {
            luzkova_kapacita: 0,
            pocet_pokoju: 0,
            pocet_studentu: 0,
        };
        for (const u of ubytovaniFiltered) {
            const ub = u.properties;
            ubytovani.luzkova_kapacita += ub.pocet_luzkove_kapacity;
            ubytovani.pocet_pokoju += ub.celkovy_pocet_pokoju;
            ubytovani.pocet_studentu += ub.uhrnny_pocet_ubyt_studentu;
        }
        const skola = {
            id: props.OBJECTID,
            nazev: props.nazev,
            typ: props.zarizeni_druh,
            zrizovatel: props.zrizovatel,
            obec: props.nazev_obce,
            adresa: `${props.nazev_ulice} ${props.cislo_domovni}${props.cislo_orientacni ? ('/' + props.cislo_orientacni) : ''} ${props.nazev_obce} ${props.psc}`,
            www: props.www,
            lon: s.geometry.coordinates[0],
            lat: s.geometry.coordinates[1],
            ubytovani: ubytovani,
            obory: obory,
            obory_nazev: obory?.map((o) => o.nazev) || [],
            obory_kod: obory?.map((o) => o.kod) || [],
            obory_delka_vzdelavani: obory?.map((o) => o.delka_vzdelavani) || [],
            obory_forma_vzdelani: obory?.map((o) => o.forma_vzdelani) || [],
            obory_zpusob_ukonceni: obory?.map((o) => o.zpusob_ukonceni) || [],
            obory_prijimaci_zkouska: obory?.map((o) => o.prijimaci_zkouska) || [],
            obory_skolne: obory?.map((o) => o.skolne) || [],
            obory_uspesnosti_prihlaseni: obory?.map((o) => o.uspesnost.prihlaseni) || [],
            obory_uspesnosti_prijati: obory?.map((o) => o.uspesnost.prijati) || [],
            obory_uspesnosti_mista: obory?.map((o) => o.uspesnost.mista) || [],
        };
        // if (s.properties.zarizeni_druh == 'Střední škola') {
        // 	console.log(s.properties.nazev);
        // }
        // const type = s.properties.zarizeni_druh;
        // if (!schools.includes(type)) {
        // 	schools.push(type);
        // }
        if (!obce.includes(skola.obec))
            obce.push(skola.obec);
        if (skola.obory) {
            for (const o of skola.obory)
                if (!_obory.includes(o.nazev))
                    _obory.push(o.nazev);
            for (const o of skola.obory)
                if (!prijimacky.includes(o.prijimaci_zkouska))
                    prijimacky.push(o.prijimaci_zkouska);
        }
        schools.push(skola);
    }
    //console.log(prijimacky)
    // console.log(schools)
}
function printSchools(arr) {
    const el = document.querySelector('#list');
    for (const s of schools) {
        const e = document.createElement('div');
        e.innerHTML = `
		<h3>${s.nazev}</h3>
		<p>${s.typ}</p>
		<p>${s.adresa}</p>
		<p><a href="${s.www}">${s.www}</a></p>
		`;
        if (s.obory) {
            for (const o of s.obory) {
                e.innerHTML += o.nazev + '<br>';
            }
        }
        else {
            e.innerHTML += 'Chybí data pro obory';
        }
        el.appendChild(e);
    }
}
const markers = [];
function show() {
    const results_page = document.querySelector("#results_page");
    // get filters
    const search_term = document.querySelector("#search_box").value;
    const is_stredni_skola = document.querySelector("#is_stredni_skola").checked;
    const is_vyssi_odborna_skola = document.querySelector("#is_vyssi_odborna_skola").checked;
    const obce_select = document.querySelector("#obce_select").value;
    const obor_select_checkboxes = document.querySelectorAll("#obor_select div input[type='checkbox']");
    const prijimacky_select_checkboxes = document.querySelectorAll("#prijimacky_select div input[type='checkbox']");
    const delka_od_inp = document.querySelector("#delka_od_inp").value;
    const delka_do_inp = document.querySelector("#delka_do_inp").value;
    const selected_obory = Array.from(obor_select_checkboxes).map(osch => {
        let inposch = osch;
        if (inposch.checked)
            return inposch.value;
    }).filter(v => !!v);
    const selected_prijimacky = Array.from(prijimacky_select_checkboxes).map(psch => {
        let inpsch = psch;
        if (inpsch.checked)
            return inpsch.value;
    }).filter(v => !!v);
    let results = schools;
    results = filterExactMatch(results, "nazev", search_term).newState;
    results = filterExactMatch(results, "typ", (is_stredni_skola && is_vyssi_odborna_skola ? "" : is_stredni_skola ? "Střední škola" : (is_vyssi_odborna_skola ? "Vyšší odborná škola" : "-_-_-magic_babel-_-_-"))).newState;
    results = filterExactMatch(results, "obec", obce_select).newState;
    results = filterExactMatch(results, "obory_nazev", selected_obory).newState;
    results = filterExactMatch(results, "obory_prijimaci_zkouska", selected_prijimacky).newState;
    //results = filterRangeMatch(results, "obory_skolne", parseInt(skolne_od_inp), parseInt(skolne_do_inp)).newState;
    results_page.innerHTML = `<b>Počet výsledků: ${results.length}</b>`;
    if (results.length > 0) {
        for (const s of results) {
            console.log(s.obory_skolne);
            const content = `<div class="result">
							<div class="result_check">
								<input type="checkbox" name="" id="${s.id}" onchange="checkSchool(event)">
							</div>
							<div class="result_info">
								<strong>${s.nazev}</strong>
								<hr>
								<div>
									<strong>Typ školy:</strong> ${s.typ}
								</div>
								<div>
									<strong>Obec:</strong> ${s.obec}
								</div>
							</div>
						</div>`;
            const div = document.createElement("div");
            div.innerHTML = content;
            results_page.appendChild(div);
        }
    }
    else {
        results_page.innerHTML = "<b>0 výsledků s aktuálními filtry</b>";
    }
    for (const m of markers)
        m.remove();
    L.tileLayer('https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=7XdrIcKaLnOOzcLyyJx8LxudxhpT-9WQQ66tqclZSjM', {
        maxZoom: 15,
        minZoom: 8
    }).addTo(map);
    fetch("./data/border.json").then(res => res.json()).then(res => {
        const latLngs = L.GeoJSON.coordsToLatLngs(res.coordinates, 2);
        L.polyline(latLngs, {
            color: "red",
            weight: 4,
            opacity: 1
        }).addTo(map);
    });
    for (const r of results) {
        markers.push(L.marker([r.lat, r.lon]).addTo(map));
    }
    /*
        const filtered = schools.filter((val, i) => {
            let result = true;
            // result = filterRange(val);
            // result = filterExactMatch(val);
            return result;
        });
    
        printSchools(filtered);*/
}
(async () => {
    await getSchools();
    const obce_select = document.querySelector("#obce_select");
    for (const obec of obce) {
        const opt = document.createElement("option");
        opt.innerText = obec;
        obce_select.appendChild(opt);
    }
    const obor_select = document.querySelector("#obor_select");
    for (const [idx, obor] of _obory.entries()) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="checkbox" onchange="show()" value="${obor}" id="obor_${idx}" checked/> <label for="obor_${idx}">${obor}</label>`;
        obor_select.appendChild(div);
    }
    const prijimacky_select = document.querySelector("#prijimacky_select");
    for (const [idx, prijimacka] of prijimacky.entries()) {
        const div = document.createElement("div");
        div.innerHTML = `<input type="checkbox" onchange="show()" value="${prijimacka}" id="prijimacka_${idx}" checked/> <label for="prijimacka_${idx}">${prijimacka}</label>`;
        prijimacky_select.appendChild(div);
    }
    //currentSelection = schools.slice(0, 3);
    //printSchools(schools);
    show();
    setTimeout(() => {
        drawPrijimackyChart();
        drawTable();
    }, 2000);
})();
/*const skoly: Skola[] = [
    { adresa: "AAAAAAAAAAAAAAAAAAAA", id: 100, nazev: "test", obec: "Praha", obory: [{ delka_vzdelavani: 10, forma_vzdelani: "denni", kod: "da", nazev: "it", prijimaci_zkouska: "test", skolne: 5000, uspesnost: { mista: 1, prihlaseni: 1, prijati: 1 }, zpusob_ukonceni: "test" }], typ: "Stredni", www: "janstaffa.cz", lat: 0, lon: 0, zrizovatel: "Josef Fiala", ubytovani: { luzkova_kapacita: 10, pocet_pokoju: 10, pocet_studentu: 1 } as Ubytovani },
    { adresa: "BBBBBBBBBBBBBBBBBBBB", id: 100, nazev: "babel", obec: "Praha", obory: [{ delka_vzdelavani: 10, forma_vzdelani: "denni", kod: "da", nazev: "it", prijimaci_zkouska: "test", skolne: 5000, uspesnost: { mista: 1, prihlaseni: 1, prijati: 1 }, zpusob_ukonceni: "test" }], typ: "Stredni", www: "janstaffa.cz", lat: 0, lon: 0, zrizovatel: "Josef Fiala", ubytovani: { luzkova_kapacita: 11, pocet_pokoju: 10, pocet_studentu: 1 } as Ubytovani }
];*/
// filter fn example
function filterExactMatch(state, key, equals) {
    const path = key.split(".");
    const newState = [];
    const accuracy = [];
    for (const skola of state) {
        let data = skola;
        for (const step of path)
            data = data[step];
        let new_data = data;
        if (typeof new_data == "boolean" || typeof new_data == "number") {
            if (new_data === equals) {
                newState.push(skola);
                accuracy.push(1);
            }
        }
        else if (typeof new_data == "object") {
            const object_data = new_data;
            let matches = 0;
            for (const d of object_data)
                for (const e of equals)
                    if (d === e)
                        matches++;
            if (matches > 0) {
                newState.push(skola);
                accuracy.push(matches / object_data.length);
            }
        }
        // string
        else {
            const string_data = new_data;
            if (string_data.includes(equals)) {
                const acc = equals.length / string_data.length;
                newState.push(skola);
                accuracy.push(acc);
            }
        }
    }
    return { newState, accuracy };
}
// console.log(filterExactMatch(skoly, "obory.delka_vzdelani", 11));
function filterRangeMatch(state, key, lowBound, highBound) {
    const path = key.split(".");
    const newState = [];
    const accuracy = [];
    for (const skola of state) {
        let data = skola;
        for (const step of path)
            data = data[step];
        const number_data = data;
        if (number_data >= lowBound && number_data <= highBound) {
            newState.push(skola);
            accuracy.push(1);
        }
    }
    return { newState, accuracy };
}
// console.log(filterRangeMatch(schools, "skolne", 6000, 10000));
function toggleAll(e, parent) {
    const obor_select_checkboxes = Array.from(document.querySelectorAll(parent + " div input[type='checkbox']")).forEach((ch) => ch.checked = e.target.checked);
}
function openCity(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function checkSchool(event) {
    const newSelection = [];
    if (event.target.checked) {
        for (const s of schools) {
            if (s.id == parseInt(event.target.getAttribute("id")))
                currentSelection.push(s);
        }
    }
    else {
        currentSelection = currentSelection.filter(s => !(s.id == parseInt(event.target.getAttribute("id"))));
    }
    //currentSelection = newSelection;
    drawPrijimackyChart();
    drawTable();
}
