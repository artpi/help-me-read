var synth = window.speechSynthesis;
var currentSelection = null;


function speak( text, language ){
	voices = synth.getVoices().filter( function( v ) {
		return ( v.lang === translations[language].synthVoice );
	} );
	//console.log( voices );
	if (synth.speaking) {
		console.error('speechSynthesis.speaking');
		return;
	}
	// if (inputTxt.value !== '') {
	var utterThis = new SpeechSynthesisUtterance( text );
	utterThis.onend = function (event) {
		console.log('SpeechSynthesisUtterance.onend');
	}
	utterThis.onerror = function (event) {
		console.error('SpeechSynthesisUtterance.onerror');
	}
//    var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
//    for(i = 0; i < voices.length ; i++) {
//      if(voices[i].name === selectedOption) {
//        utterThis.voice = voices[i];
//      }
//    }
	utterThis.voice = voices[0];
	//utterThis.pitch = pitch.value;
	//utterThis.rate = rate.value;
	synth.speak(utterThis);
}

function processResponse( blocks, language ) {
	blocks.forEach( block => {
		var elem = $( '<div>' + block.text + '</div>' );
	$('#results div.list').append( elem );
	elem.on( 'click', function () {
		moveBox( block.vertices );
		speak( block.text, language );
		if( currentSelection ) {
			currentSelection.css( 'background-color', 'transparent' );
		}
		elem.css( 'background-color', '#ffff009c' );
		currentSelection = elem;
	} );
} );

}

function getSizeRatio() {
	return $('#results img').width() / $('#results img')[0].naturalWidth;
}
function moveBox( vertices ) {
	var sizeRatio = getSizeRatio();
	var maxY = vertices[0].y;
	var maxX = vertices[0].x;
	var minY = vertices[0].y;
	var minX = vertices[0].x;
	vertices.forEach( function( data ) {
		if( data.x > maxX ) {
			maxX = data.x;
		}
		if( data.y > maxY ) {
			maxY = data.y;
		}
		if( data.x < minX ) {
			minX = data.x;
		}
		if( data.y < minY ) {
			minY = data.y;
		}
	} );
	var dimensions = {
		top: Math.floor( minY * sizeRatio ),
		left: Math.floor( minX * sizeRatio ),
		width: Math.ceil( ( maxX - minX ) * sizeRatio ),
		height: Math.ceil( ( maxY - minY ) * sizeRatio )
	};
	$('#results .mark').css( 'top', dimensions.top );
	$('#results .mark').css( 'left', dimensions.left );
	$('#results .mark').css( 'width', dimensions.width );
	$('#results .mark').css( 'height', dimensions.height );
}

function init() {
	const urlParams = new URLSearchParams( window.location.search );
	const token = urlParams.get( 'token' );
	const language = urlParams.get( 'lang' );
	initTranslations( language );
	if ( token ) {
		$('#set_up_token').hide();
		$('#upload').show();
		if( token === 'demo') {
			$('#demo').show();
		}
	} else {
		$('#set_up_token').show();
	}

	$("input:file").change(function (){
		//stop submit the form, we will post it manually.
		//event.preventDefault();
		$('#upload').hide();
		$('#results').show();
		$('#results').css( 'display', 'flex');
		// Get form

		// Create an FormData object
		var data = new FormData();
		var files = $('input:file')[0].files[0];
		var reader = new FileReader();
		reader.addEventListener("load", function () {
			$('#results img').attr( 'src', reader.result );
			var base64result = reader.result.split(',')[1];
			// convert image file to base64 string
			var request = {
				requests: [
					{
						image: {
							content: base64result
						},
						features: [
							{
								"type": "DOCUMENT_TEXT_DETECTION"
							}
						]
					}
				]
			};
			var endpoint = 'https://vision.googleapis.com/v1/images:annotate';
			// If this endpoint is provided by subscription
			if ( token.indexOf( 'sub_' ) === 0 ) {
				endpoint = 'https://help-me-read-this.appspot.com/vision';
			}
			if ( token === 'demo' ) {
				endpoint = './demo/demo_response_en.json';
			}
			$.ajax({
				url: endpoint + '?key=' + token,
				type: 'post',
				data: JSON.stringify( request ),
				dataType: 'json',
				contentType: 'application/json',
				//processData: false,
				success: function(response){
					var blocks = [];
					console.log( response );
					if(response != 0){
						response.responses.forEach( r => r.fullTextAnnotation.pages.forEach( p => p.blocks.forEach( block => {
							var text = block.paragraphs.map( paragraph => paragraph.words.map( word => word.symbols.map( symbol => symbol.text ).join( "" ) ).join(' ') ).join("\n");
						blocks.push( {
							text: text,
							vertices: block.boundingBox.vertices
						} );
					} ) ) );
						processResponse( blocks, language );
					}
					else{

					}
				},
			});
		}, false);
		reader.readAsDataURL( files );

	});

}
$( init );