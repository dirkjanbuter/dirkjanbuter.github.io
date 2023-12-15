var orgAudioTags = document.getElementsByTagName("audio");

// Replace audio tag with JavaScript audio player
function nextPlayer_initAudioPlayer()
{
	var orgAudioTagsArray = Array.prototype.slice.call(orgAudioTags);
	orgAudioTagsArray.forEach(function (orgAudioTag, index) {
		var playlistUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + "/" + orgAudioTag.getAttribute('playlist');
		var ajaxRequest = new XMLHttpRequest();
		
		
		ajaxRequest.addEventListener("readystatechange", function(e) 
		{
			if(ajaxRequest.readyState > 4)
			{
			}
			else if(ajaxRequest.readyState == 4)
			{
				if(ajaxRequest.status == 200)
				{
					var nextPlayer = document.createElement("div");
					var audioPlayer = document.createElement("audio");
					var progressBar = document.createElement("div");
					var progressBarInner = document.createElement("div");
					var playBtn = document.createElement("div");

				
					var jsonPlaylist = JSON.parse(ajaxRequest.responseText);

					audioPlayer.setAttribute('src', orgAudioTag.src);
					
					playBtn.addEventListener("click", nextPlayer_playPause.bind(nextPlayer_playPause, audioPlayer, playBtn));
					audioPlayer.addEventListener("timeupdate", nextPlayer_updateProgressBar.bind(nextPlayer_updateProgressBar, audioPlayer, progressBarInner));
					progressBar.addEventListener("click", nextPlayer_seek.bind(nextPlayer_seek, audioPlayer));
					audioPlayer.addEventListener("ended", nextPlayer_ended.bind(nextPlayer_ended, audioPlayer, jsonPlaylist));

					nextPlayer.className = "listenPlayer";
					progressBar.className = "listenPlayerProgressBar";
					playBtn.className = "listenPlayerPlayButton";
					playBtn.className = 'listenPlayerPause';
					
					progressBar.appendChild(progressBarInner);
					nextPlayer.appendChild(audioPlayer);
					nextPlayer.appendChild(progressBar);
					nextPlayer.appendChild(playBtn);

					orgAudioTag.parentNode.replaceChild(nextPlayer, orgAudioTag);

				}
			}
		});
		ajaxRequest.open("GET", playlistUrl, true);
		ajaxRequest.send();
	});
}

// Play/Pause control
function nextPlayer_playPause(audioPlayer, playBtn)
{
	if(audioPlayer.paused){
	    audioPlayer.play();
	    playBtn.className = 'listenPlayerPlay';
	} else {
	    audioPlayer.pause();
	    playBtn.className = 'listenPlayerPause';
	}
}

function nextPlayer_seek(audioPlayer, e)
{
	var rect = e.target.getBoundingClientRect();
      	var x = e.clientX - rect.left;
	audioPlayer.currentTime = Math.floor(audioPlayer.duration * x / e.target.clientWidth);
}	

function nextPlayer_ended(audioPlayer, jsonPlaylist)
{
	var audioUrl = '';
	var currentAudio = audioPlayer.src.split('/').pop();
	for (var i = 0; i < jsonPlaylist.length; i++)
	{
		if(currentAudio == jsonPlaylist[i]['audio'])
		{
			if(jsonPlaylist[i+1] !== undefined)
			{	
				audioUrl = audioPlayer.src.substring(0, audioPlayer.src.lastIndexOf('/')) + "/" + jsonPlaylist[i+1]['audio'];	audioPlayer.pause();	
			}
			else
			{	
				audioUrl = audioPlayer.src.substring(0, audioPlayer.src.lastIndexOf('/')) + "/" + jsonPlaylist[0]['audio'];	audioPlayer.pause();	
			}

		}
	}
	audioPlayer.src = audioUrl;
	audioPlayer.load();
	audioPlayer.play();
}

// Update progress bar
function nextPlayer_updateProgressBar(audioPlayer, progressBarInner)
{
	
	progressBarInner.style.width = (audioPlayer.currentTime * 100 / audioPlayer.duration) + '%';
}

window.onload = nextPlayer_initAudioPlayer;

