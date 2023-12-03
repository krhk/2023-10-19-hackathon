const infobox = document.getElementById("infobox");
const loadbar = document.getElementById("loadbar");
const infoText = document.getElementById("infobox-text");

function ShowInfoBox(msg, time, timer){
    loadbar.style.opacity = timer ? "1" : "0";
    infoText.innerText = msg;
    infobox.style.animation = "Bloadbar 0.3s forwards ease";
    loadbar.style.animation = "Aloadbar " + time + "ms linear"
    setTimeout(() => {
        infobox.style.animation = "BloadbarClose 0.3s forwards ease";
    }, time);
}

function HideInfoBox(){
    infobox.style.animation = "BloadbarClose 0.3s forwards ease";
}


/*setTimeout(() => {
    ShowInfoBox("test test test", 5000);
    console.log("info");
}, 2000);*/
