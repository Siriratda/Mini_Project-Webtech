function onPlayerReady(event) {
    console.log("Player is ready!");
    event.target.playVideo();
    event.target.setVolume(20);
}

document.addEventListener('click', function() {
    if (player && player.playVideo) {
        player.unMute();
        player.playVideo();
    }
});

let input = document.getElementById("headshell");
let audio = document.getElementById("audio-player");

input.addEventListener("click", function(){
  if(audio.paused){
    audio.play();
    audio.currentTime = 0;
    audio.volume = 0.05;
  } else {
    audio.pause();
  }
});

function audioVolume(amount) {
    let changevolume = document.getElementsByTagName("audio")[0];
    changevolume.volume = amount;
}