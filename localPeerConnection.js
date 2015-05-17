var localStream, localPeerConnection, remotePeerConnection;

var localVideo = document.getElementById("localVideo");

var remoteVideo = document.getElementById("remoteVideo");

var startButton = document.getElementById("startButton");

var callButton = document.getElementById("callButton");\
var hangupButton = document.getElementById("hangupButton");

startButton.disabled = false;
callButton.disabled = true;
hangupButton.disabled = true;

startButton.onclick = start;
callButton.onclick = call;
hangupButton.onclick = hangup;

function log(text){
	console.log("At time: " + (performance.now() / 1000).toFixed(3) + " --> " \
		+ text);
}

function successCallback(stream){
	log("Received local stream");

	if( window.URL ){
		localVideo.src = URL.createObjectURL(stream);
	}
	else{
		localVideo.src = stream;
	}

	localStream = stream;

	callButton.disabled = false;
}

function start(){
	log("Requesting local stream");

	startButton.disabled = true;
	navigator.getUserMedia = navigator.getUserMedia 
	|| navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	navigator.getUserMedia({audio:true, video: true}, successCallback, function(error){
		log("navigator.getUserMedia error: " + error);
	});
}

function call(){
	callButton.disabled = true;
	hangupButton.disabled = false;
	log("Starting call");

	if( navigator.webkitGetUserMedia){
		if(localStream.getVideoTracks().length > 0){
			log("using video device: " + localStream.getVideoTracks()[0].label);
		}
		if( localStream.getAudioTracks().length > 0){
			log("using audio device: " + localStream.getAudioTracks()[0].label);
		}
	}
}
