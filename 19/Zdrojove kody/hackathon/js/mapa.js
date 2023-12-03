import { seznamSkolPar } from "./data.js";
import { seznamUbytoven } from "./data.js";

const API_KEY = "uJVL2gFOMBfrHMUbZ4Gb6T_LrNIxLpFs4tzz_IotRao";

const map = L.map("map").setView([50.212354, 15.859795], 12);

L.tileLayer(
  `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${API_KEY}`,
  {
    minZoom: 0,
    maxZoom: 19,
    attribution:
      '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
  }
).addTo(map);

const LogoControl = L.Control.extend({
  options: {
    position: "bottomleft",
  },

  onAdd: function (map) {
    const container = L.DomUtil.create("div");
    const link = L.DomUtil.create("a", "", container);

    link.setAttribute("href", "http://mapy.cz/");
    link.setAttribute("target", "_blank");
    link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg" />';
    L.DomEvent.disableClickPropagation(link);

    return container;
  },
});

new LogoControl().addTo(map);

let polohaSkolyX;
let polohaSkolyY;

// Funkce pro získání polohy po kliknutí na marker
let vypis = document.querySelector("#vypis");
async function handleMarkerClick(latLng) {
  polohaSkolyX = latLng.lat;
  polohaSkolyY = latLng.lng;
  let arrayPolohy = await seznamSkolPar("poloha");
  let nazevSkol = await seznamSkolPar("nazev");
  console.log(arrayPolohy);
  for (let i = 0; i < arrayPolohy.length; i++) {
    var poloha = arrayPolohy[i];
    let h3 = document.createElement("h3");
    if (polohaSkolyY == poloha.x && polohaSkolyX == poloha.y) {
      console.log(nazevSkol[i]);
      vypis.innerHTML = "";
      h3.textContent = nazevSkol[i];
    }
    vypis.append(h3);
  }

  console.log(
    "Kliknuto na markeru školy: " + polohaSkolyX + " " + polohaSkolyY
  );
}

// znacka
async function znacky() {
  var customIcon = L.icon({
    iconUrl: "icons/map-marker-alt-2.svg", // Změňte na skutečnou URL vaší ikony
    iconSize: [32, 32], // Velikost ikony
    iconAnchor: [16, 32], // Bod, kde bude umístěn marker vzhledem k jeho souřadnicím
    popupAnchor: [0, -32], // Bod, kde se bude otevírat popup vzhledem k jeho souřadnicím
  });
  try {
    let arrayPolohy = await seznamSkolPar("poloha");
    let nazevSkol = await seznamSkolPar("nazev");
    for (var i = 0; i < arrayPolohy.length; i++) {
      var poloha = arrayPolohy[i];
      var marker = L.marker([poloha.y, poloha.x], { icon: customIcon })
        .addTo(map)
        .bindPopup("" + nazevSkol[i]);
      marker.on("click", function (event) {
        const clickedMarker = event.target;
        const latLng = clickedMarker.getLatLng();
        handleMarkerClick(latLng); // Zavoláme naši funkci pro zpracování polohy
      });
    }

    // Zde můžete provádět další akce, které závisí na polohách markerů
  } catch (error) {
    console.error(error);
  }
}

// znacka
let polohaUbytovenX;
let polohaUbytovenY;

// Funkce pro získání polohy po kliknutí na marker
async function handleMarkerClickUbytoven(latLng) {
  polohaUbytovenX = latLng.lat;
  polohaUbytovenY = latLng.lng;
  let arrayPolohy = await seznamUbytoven("poloha");
  let nazevUbytoven = await seznamUbytoven("nazev_organizace");

  // Vymažeme předchozí obsah

  for (let i = 0; i < arrayPolohy.length; i++) {
    var poloha = arrayPolohy[i];
    let h3 = document.createElement("h3");
    if (polohaUbytovenY == poloha.x && polohaUbytovenX == poloha.y) {
      vypis.innerHTML = "";
      h3.textContent = nazevUbytoven[i];
    }
    vypis.append(h3);
  }
}

// znacky
async function znackyIntr() {
  // Vytvoření vlastní ikony pro marker
  var customIconIntr = L.icon({
    iconUrl: "icons/map-marker-alt.svg", // Změňte na skutečnou URL vaší ikony
    iconSize: [32, 32], // Velikost ikony
    iconAnchor: [16, 32], // Bod, kde bude umístěn marker vzhledem k jeho souřadnicím
    popupAnchor: [0, -32], // Bod, kde se bude otevírat popup vzhledem k jeho souřadnicím
  });
  try {
    let arrayPolohy = await seznamUbytoven("poloha");
    let nazevUbytoven = await seznamUbytoven("nazev_organizace");
    for (var i = 0; i < arrayPolohy.length; i++) {
      var poloha = arrayPolohy[i];
      var marker = L.marker([poloha.y, poloha.x], { icon: customIconIntr })
        .addTo(map)
        .bindPopup("" + nazevUbytoven[i]);
      marker.on("click", function (event) {
        const clickedMarker = event.target;
        const latLng = clickedMarker.getLatLng();
        handleMarkerClickUbytoven(latLng); // Zavoláme naši funkci pro zpracování polohy
      });
    }

    // Zde můžete provádět další akce, které závisí na polohách markerů ubytoven
  } catch (error) {
    console.error(error);
  }
}

znackyIntr();

znacky();

document.querySelector("#skoly").addEventListener("click", (e) => {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  znacky();
  document.querySelector("#skoly").classList.add("text-blue-500");
  document.querySelector("#intry").classList.remove("text-blue-500");
});

document.querySelector("#intry").addEventListener("click", (e) => {
  map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  znackyIntr();
  document.querySelector("#skoly").classList.remove("text-blue-500");
  document.querySelector("#intry").classList.add("text-blue-500");
});
