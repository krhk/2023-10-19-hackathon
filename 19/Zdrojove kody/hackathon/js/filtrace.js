import { seznamSkolPar } from "./data.js";

// Získání odkazu na prvky HTML
const distanceRange = document.getElementById("distanceRange");
const distanceValue = document.getElementById("distanceValue");

// Přidání posluchače událostí na posuvník vzdálenosti
distanceRange.addEventListener("input", updateDistance);

// Funkce pro aktualizaci zobrazené vzdálenosti
function updateDistance() {
  const distance = distanceRange.value;
  distanceValue.textContent = distance;
  // Zde můžeš provést další akce s hodnotou vzdálenosti, například filtraci dat.
}

let vysledek = document.querySelector("#vysledek");
let a = 0;
let zmena = document.querySelector("#zmena");
zmena.addEventListener("click", (e) => {
  a++;
  if (a % 2 == 0) {
    zmena.textContent = "zvetsit";
    vysledek.className =
      "h-[85%] flex flex-col w-[30%] absolute top-1/2 -translate-y-1/2 left-[5%] z-10 bg-white rounded-2xl shadow-lg shadow-slate-500 p-3";
  } else {
    zmena.textContent = "zmensit";
    vysledek.className =
      "h-[85%] flex flex-col w-[90%] absolute top-1/2 -translate-y-1/2 left-[5%] z-10 bg-white rounded-2xl shadow-lg shadow-slate-500 p-3";
  }
});

console.log(seznamSkolPar('zrizovatel'));
