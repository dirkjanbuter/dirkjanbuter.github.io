var orgAudioTags = document.getElementsByTagName("audio");
var listenPlayer = document.createElement("div");
var audioPlayer = document.createElement("audio");
var progressBar = document.createElement("div");
var progressBarInner = document.createElement("div");
var playBtn = document.createElement("div");

// Replace audio tag with JavaScript audio player
function listenPlayer_initAudioPlayer()
{
	var orgAudioTagsArray = Array.prototype.slice.call(orgAudioTags);
	orgAudioTagsArray.forEach(function (orgAudioTag, index) {
		audioPlayer.setAttribute('src', orgAudioTag.src);
		
		playBtn.addEventListener("click", listenPlayer_playPause);
		audioPlayer.addEventListener("timeupdate", listenPlayer_updateProgressBar);
		progressBar.addEventListener("click", listenPlayer_seek);
		
		listenPlayer.className = "listenPlayer";
		progressBar.className = "listenPlayerProgressBar";
		playBtn.className = "listenPlayerPlayButton";
		playBtn.className = 'listenPlayerPause';
		
		progressBar.appendChild(progressBarInner);
		listenPlayer.appendChild(audioPlayer);
		listenPlayer.appendChild(progressBar);
		listenPlayer.appendChild(playBtn);

		orgAudioTag.parentNode.replaceChild(listenPlayer, orgAudioTag);
	});
}

// Play/Pause control
function listenPlayer_playPause()
{
	if(audioPlayer.paused){
	    audioPlayer.play();
	    playBtn.className = 'listenPlayerPlay';
	} else {
	    audioPlayer.pause();
	    playBtn.className = 'listenPlayerPause';
	}
}

function listenPlayer_seek(e)
{
	var rect = e.target.getBoundingClientRect();
      	var x = e.clientX - rect.left;
	audioPlayer.currentTime = Math.floor(audioPlayer.duration * x / e.target.clientWidth);
}	


// Update progress bar
function listenPlayer_updateProgressBar()
{
	
	progressBarInner.style.width = (audioPlayer.currentTime * 100 / audioPlayer.duration) + '%';
}

window.onload = listenPlayer_initAudioPlayer;

