const translations = {
	'pl': {
		'langName': 'Polski',
		'synthVoice': 'pl-PL',
		'translation-setup-token' : 'Potrzebny jest klucz do Google Cloud Vision API',
		'translation-setup-token-action': 'Uzyskaj go tu',
		'translation-camera-label': 'Naciśnij i zrób zdjęcie dokumentu',
		'translation-result-header': 'Wyniki',
		'translation-intro-header': 'Hej, ustaw proszę opcje'
	},
	'en': {
		'langName': 'English',
		'synthVoice': 'en-EN',
		'translation-setup-token' : 'You need to set up the Google Cloud Vision API token first.',
		'translation-setup-token-action': 'Click here to do that',
		'translation-camera-label': 'Click here and take the photo of a document',
		'translation-result-header': 'Found Text:',
		'translation-intro-header': 'You need to set up the Google Cloud Vision API token first.'
	}
};
function initTranslations( language ) {
	Object.keys( translations[language] ).forEach( function ( id ) {
		const elem = $( '#' + id );
		if( elem ) {
			elem.text( translations[language][ id ] );
		}
	} );
}
