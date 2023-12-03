function overlay2(nazev) {
    console.log("a");
    function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
console.log("b");
    
    var overlay = document.createElement('div');

    var content = '';    
    


      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.backgroundColor = 'rgba(255, 255, 255, 1)';
      overlay.style.zIndex = '9999';
    overlay.id = "main";

      var text = document.createElement('p');
      text.innerHTML = document.getElementById('table').innerHTML;
      text.style.textAlign = 'center';
      text.style.fontSize = '24px';
      text.style.marginTop = '100px';

      var closeBtn = document.createElement('span');
      closeBtn.textContent = '×';
      closeBtn.style.position = 'fixed';
      closeBtn.style.top = '20px';
      closeBtn.style.right = '20px';
      closeBtn.style.fontSize = '34px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.background = '#fff';
      closeBtn.style.borderRadius = '50%';
      closeBtn.style.height = '40px';
      closeBtn.style.width = '40px';
      closeBtn.style.textAlign = 'center';
      closeBtn.class = "closeButton";
    

      function hideOverlay() {
        document.body.removeChild(overlay);
      }

      closeBtn.addEventListener('click', hideOverlay);

      overlay.appendChild(text);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      var a = position.coords.latitude;
    var b = position.coords.longitude;
    var c = "0";
    var d = "0";
    var tableHead = "";
    var url = "";
    var jsonData = {
  "muzea_a_galerie": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Muzea_a_galerie/FeatureServer/0/query?where=1%3D1&outFields=nazev,typ__muzea,www,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Typ muzea"],
    "hodnoty": ["nazev","www", "typ__muzea"],
        "jmeno": "Muzea a galerie"
  },
"kulturni_domy": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kulturní_domy/FeatureServer/0/query?where=1%3D1&outFields=nazev,pocet_mist_k_sezení,www,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Počet míst k sezení"],
    "hodnoty": ["nazev","www", "pocet_mist_k_sezení"],
        "jmeno": "Kulturní domy"
  },
"knihovny": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Knihovny/FeatureServer/0/query?where=1%3D1&outFields=nazev,typ_knihovny,www,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Typ knihovny"],
    "hodnoty": ["nazev","www", "typ_knihovny"],
        "jmeno": "Knihovny"
  },
"divadla_a_filharmonie": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Divadla_a_filharmonie/FeatureServer/0/query?where=1%3D1&outFields=nazev,typ_zarizeni,kapacita,www,email,x,y,telefon&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Typ zařízení","Kapacita","Email","Telefon"],
    "hodnoty": ["nazev","www", "typ_zarizeni","kapacita","email","telefon"],
        "jmeno": "Divadla a filharmonie"
  },
"zabavni_centra": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zábavní_centra/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www", "telefon"],
        "jmeno": "Zábavní centra"
  },
"kluby": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kluby/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www", "telefon"],
        "jmeno": "Kluby"
  },
"kina": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kina/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,x,y,kapacita&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Kapacita"],
    "hodnoty": ["nazev","www", "kapacita"],
        "jmeno": "Kina"
  },
        "infocentra": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Infocentra/FeatureServer/0/query?where=1%3D1&outFields=nazev,nazev_obce,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Název obce","Telefon"],
    "hodnoty": ["nazev","www", "nazev_obce","telefon"],
        "jmeno": "Infocentra"
  },
"hrady": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Hrady/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Hrady"
  },
"architektonicke_pamatky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Architektonické_památky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Architektonické památky"
  },
"zamky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Zámky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název"],
    "hodnoty": ["nazev","www"],
        "jmeno": "Zámky"
  },
"pevnosti_a_opevneni": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Pevnosti_a_opevnění/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Pevnosti a opevnění"
  },
"narodni_kulturni_pamatky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Národní_kulturní_památky_bodové_objekty/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,y,x&outSR=4326&f=json",
    "thead": ["Navigovat", "Název"],
    "hodnoty": ["nazev","www"],
        "jmeno": "Národní kulturní památky"
  },
