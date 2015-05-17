
$(document).ready(function() {

	navigator.getWebcam = (
		navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia
		);

	var peer = new Peer({
		key:'l4x2yztkm7dp9zfr',
		debug:3,
		config:{'iceServers':[
		{url:'stun:stun01.sipphone.com'},
		{url:'stun:stun.ekiga.net'},
		{url:'stun:stun.fwdnet.net'},
		{url:'stun:stun.ideasip.com'},
		{url:'stun:stun.iptel.org'},
		{url:'stun:stun.rixtelecom.se'},
		{url:'stun:stun.schlund.de'},
		{url:'stun:stun.l.google.com:19302'},
		{url:'stun:stun1.l.google.com:19302'},
		{url:'stun:stun2.l.google.com:19302'},
		{url:'stun:stun3.l.google.com:19302'},
		{url:'stun:stun4.l.google.com:19302'},
		{url:'stun:stunserver.org'},
		{url:'stun:stun.softjoys.com'},
		{url:'stun:stun.voiparound.com'},
		{url:'stun:stun.voipbuster.com'},
		{url:'stun:stun.voipstunt.com'},
		{url:'stun:stun.voxgratia.org'},
		{url:'stun:stun.xten.com'},
		{
			url:'turn:numb.viagenie.ca', 
			username:"Cqshinn92@gmail.com",
			credential:'championcloudx4'

		}
		]}
	});

	//on open,set the peer id
	peer.on('open',function(){
		$('#my-id').text(peer.id);
	});

	peer.on('call',function(call){
			call.answer(window.localStream);
			step3(call);
		}
	);

	$(function(){
		//init call
		$('#make-call').click(function(){
			var call = peer.call($('#callto-id').val(),window.localStream);
			step3(call);
		});

		$('#end-call').click(function(){
			window.existingCall.close();
			step2();
		});

		//retry if getUserMedia fails
		$('#step1-retry').click(function(){
			$('#step1-error').hide();
			step1();
		});

		step1();
	});

	function step1(){
		navigator.getWebcam(
		{
			audio:false,
			video:true
		},
		function(stream){
			$('#my-video').prop('src',URL.createObjectURL(stream));
			window.localStream = stream;
			step2();
		},
		function(error){
			$('#step1-error').show();
			console.log(error);
		}
		);
	}

	function step2(){
		$('#step1','step3').hide();
		$('#step2').show();
	}

	function step3(call){
		if(window.existingCall){
			window.existingCall.close();
		}

		call.on('stream',function(stream){
			$('#their-video').prop('src', URL.createObjectURL(stream));
		});
		$('#step1','#step2').hide();
		$('#step3').show();
	}


});


