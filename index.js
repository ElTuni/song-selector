import {allsongs, moods, albumcolors} from "./data.js";

const modal = document.getElementById("modal")
const emotionsModal = document.getElementById("emotions-buttons-modal")
const outputModal = document.getElementById("output")
const outputModalInner = document.getElementById("output-modal-inner")
const xBtn = document.getElementById("x-btn")

// creation of moods buttons
for (let mood of moods) {
    const btnEl = document.createElement("button")
    const node = document.createTextNode(mood.feeling)
    btnEl.classList.add("btn-mood")
    btnEl.style.backgroundColor = mood.color
    btnEl.setAttribute("value", mood.feeling.toLowerCase())
    btnEl.style.color
    btnEl.appendChild(node)
    
    emotionsModal.appendChild(btnEl)
}

emotionsModal.addEventListener("click", function(e){
  let moodPicked = (e.target.value)
  if (moodPicked){
    console.log(moodPicked)
    if (moodPicked === "random"){
      moodPicked = (moods[Math.floor(Math.random() * moods.length)].feeling).toLowerCase()
      console.log(moodPicked)
    }
    renderMood(moodPicked)
  }
})

xBtn.addEventListener("click", function(){
  outputModal.style.display = "none"
  modal.style.display = "inline"
})

function moodFilter(moodPicked){
  const selected = allsongs.filter((song) => song.moods.includes(moodPicked))
  return selected  
}

function oneMoodSelector(arraysOfSelectedMood){
  const mood = moodFilter(arraysOfSelectedMood)
  const randomNum = Math.floor(Math.random() * mood.length)
  return mood[randomNum]
}

function renderMood(moodObject){
  const mood = oneMoodSelector(moodObject)
  const songName = mood.title
  const songAlbum = (mood.album).toLowerCase().replace(/[\s,]/g, '')
  outputModalInner.innerHTML = `
  <img class="album-cover"src=img/${songAlbum}.jpg>
  <div class="song-title-modal" id="song-title-modal">
    <p class="song-title">${songName}</p>
  </div>`
  outputModal.style.backgroundColor = albumcolors[songAlbum][0]
  xBtn.style.backgroundColor = albumcolors[songAlbum][1]
  document.getElementById("song-title-modal").style.backgroundColor = albumcolors[songAlbum][1]
  modal.style.display = "none"
  outputModal.style.display = "inline"
}