"technicke_pamatky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Technické_památky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Technické památky"
  },
"cirkevni_pamatky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Církevní_památky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Církevní památky"
  },
"zidovske_pamatky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Židovské_památky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Židovské památky"
  },
"pohotovost": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Lékařská_pohotovostní_služba/FeatureServer/0/query?where=1%3D1&outFields=nazev,ordinacni_hodiny,nazev_obce,www,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Ordinační hodiny","Název obce"],
    "hodnoty": ["nazev","www","ordinacni_hodiny","nazev_obce"],
        "jmeno": "Pohotovost"
  },
"stanice_hasici": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Stanice_a_pracoviště_hasičského_záchranného_systému/FeatureServer/0/query?where=1%3D1&outFields=druh_pracoviste,www,telefon,x,y,nazev_obce&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Název obce","Telefon"],
    "hodnoty": ["druh_pracoviste","www","nazev_obce","telefon"],
        "jmeno": "Stanice hasičů"
  },
"sluzebny_policie": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Služebny_Policie_ČR/FeatureServer/0/query?where=1%3D1&outFields=nazev_obvodu,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název obvodu","Telefon"],
    "hodnoty": ["nazev_obvodu","www","telefon"],
        "jmeno": "Služebny policie"
  },
"prirodni_zajimavosti": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Přírodní_zajímavosti/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Telefon"],
    "hodnoty": ["nazev","www","telefon"],
        "jmeno": "Přírodní zajímavosti"
  },
"rozhledny_a_vyhlidky": {
    "url": "https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Rozhledny_a_vyhlídky/FeatureServer/0/query?where=1%3D1&outFields=nazev,www,telefon,x,y,nazev_obce&outSR=4326&f=json",
    "thead": ["Navigovat", "Název","Název obce","Telefon"],
    "hodnoty": ["nazev","www","nazev_obce","telefon"],
        "jmeno": "Rozhledny a vyhlídky"
  }



};
    var id = nazev;
    
var hodnoty = Array();
var hodnotyHead = Array();
var h1 = "";

if (jsonData[id]) {
  var url = jsonData[id].url;
  var tableHead = jsonData[id].thead.map(item => `<th>${item}</th>`).join('');
 hodnoty = jsonData[id].hodnoty;
 hodnotyHead = jsonData[id].thead;
    h1 = jsonData[id].jmeno;
} else {
  console.error(`ID "${id}" nebylo nalezeno v proměnné jsonData.`);
}

    
    document.getElementById('main').getElementsByTagName('h1')[0].innerHTML = h1;
    document.getElementsByClassName('data-table')[1].getElementsByTagName('thead')[0].innerHTML = tableHead;
    const table = document.getElementsByClassName('data-table')[1].getElementsByTagName('tbody')[0];
    const jsonUrl = url;
    
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                const attributes = feature.attributes;
                const row = table.insertRow();
                const navCell = row.insertCell(0);
                const nameCell = row.insertCell(1);
               

                d = attributes.x;
                c = attributes.y;
                if(hodnoty[1]=="www"){
                    nameCell.innerHTML = `<a href="${attributes.www}" target="_blank">${attributes[hodnoty[0]]}</a>`;
                }else{
                    nameCell.innerHTML = attributes[hodnoty[0]];
                }
                
                navCell.innerHTML = '<a href="https://www.google.com/maps/dir/'+a+','+b+'/'+c+','+d+'" target="_blank">Navigovat</a>';
                var x = 2;
                for (let i = 1; i < hodnoty.length; i++) {
                    
                    if (hodnoty[i] != "www"){
                        
                        const yCell = row.insertCell(x);
                    yCell.innerHTML =  attributes[hodnoty[i]];
                        x++;
                    }
                   
                }
            });
        })
        .catch(error => {
            console.error('Chyba při načítání dat z URL:', error);
        });
    
}  
    getLocation();
}
