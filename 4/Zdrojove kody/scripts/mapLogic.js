const saveWorker = new Worker("scripts/saveWorker.js");
var socket ;
var posledniZprava;
const textDecoder = new TextDecoder();
const messageQueue = [];



let userLatitude;
let userLongitude;
let map;
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
var GetInfoData = {}
var roadsLenght = 0;
var fetchedRoadLenght = 0;
var roads = [];

//Sockets();
function Sockets(){
    // When the connection is established
    socket = new WebSocket("ws://" + location.hostname + ":15156");
    socket.addEventListener("open", (event) => {
        console.log("Connected to the server.");
        if(localStorage.getItem("stavy")){
            // DODELAT!!!!
            console.log("nacitam data z lokalniho uloziste");
            const compressedData = localStorage.getItem('stavy');
            const decompressedData = pako.inflate(compressedData, { to: 'string', level: 9 });
            const json = JSON.parse(decompressedData);
            console.log(json);

            var sum = 0;
            json.forEach((x) => {
               sum += x.geo.coordinates[0].length;
            });

            console.log(sum);

            json.forEach((x) => {
                createPath(x.geo.coordinates[0],x.stav, {databaseId: x.databaseid});
            });
            const loadingEl = document.getElementById("loading")
            loadingEl.style.animation = "out .5s ease forwards";
            setTimeout(()=>{
                loadingEl.style.display = "none";
            }, 500);
            InitNav();
        }
        else{

            const loadingEl = document.getElementById("loading")
            loadingEl.style.animation = "out .5s ease forwards";
            SendSocket(["Stavy/GetRoadCount", "Stavy/GetRoads"]);
            setTimeout(()=>{
                loadingEl.style.display = "none";
            }, 500);
        }
    });
    // When a message is received from the server
    socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        switch (posledniZprava){
            // geo stav
            case "Stavy/GetRoads":
                createPath(data.geo.coordinates[0],data.stav, {databaseId: data.databaseid});
                fetchedRoadLenght++;
                roads.push(data);
                //console.log( fetchedRoadLenght + " " + roadsLenght);
                if(fetchedRoadLenght === roadsLenght){
                    console.log("všechny úseky vykresleny");
                    saveWorker.postMessage(roads);
                    HideInfoBox();
                }
                break;
            // info
            case posledniZprava.includes("Stavy/RoadInfo") ? posledniZprava : "":
                GetInfoData = data;
                break;
            // delka vsech useku
            case "Stavy/GetRoadCount":
                console.log(data);
                roadsLenght = JSON.parse(data).count;
                break;
            default:
                console.log("neimplementovaná zpráva");
        }
        sendNextSocket();
    });

    // Handle errors
    socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
    });

    // Handle connection closure
    socket.addEventListener("close", (event) => {
        console.log("Connection closed:", event);
    });
}
saveWorker.onmessage = (e) => {
    console.log("data ulozeny")
    localStorage.setItem("stavy", e.data);
    InitNav();
};

function showPosition(position) {
    console.log("User longitude: " + position.coords.longitude);
    console.log("User latitude: " + position.coords.latitude);
    /*userLongitude = position.coords.longitude;
    userLatitude = position.coords.latitude;*/

    // pak zmenit !!!!
    userLongitude =15.829669080687225;
    userLatitude = 50.209921659080265;

    createMap();
    map.whenReady(() => {
        console.log("test");
        Sockets();
    })
}

function sendNextSocket() {
    if (messageQueue.length > 0) {
        const message = messageQueue.shift();
        posledniZprava = message;
        console.log(message);
        socket.send(message);
    }
}

function SendSocket(message) {
    if(typeof(message) === "string"){
        messageQueue.push(message);
        if (messageQueue.length === 1) {
            sendNextSocket();
        }
    }
    else{
        message.forEach((x) => {
            messageQueue.push(x);

        });
        sendNextSocket();
    }
}

