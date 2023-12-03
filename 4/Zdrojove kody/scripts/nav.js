var navReady = false;
var selectingA = false;
var selectingB = false;

var navigating = false;

var control;

var start;
var end;

function findPairsInsideRange(range, pairs) {
    const [minRange, maxRange] = range;
    const insidePairs = [];

    for (const [min, max] of pairs) {
        if (min >= minRange && max <= maxRange) {
            insidePairs.push([min, max]);
        }
    }

    return insidePairs;
}

function InitNav(){
    navReady = true;
    console.log("navigace ready");
    /*L.Routing.control({
        waypoints: [
            L.latLng(57.74, 11.94),
            L.latLng(57.6792, 11.949)
        ]
    }).addTo(map);*/

    map.on('click', (e) => {
        console.log("klik na mapu")
        var latlng = e.latlng;
        console.log("con a " + selectingA);
        if(selectingA && !start){
            const marker = L.marker(latlng, {draggable: 'true'}).addTo(map);

            start = marker;
            selectingA = false;
            marker.on("dragend", () => {
                const data = marker.getLatLng();
                data["type"] = "start";
                console.log(data);
            });
            document.querySelectorAll("[data-stav]").forEach((x) => {
                x.setAttribute("stroke-opacity", "1");
            });
        }
        else if(selectingB){
            const marker = L.marker(latlng, {draggable: 'true'}).addTo(map);
            console.log(marker);
            end = marker;
            selectingB = false;


            const startCoords = L.latLng(start.getLatLng().lat.toFixed(2), start.getLatLng().lng.toFixed(2));
            const endCoords = L.latLng(end.getLatLng().lat.toFixed(2), end.getLatLng().lng.toFixed(2))
            const coords = [];
            coords.push(startCoords);
            coords.push(endCoords);
            const control = L.Routing.control({
                waypoints: [
                    startCoords,
                    endCoords
                ],
                routeWhileDragging: true,
                router: new L.Routing.OSRMv1({
                    serviceUrl: 'http://router.project-osrm.org/route/v1',
                    profile: 'driving',
                    alternatives: 10,
                    routeOptions: {
                        alternatives: true,
                        steps: true
                    },
                }),

            }).addTo(map);
            control.on('routesfound', function (e){
                console.log("route found")
                const routes = e.routes;
                console.log(routes);
                routes.forEach(function(route, i) {
                    L.polyline(route.coordinates, {color: 'blue'}).addTo(map).bindPopup('Route ' + (i + 1));
                });

                /*var pathsMinMaxs;
                document.querySelectorAll("[data-extreme]").forEach((x)=>{
                    console.log(x);
                    console.log(x.dataset.extreme);
                    //pathsMinMaxs.push(JSON.parse(x.dataset.extreme));
                });
                console.log(pathsMinMaxs);*/
                //const includingPairs = findPairsInsideRange(coords, pathsMinMaxs);

                //console.log(includingPairs);
            });

            map.removeLayer(start);
            map.removeLayer(end);
            start = null;
            end = null;

            document.querySelectorAll("[data-stav]").forEach((x) => {
                x.setAttribute("stroke-opacity", "1");
            });

            marker.on("dragend", () => {
                const data = marker.getLatLng();
                data["type"] = "end";
                console.log(data);
            });
        }
    });
}

function selectStart(){
    if(start){
        ShowInfoBox("Již jste umístili start.", 5000, true);
        return;
    }
    if (navigating){
        ShowInfoBox("Nejdříve zrušte aktuální cestu.", 5000, true);
        return;
    }
    selectingA = true;
    document.querySelectorAll("[data-stav]").forEach((x) => {
        x.setAttribute("stroke-opacity", "0.3");
    });
}

function selectEnd(){
    if(end){
        ShowInfoBox("Již jste umístili cíl.", 5000, true);
        return;
    }
    if (navigating){
        ShowInfoBox("Nejdříve zrušte aktuální cestu.", 5000, true);
        return;
    }
    selectingB = true;
    document.querySelectorAll("[data-stav]").forEach((x) => {
        x.setAttribute("stroke-opacity", "0.3");
    });
}

function calculateRoad(){

}


