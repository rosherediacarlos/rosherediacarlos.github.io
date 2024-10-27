let anniversary = "2024-08-01";
let date = new Date(anniversary);
let today = new Date();

// Calcular la diferencia en milisegundos
let value = today.getTime() - date.getTime();

// Diferencia en años
let yearsDiff = today.getFullYear() - date.getFullYear();

// Diferencia en meses
let monthsDiff = today.getMonth() - date.getMonth();

// Diferencia en días
let daysDiff = today.getDate() - date.getDate();

// Ajustar si el día actual es menor que el del aniversario en el mismo mes
if (daysDiff < 0) {
    monthsDiff--;  // Reducir el mes si no hemos alcanzado el día del mes
    let lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);  // Último día del mes anterior
    daysDiff += lastMonth.getDate();  // Ajustar el total de días
}

// Ajustar si el mes actual es menor que el del aniversario
if (monthsDiff < 0) {
    yearsDiff--;  // Reducir el año si no hemos alcanzado el mes del aniversario
    monthsDiff += 12;  // Ajustar el total de meses
}

console.log(value);

document.getElementById("days").textContent = daysDiff.toString();
document.getElementById("months").textContent = monthsDiff.toString();
document.getElementById("years").textContent = yearsDiff.toString();


let musicPlayer = document.querySelector(".music-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackInfo = document.querySelector(".track-info");
let trackName = document.querySelector(".trackname");
let trackArtist = document.querySelector(".trackartist");
let trackNav = document.querySelector(".track-nav");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let trackIndex = 0;
let isPlaying = false;
let isHidden = true;

let currentTrack = document.createElement("audio");
let soundBars = document.querySelector(".sound-bars");

togglePlayer.addEventListener("click", function() {
    isHidden = !isHidden;
    if(isHidden){
        musicPlayer.classList.remove("hide");
        togglePlayer.innerHTML = '<img class="w-[98%]" src="icons/close.svg">';
        trackInfo.style.transitionDelay = "0.4s";
        trackNav.style.transitionDelay = "0.4s";
    } else {
        musicPlayer.classList.add("hide");
        togglePlayer.innerHTML = '<img class="w-full" src="icons/plus.svg">';
        trackInfo.style.transitionDelay = "0s";
        trackNav.style.transitionDelay = "0s";
    }
});

let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPLay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});


let trackList = [
    {
        name: "Coincidir",
        artist: "Macaco",
        path: "./music/macaco_coincidir.mp3",
    },
    {
        name: "Ruido",
        artist: "Amaral",
        path: "./music/amaral_ruido.mp3",
    },
    {
        name: "Ella",
        artist: "Enanitos Verdes",
        path: "./music/ella_enanitos_verdes.mp3",
    },
    {
        name: "Conexion",
        artist: "Macaco",
        path: "./music/macaco_conexion.mp3",
    },
    {
        name: "Cuenta hasta 3",
        artist: "Menny flores",
        path: "./music/menny_flores_cuenta_hasta_tres.mp3",
    },
    {
        name: "Kilometros",
        artist: "Sin bandera",
        path: "./music/sin_bandera_kilometros.mp3",
    },
];

// EVENT LISTENERS
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

function loadTrack(trackIndex){
    currentTrack.src = trackList[trackIndex].path;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.addEventListener("ended", nextTrack);
    currentTrack.load();
}

loadTrack(trackIndex);

function playPauseTrack(){
    if(isPlaying == false){
        playTrack();
    }else{
        pauseTrack();
    }
}

function playTrack(){
    audioElement = document.getElementById("backgroundAudio");
    
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

function pauseTrack(){
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

function nextTrack(){
    if(trackIndex < trackList.length - 1){
        trackIndex += 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = 0;
        loadTrack(trackIndex);
        playTrack();
    } 
}

function prevTrack(){
    if(trackIndex > 0){
        trackIndex -= 1;
        loadTrack(trackIndex);
        playTrack();
    }else{
        trackIndex = trackList.length - 1;
        loadTrack(trackIndex);
        playTrack();
    }
}