async function GetInfo(id){
    if(fetchedRoadLenght !== roadsLenght){
        ShowInfoBox("Prosím počkejte než se na načtou všechny úseky", 5000, false);
        return {lenght: 0};
    }
    else{
        GetInfoData = {};
        await SendSocket("Stavy/RoadInfo:" + id);
        // Wait until GetInfoData is updated
        while (Object.keys(GetInfoData).length === 0) {
            await new Promise(resolve => setTimeout(resolve, 10)); // Wait for 100 milliseconds
        }
        GetInfoData["lenght"] = "-";
        return GetInfoData;

    }
}
function findMinMaxPairs(coordinates) {
    let maxFloat1 = -Infinity;
    let minFloat2 = Infinity;
    let minFloat1 = Infinity;
    let maxFloat2 = -Infinity;

    let maxFloat1Pair = null;
    let minFloat2Pair = null;
    let minFloat1Pair = null;
    let maxFloat2Pair = null;

    for (const pair of coordinates) {
        const float1 = pair[0];
        const float2 = pair[1];

        if (float1 > maxFloat1) {
            maxFloat1 = float1;
            maxFloat1Pair = pair;
        }

        if (float2 < minFloat2) {
            minFloat2 = float2;
            minFloat2Pair = pair;
        }

        if (float1 < minFloat1) {
            minFloat1 = float1;
            minFloat1Pair = pair;
        }

        if (float2 > maxFloat2) {
            maxFloat2 = float2;
            maxFloat2Pair = pair;
        }
    }

    return {
        maxFloat1Pair,
        minFloat2Pair,
        minFloat1Pair,
        maxFloat2Pair
    };
}

function createPath(coords, condition, data) {
    const lineColors = {
        SUPERhavarijní: '#000000',
        havarijní: '#e20b04',
        nevyhovující: '#c47217',
        vyhovující: '#f7d90d',
        dobrý: '#b7fb0e',
        výborný: '#2ec750',
    };
    const lineColor = lineColors[condition] || 'white';
    const id = data.databaseId;



    const polyline = L.polyline(coords, { color: lineColor, weight: 4 }).addTo(map);
    const customPopup = `<div class='customPopupText'>${condition[0].toUpperCase() + condition.slice(1)}</div>`;
    const customOptions = {
        'maxWidth': '400',
        'width': '500',
        'className': 'popupCustom',
    }

    polyline.bindPopup(customPopup, customOptions);

    polyline.on('mouseover', () => {
        if(polyline._path.getAttribute("stroke-opacity") !== "0"){
            polyline.openPopup();
        }else{
            //nefunguje ????
            polyline._path.style.cursor = "grab";
        }
    });
    polyline.on('mouseout', () => {
        if(polyline._path.getAttribute("stroke-opacity") !== "0"){
            polyline.closePopup();
        }else{
            //nefunguje ????
            polyline._path.style.cursor = "grab";
        }
    });
    polyline.on('click', (e) => {
        GetInfo(id)
            .then(infodata => {
                if(infodata.lenght !== 0){
                    var a = true;
                    document.querySelectorAll("#menu-btn").forEach((x) => {
                        if(x.dataset.menuname === "menu-info"){
                            a = false;
                        }
                    })
                    if(a){
                        document.getElementById("icons").innerHTML += '<span onclick="Select(this)" class="material-symbols-rounded" id="menu-btn" data-menuName="menu-info">info</span>'
                    }

                    /*document.querySelectorAll("[data-stav]").forEach((x) => {
                       if(x.id.toString() !== id.toString()){
                           x.setAttribute("stroke-opacity", "0.4");
                       }
                       else{

                           x.setAttribute("stroke-opacity", "1");
                       }
                    });*/

                    SelectWithId("menu-info");
                    FillInfoSubMenu(infodata);
                }
            });
    });

    polyline._path.dataset.path = "1";
    polyline._path.dataset.stav = condition;
    polyline._path.id = id;
    polyline._path.dataset.extreme = JSON.stringify(findMinMaxPairs(coords));

    // add the ID for the segment
}


function FillInfoSubMenu(data) {
    console.log(data);
    const values = [
        'stav_sil',
        'stav_rok',
        'ozn_sil',
        'ozn_usek',
        'delka_usek',
        'ozn_trida',
        'ozn_kat',
        'typ_povrch',
        'nazev_vusc',
        'dp_id',
        'SHAPE_Length'
    ];
    values.forEach((x) => {
        document.getElementById("info-" + x).innerHTML = data[x];
    })
}

function createMap() {
    map = L.map('map').setView([userLatitude, userLongitude], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
    }
}