let hledatB = document.getElementById("clubSearch");
let hledatInput = document.getElementById("searchInput");
let req = document.getElementById("searchInput");

let results = document.getElementById("results");

fetch('https://services6.arcgis.com/ogJAiK65nXL1mXAW/arcgis/rest/services/Kluby/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson')
    .then(function (response) {
        return response.json();
    }).then(function (data) {

        let dataF = data.features;
        let dataDB = [...new Set([...dataF])];

        hledatB.addEventListener('click', event => {
            hledat()
        })
        hledatInput.addEventListener('input', event => {
            hledat()
        })

        function hledat(){
            results.innerHTML = ''
            let kSlova = req.value.split(" ");

            let pod = ['nazev', 'nazev_orp', 'nazev_obce', 'nazev_ulice', 'psc'];

            dataDB.forEach(element => {
                let found = false;
                pod.forEach(el => {
                    if (!found) {
                        if (checkFiltr(element)) {
                            found = true;

                            let clubMain = document.createElement("button");
                            clubMain.classList += "clubSearchDiv";
                            clubMain.onclick = function(){openClub(element.properties.OBJECTID);}
                            
                            let clubPfp = document.createElement("div");
                            clubPfp.classList += "pfp ext";
                            clubPfp.style.backgroundImage = 'url("/pfpCluby/'+ element.properties.OBJECTID+'.jpg")';
                            let clubName = document.createElement("div");
                            clubName.classList += "information";
                            clubName.innerHTML = element.properties.nazev.replaceAll('\\"','');
                            
                            let clubObec = document.createElement("div");
                            clubObec.classList += "information italic";
                            clubObec.innerHTML = element.properties.nazev_obce;

                            clubMain.appendChild(clubPfp)
                            clubMain.appendChild(clubName)
                            clubMain.appendChild(clubObec)
                            results.appendChild(clubMain)

                        }
                    }
                })
                found = false;
            });
        }
    });

function addClickHref(newDom, odkaz) {
    newDom.addEventListener('click', event => {
        window.open(odkaz);
    });
}

function checkFiltr(element) {
    if (req.value == "") {
        return true;
    }
    if (
        toNormalForm(element.properties.nazev).toLowerCase().includes(toNormalForm(req.value).toLowerCase()) ||
        toNormalForm(element.properties.nazev_obce).toLowerCase().includes(toNormalForm(req.value).toLowerCase()) ||
        toNormalForm(element.properties.nazev_ulice).toLowerCase().includes(toNormalForm(req.value).toLowerCase()) ||
        toNormalForm(element.properties.psc).toLowerCase().includes(toNormalForm(req.value).toLowerCase())) {
        return true;
    }

    return false;
}
function toNormalForm(str) {
    if (str == '' || str == undefined) {
        return '';
    }
    else {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
}
