navigator.getWebcam = (
	navigator.getUserMedia || navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia || navigator.msGetUserMedia
);

navigator.getWebcam(
	{ video: true, audio: false},

	gotWebCam,
	function(err){
		console.log("Oops! Something's not right");
	}
);

function gotWebCam(stream){
	localVideo.src = window.URL.createObjectURL(stream);
	localVideo.play();

	var video_track = stream.getVideoTracks()[0];

	var output = document.getElementById('output');

	output.innerHTML = "stream id = " + stream.id + "<br/>";
	output.innerHTML += "track readyState = " + video_track.readyState + "<br/>";
	output.innerHTML += "track id = " + video_track.id + "<br/>";
	output.innerHTML += "kind = " + video_track.kind + "</br>";
}
