



var myPeerConnection;
var remotePeerConnection;

var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection
|| webkitRTCPeerConnection;

var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription
|| window.webkitRTCSessionConnection;


var RTCIce = window.RTCIceCandidate || window.mozRTCIceCandidate ||  window.webkitRTCIceCandidate;

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
	createPeerConnections(stream);
}

function createPeerConnections(stream){

	//create the local peer connection
	myPeerConnection = new PeerConnection(null);
	console.log("create local peer connection object myPeerConnection");
	//xreate the remote peer connection
	remotePeerConnection = new PeerConnection(null);
	console.log("create remote peer connection object remotePeerConnection");

	//listen for ICE candiates on each
	myPeerConnection.onicecandidate = gotMyICECandidate;
	remotePeerConnection.onicecandidate = gotRemoteICECandidate;
	//handler stream on each peer
	myPeerConnection.addStream(stream);
	console.log("Add local stream to PeerConnection");

	remotePeerConnection.onaddstream = gotRemoteStream;
	//create lcoal peer connection offer
	myPeerConnection.createOffer(gotLocalDescription, function(error){
		console.log(error);
	});

	console.log("Create DSP offer on myPeerConnection");
}

//when local ICE cadiadte is recieved
function gotMyICECandidate(event){
	// console.log(event.candidate);
	if(event.candidate){
		//send the lcoal ICE candidate to the remote peer
		remotePeerConnection.addIceCandidate(new RTCIce(
			event.candidate
		));
		console.log("sendt my ICE candiates to remotePeerConnection");
	}
}

// when remote ICE candidate are received by me
function gotRemoteICECandidate(event){
	// console.log(event.candidate);
	if(event.candidate){
		//add the remote ice candiadate to my local peer connection
		myPeerConnection.addIceCandidate(new RTCIce(
			 event.candidate
		));
		console.log("added remote ICE candiates to MyPeerConnection");
	}
}


//Create SDP offer
function gotLocalDescription(description){
	myPeerConnection.setLocalDescription(description);

	console.log("Create offer from myPeerConnection");

	remotePeerConnection.setRemoteDescription(description);
	remotePeerConnection.createAnswer(gotRemoteDescription,function(error){
		console.log(error);
	});
}

//when remote SDP arrives
function gotRemoteDescription(description){
	remotePeerConnection.setLocalDescription(description);

	console.log('Got answer from remotePeerConnection');

	myPeerConnection.setRemoteDescription(description);
}


//Success show the remote video;
function gotRemoteStream(event){
	theirVideo.src = URL.createObjectURL(event.stream);
	theirVideo.play();
	console.log("Got remote stream");
}