const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano__key");

const buttons = document.querySelectorAll(".btn");
const notesBtn = document.querySelector(".btn--notes");
const lettersBtn = document.querySelector(".btn--letters");


buttons.forEach(item => {

    item.addEventListener("mousedown", () => {   // btn active
        const currentBtn = item;

        buttons.forEach(item => {
            item.classList.remove("active");
        });
        currentBtn.classList.add("active");


        if (lettersBtn.classList.contains("active")) {   // switch attr 
            pianoKeys.forEach(item => {
                item.classList.add("letter");
            });
        } else if (notesBtn.classList.contains("active")) {
            pianoKeys.forEach(item => {
                item.classList.remove("letter");
            });
        }
    });

});

// /.BTN FUNCTION

let playAudio = (src) => {
    if (src != undefined) {
        const audio = new Audio();
        audio.src = src;
        audio.currentTime = 0;
        audio.play();
    }
};

piano.addEventListener("click", (event) => {
    if (event.target.classList.contains("piano__key")) {
        const note = event.target.dataset.note;
        const src = `assets/audio/${note}.mp3`;
        playAudio(src);
    }
});

const keyTrack = (event) => {

    pianoKeys.forEach((el) => {
        if (el.dataset.letter == event[3]) {
            const note = el.dataset.note;
            const src = `assets/audio/${note}.mp3`;
            playAudio(src);
            el.classList.add('active');
        }
    });

};

const keyTrackOff = () => {
    pianoKeys.forEach(el => {
        el.classList.remove("active");
    });
};

window.addEventListener('keydown', (event) => {
    keyTrack(event.code);
});
window.addEventListener('keyup', keyTrackOff);


// /.AUDIO FUNCTION

const fullBtn = document.querySelector(".btn--fullscreen");

fullBtn.addEventListener("click", () => {
    activateFullscreen(document.documentElement);
    deactivateFullscreen(document.documentElement);
    fullBtn.classList.toggle("active");
});

fullBtn.addEventListener('keydown', (event) => {
    if (event.code === "Escape") {
        fullBtn.classList.remove("active");
    }
});

function activateFullscreen(element) {
    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function deactivateFullscreen() {
    if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
// /.API FULLSCREEN










