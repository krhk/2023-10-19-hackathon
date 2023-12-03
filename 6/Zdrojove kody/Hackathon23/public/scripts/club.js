let clubSection = document.getElementById("clubSection")
let friendLbl = document.getElementById("friendLbl") 
let friendDiv = document.getElementById("friendDiv")
let clubTraficLbl = document.getElementById("clubLbl")
let clubTraficDiv = document.getElementById("clubDiv")
let calendar = document.getElementById("calendar")


let clubPfp = document.getElementById("clubpfp")
let clubName = document.getElementById("clubname")
let clubFollow = document.getElementById("clubFollow")
let clubWeb = document.getElementById("clubWeb")

let clubPost1 = document.getElementById("clubPost1")
let clubPost2 = document.getElementById("clubPost2")
let clubPost3 = document.getElementById("clubPost3")

let clubID = ''
function openClub(id){
    clubID = id
    clubPfp.style.backgroundImage = 'url("/pfpCluby/'+ id+'.jpg")'
    clubFollow.innerHTML = Math.floor(Math.random() * 100) + 5 + " tisíc sledujících";
    if(id == 9){
        clubName.innerHTML = "Denoche"
        clubPost1.style.backgroundImage = 'url("/posts/1.jpg")'
        clubPost2.style.backgroundImage = 'url("/posts/2.jpg")'
        clubPost3.style.backgroundImage = 'url("/posts/3.jpg")'
    }
    else if(id == 4){
        clubName.innerHTML = "U Stolu"
        clubPost1.style.backgroundImage = 'url("/posts/4.jpg")'
        clubPost2.style.backgroundImage = 'url("/posts/5.jpg")'
        clubPost3.style.backgroundImage = 'url("/posts/6.jpg")'
    }
    else{
        clubName.innerHTML = "Na Výstavišti"
        clubPost1.style.backgroundImage = 'url("/posts/7.jpg")'
        clubPost2.style.backgroundImage = 'url("/posts/8.jpg")'
        clubPost3.style.backgroundImage = 'url("/posts/9.jpg")'
    }

    friendLbl.style.display = "none"
    friendDiv.style.display = "none"
    clubTraficLbl.style.display = "none"
    clubTraficDiv.style.display = "none"
    calendar.style.display = "none"
    
    searchSection.style.display = "none"
    clubSection.style.display = "inline"
    console.log(id)
}
function backToSearch(){
    friendLbl.style.display = "inline"
    friendDiv.style.display = "inline"
    clubTraficLbl.style.display = "inline"
    clubTraficDiv.style.display = "inline"
    calendar.style.display = "inline"

    searchSection.style.display = "inline"
    clubSection.style.display = "none"
}
function webopen(){
    if(clubID == 9){
        window.location.href = 'http://www.denoche.cz'
    }
    else if(clubID == 4){
        window.location.href = 'https://www.facebook.com/ustolu/'
    }
}