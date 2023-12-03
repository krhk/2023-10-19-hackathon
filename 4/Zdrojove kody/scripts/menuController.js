var open = false;
var activeEl;
var interactive = true;
var menu = document.getElementById("side-menu");
const submenus = [
    "menu-layers",
    "menu-nav",
    "menu-info"
];

function Select(el){
    activeEl = el;
    document.querySelectorAll("#menu-btn").forEach((x) => {
        x.classList.remove("active");
    });
    el.classList.add("active");
    OpenSubMenu(el);
}

function SelectWithId(menuName){
    activeEl = document.querySelector(`#menu-btn[data-menuname="${menuName}"]`);

    document.querySelectorAll("#menu-btn").forEach((x) => {
        x.classList.remove("active");
    });
    activeEl.classList.add("active");
    OpenMenu();
    OpenSubMenu(activeEl);
}

function OpenSubMenu(el){
    const submenu = el.dataset.menuname;
    submenus.forEach((submenu) => {
        document.getElementById(submenu).style.display = "none";
    });
    document.getElementById(submenu).style.display = "flex";
}

function OpenMenu(){
    if(!interactive)
        return;

    menu.classList.add("side-menu-hover");
    open = true;
}

function CloseMenu(){
    if(!interactive)
        return;

    if (activeEl && activeEl.innerHTML === "info"){
        SelectWithId("menu-layers");
        document.querySelectorAll("#menu-btn[data-menuname='menu-info']").forEach((x) => {
            x.style.animation = "infobtout .5s forwards ease";
            document.getElementById("menu-layers").style.display = "none";

            setTimeout(() => {
                x.remove();
                document.getElementById("menu-layers").style.display = "flex";
            }, 500);
        });
    }

    /*document.querySelectorAll("[data-stav]").forEach((x) => {
        x.setAttribute("stroke-opacity", "1");
    });*/

    menu.classList.remove("side-menu-hover");
    menu = document.getElementById("side-menu");
    open = false;
}

function AllowMenuHover(){
    interactive = true;
}

function DisableMenuHover(){
    interactive = false;
}

