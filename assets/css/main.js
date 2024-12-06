let buttons = document.querySelectorAll(".playpause-track");
buttons.forEach(el => el.addEventListener("click", (event) => {
    playpauseTrack(event);
}));

let playpause_btn = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider");
let duration = document.querySelector(".duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let track_list = {
    "#player1": "assets/music/unnv.mp3",
    "#player2": "assets/music/xssnlfl.mp3",
    "#player3": "assets/music/alo.mp3",
};

let curr_track = document.createElement('audio');
let currentPlayer = "";

function loadTrack(track) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track;
    curr_track.load();

    updateTimer = setInterval(seekUpdate, 1000);

    curr_track.addEventListener("ended", () => {
        resetValues();
    });
}

function resetValues() {
    duration.textContent = "00:00/00:00";
    seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack(event) {
    let p_id = event.target.parentElement.getAttribute("data-player");
    if (p_id != currentPlayer) {
        currentPlayer = p_id; 
        pauseTrack();
        loadTrack(track_list[p_id]);
    }

    playpause_btn = document.querySelector(p_id + " .playpause-track");
    seek_slider = document.querySelector(p_id + " .seek_slider");
    duration = document.querySelector(p_id + " .duration")

    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="bi bi-pause-fill fs-2"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="bi bi-play-fill fs-2"></i>';;
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        duration.textContent = currentMinutes + ":" + currentSeconds + "/" + durationMinutes + ":" + durationSeconds;
    }
}