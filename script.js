
let currentSong = new Audio();
let songs;
let songUl;
let currfolder;

function secondsToMinutesSeconds(seconds){
    if(isNaN(seconds) || seconds <0){
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remaingingSeconds = Math.floor(seconds % 60);
    const formattedMinutes =String(minutes).padStart(2,'0');
    const formattedSeconds = String(remaingingSeconds).padStart(2,'0');
    return `${formattedMinutes}:${formattedSeconds}`;
}



///function return songs
async function getSongs(folder) {
    currfolder=folder;
    let a = await fetch(`/${currfolder}/`);
    console.log(a)
    // let a = await fetch(`/${currfolder}/`);

    let response = await a.text();
    // console.log(response);
    let div = document.createElement("div");
    div.innerHTML=response;
    let as = div.getElementsByTagName("a");
    // console.log(as);
   let songs =[];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3.preview")){
            songs.push(element.href.split(`${folder}`)[1])
        }
        
    }

    // return songs;




    //show all the songs in playlist

songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
songUl.innerHTML='';
for (const song of songs) {
    songUl.innerHTML =songUl.innerHTML + `<li> <img class="invert" src="img/music.svg" alt="" srcset="">
                        <div class="info">
                            <div>${song.replaceAll("%20", " ")} </div>
                            <div>Raza</div>
                          </div>
                          <div class="playnow">
                            <span>Play Now</span>
                            <img class="invert" src="img/play.svg" alt="" srcset="">
                          </div>
                    
    
    
    </li>`;
}



//Attach an event listener
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
        // console.log(e.querySelector(".info").firstElementChild.innerHTML);
        playMusic(e.querySelector(".info").firstElementChild.innerHTML);

    })


})


return songs;
    
}
const playMusic =(track)=>{
    // let audio = new Audio(`songs/${track.replaceAll(".preview", "")}`);
    currentSong.src = `/${currfolder}${track.replaceAll(".preview", "")}`;
currentSong.play();
    // audio.play();
    play.src = "img/pause.svg"
    document.querySelector(".songinfo").innerHTML=track;
    document.querySelector(".songtime").innerHTML="00:00 / 00:00";


}




async function main(){


let songs = await getSongs("songs/badshah")



// Attach an event listner to play next and prvious song
play.addEventListener('click',()=>{
    if(currentSong.paused){
        currentSong.play()
        play.src = "img/pause.svg"

        
    }else{
        currentSong.pause()
        play.src = "img/play.svg"

    }
})

///listen for time update event
currentSong.addEventListener("timeupdate",()=>{
    // console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML= `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime /currentSong.duration) * 100 + '%';

})


//add an event listener to seek bar
document.querySelector(".seekbar").addEventListener("click", e=>{
// console.log(e.offsetX/e.target.getBoundingClientRect().width)*100 + '%';
let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
document.querySelector(".circle").style.left= percent + '%';
currentSong.currentTime = ((currentSong.duration)*percent) /100;
})

//add an event listener in hamburger
let close = document.querySelector(".close");

document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0";
    close.style.display="block";
    
})



//add an event listener for close button 
close.addEventListener("click",()=>{
    document.querySelector(".left").style.left="-120%";
    close.style.display="none";

})




//Add an event listener to media query
// function myFunction(x) {
//     if (x.matches) { // If media query matches
//       document.body.style.backgroundColor = "yellow";
//     } else {
//       document.body.style.backgroundColor = "pink";
//     }
//   }
  
//   // Create a MediaQueryList object
//   var x = window.matchMedia("(max-width: 1400px)")
  
//   // Call listener function at run time
//   myFunction(x);
  
//   // Attach listener function on state changes
//   let ham = document.querySelector(".hamburger");
//   console.log(ham)
//   x.addEventListener("click", function() {
//     myFunction(x);
//   });





// add an event listener for previous and next button 
let previous = document.querySelector("#previous")
let next = document.querySelector("#next")

previous.addEventListener("click",()=>{
    let index = songs.indexOf(`/${currentSong.src.split("/").slice(-1)[0]}.preview`);
    // console.log(index)
    // console.log(songs)
    if((index+1)>=0){

        playMusic(songs[index-1]);
    }

})

next.addEventListener("click",()=>{
    // console.log("next click")
    // console.log(`/${currentSong.src.split("/").slice(-1)[0]}.preview`);
    let index = songs.indexOf(`/${currentSong.src.split("/").slice(-1)[0]}.preview`);
    // console.log(index)
    // console.log(songs)
    if((index+1)>length){

        playMusic(songs[index+1]);
    }
    


    
})



//add an event listener for volumne


document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
// console.log(e,e.target,e.target.value);
currentSong.volume=parseInt(e.target.value)/100;
})


///load a playlist whenever card is clicked
Array.from(document.getElementsByClassName("card")).forEach(e => {
    console.log(e);
    e.addEventListener("click",async item=>{
        // console.log(item,item.currentTarget.dataset.folder);
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        let ui = document.querySelector(".left")
        
        const mediaQuery = window.matchMedia("(max-width: 1400px)");
        if(mediaQuery.matches){
            close.style.display="block";
            ui.style.left="0";


        }else{
            close.style.display="none"
            ui.style.left="-120";

        }



    })

})







///honey singh


// let hon = document.querySelector("#hon")
// console.log(hon)


// hon.addEventListener("click", async item=>{
//     songs = await getSongs(`songs/honey`)
//     console.log(songs)




// })





} 


main();

