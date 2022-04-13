// Song data
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpg"

    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpg"
    },
]

//Actual song 
let actualSong = null

//Capturing elements from HTML for working with JS
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

//Listen Audio Element
audio.addEventListener("timeupdate", updateProgressBar)

//Listen clicks on button play
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else{
        pauseSong()
    }
})

//Listen clicks on button prev
prev.addEventListener("click", () => previousSong())

//Listen clicks on button next
next.addEventListener("click", () => nextSong())

//Listen clicks on progress Container
progressContainer.addEventListener("click", setProgress)

//Load and show songs
function loadSongs(){
    songList.forEach((song, index) => {
        //Crear li
        const li = document.createElement("li")
        //Crear a
        const link = document.createElement("a")
        //Hidratar a
        link.textContent = song.title
        link.href = "#"
        //Listen Click
        link.addEventListener("click", () => loadSong(index))
        //Añadir a li
        li.appendChild(link)
        //Añadir li a ul
        songs.appendChild(li)
    })
}

//Load selected song
function loadSong(songIndex){
    if (songIndex !== actualSong) {
        //Update Active class (CSS)
        changeActiveClass(actualSong,songIndex)
        //update actual song
        actualSong = songIndex
        //title
        changeTitle(songIndex)
        //image
        changeCover(songIndex)
        //audio
        changeSong(songIndex)  
        //Play Song
        playSong() 
    }
}

//Update progress bar 
function updateProgressBar(event){
    //Total and actual
    const {duration, currentTime} = event.srcElement
    const percent = (currentTime / duration) * 100
    progress.style.width = percent + "%"
}

//Clickable progress bar
function setProgress(event){
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}

//Update controls
function updateControls(){
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else{
        play.classList.remove("fa-play")
        play.classList.add("fa-pause")
    }
}

//Play Song
function playSong(){
    if (actualSong !== null) {
        audio.play()
        updateControls()
    }
}

//Pause Song
function pauseSong(){
    audio.pause()
    updateControls()
}
//Change active class
function changeActiveClass(lastIndex,newIndex){
    const links = document.querySelectorAll("a")
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

//Change title
function changeTitle(songIndex){
    title.textContent = songList[songIndex].title
}
//Change image
function changeCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover
}
//Change Song
function changeSong(songIndex){
    audio.src = "./audio/" + songList[songIndex].file
}
//Next Song
function nextSong(){
    if (actualSong < songList.length - 1) {
        loadSong(actualSong + 1)
    } else{
        loadSong(0)
    }
}
//Previous Song
function previousSong(){
    if (actualSong > 0) {
        loadSong(actualSong - 1)
    } else{
        loadSong(songList.length - 1)
    }
}

//Pass to the next song when actual song finish
audio.addEventListener("ended", () => nextSong())

//MAIN
loadSongs()