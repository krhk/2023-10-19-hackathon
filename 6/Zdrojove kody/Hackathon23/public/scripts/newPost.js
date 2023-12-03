//data
const data = JSON.parse(document.getElementById("data").text)
let postFile = data.postName.split(',')
let postPfp = data.postPfp.split(',')
let postName = ['Franta','Pepa','Jirka','Pavel','Anna','Saša']
postFile = postFile.concat(data.postVideo.split(','))

//posts
const delay = ms => new Promise(res => setTimeout(res, ms));

let postField = document.getElementById("postField")
let searchSection = document.getElementById("searchSection")

let divs = [];

//index - postImage, postPfp, postName
let postsArray = {};

for(let i = 1; i < 6;i++){
    divs.push(document.getElementById("div"+i))
}
for(let i = 2; i >= 0;i--){
    let postNamePlusPfpIndex = Math.floor(Math.random() * postName.length)
    postNamePlusPfpIndex = postNamePlusPfpIndex > postPfp.length-1 ? postPfp.length-1 : postNamePlusPfpIndex
    postsArray[2-i] = [postFile[Math.floor(Math.random() * postFile.length)], postPfp[postNamePlusPfpIndex], postName[postNamePlusPfpIndex], Math.floor(Math.random() * 1213) + 53]
    if(postsArray[2-i][0].includes(".mp4")){
        divs[divs.length-1-i].childNodes[1].setAttribute('src','/videos/'+postsArray[2-i][0]); 
    }
    else{
        divs[divs.length-1-i].style.backgroundImage = 'url(/posts/'+postsArray[2-i][0]+')'
    }
    divs[divs.length-1-i].childNodes[3].style.backgroundImage = 'url(/pfp/'+postsArray[2-i][1]+')'
    divs[divs.length-1-i].childNodes[5].innerHTML = postsArray[2-i][2];
}
let c = false
let currentPost = 0
window.addEventListener("wheel", async (event) => {
    if(c) return
    c = true
    
    if (event.wheelDeltaY < 0) {
        divs[0].style.animationName = 'slideup'
        currentPost++;
        await delay(900); 
        divs[0].style.animationName = 'none'
        
        if(currentPost + 2 == Object.keys(postsArray).length){
            let postNamePlusPfpIndex = Math.floor(Math.random() * postName.length)
            postNamePlusPfpIndex = postNamePlusPfpIndex > postPfp.length-1 ? postPfp.length-1 : postNamePlusPfpIndex
            postsArray[Object.keys(postsArray).length] = [postFile[Math.floor(Math.random() * postFile.length)], postPfp[postNamePlusPfpIndex], postName[postNamePlusPfpIndex], Math.floor(Math.random() * 1213) + 53]
        }

        for(let i = 4 ; i >= 0;i--){
            if(currentPost == 1 && i < 1) break;

            if(postsArray[currentPost+2 + (i-4)][0].includes(".mp4")){
                divs[i].childNodes[1].setAttribute('src','/videos/'+postsArray[currentPost+2 + (i-4)][0])
                divs[i].style.backgroundImage = '' //img
            } 
            else{
                divs[i].style.backgroundImage = 'url(/posts/'+postsArray[currentPost+2 + (i-4)][0]+')' //img
                divs[i].childNodes[1].setAttribute('src','')
            }
            divs[i].childNodes[3].style.backgroundImage = 'url(/pfp/'+postsArray[currentPost+2 + (i-4)][1]+')' //pfp img
            divs[i].childNodes[5].innerHTML = postsArray[currentPost+2 + (i-4)][2] //name text
            divs[i].childNodes[7].childNodes[1].style.visibility = "visible" //like img
        }
    }
    else {
        if(currentPost){
            if(currentPost == 1)
                removeAll(0);

            divs[0].style.animationName = 'slidedown'
            await delay(900); 
            divs[0].style.animationName = 'none'
            
            if(currentPost == 1)
                removeAll(1);

            for(let i = 4 ; i >= 0;i--){
                if(currentPost == 2 && i < 1 || currentPost == 1 && i < 2) break;

                if(postsArray[currentPost+1 + (i-4)][0].includes(".mp4")){
                    divs[i].childNodes[1].setAttribute('src','/videos/'+postsArray[currentPost+1 + (i-4)][0])
                    divs[i].style.backgroundImage = '' //img
                }
                else{
                    divs[i].style.backgroundImage = 'url(/posts/'+postsArray[currentPost+1 + (i-4)][0]+')' //img
                    divs[i].childNodes[1].setAttribute('src','')
                }
                divs[i].childNodes[3].style.backgroundImage = 'url(/pfp/'+postsArray[currentPost+1 + (i-4)][1]+')' //pfp img
                divs[i].childNodes[5].innerHTML = postsArray[currentPost+1 + (i-4)][2] //name text
                divs[i].childNodes[7].childNodes[1].style.visibility = "visible" //like img
            }
            
            currentPost--;
        }
        
    }

    divs[0].style.animationName = 'none'
    c = false
});

function removeAll(index){
    divs[index].style.backgroundImage = ''//img
    divs[index].childNodes[1].setAttribute('src','')
    divs[index].childNodes[3].style.backgroundImage = '' //pfp img
    divs[index].childNodes[5].innerHTML = '' //name text
    divs[index].childNodes[7].childNodes[1].style.visibility = 'hidden' //like
}

function clickSearch(){
    if(postField.style.display != 'none'){
        postField.style.display = 'none';
        searchSection.style.display = "inline";
    }
    else{
        friendLbl.style.display = "inline"
        friendDiv.style.display = "inline"
        clubTraficLbl.style.display = "inline"
        clubTraficDiv.style.display = "inline"
        calendar.style.display = "inline"

        postField.style.display = 'inline';
        searchSection.style.display = "none";
    }
    clubSection.style.display = 'none'
    c = c == true ? false : false; 
}