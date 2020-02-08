const translations = {
	'pl': {
		'langName': 'Polski',
		'synthVoice': 'pl-PL',
		'translation-setup-token' : 'Potrzebny jest klucz do Google Cloud Vision API',
		'translation-setup-token-action': 'Uzyskaj go tu',
		'translation-camera-label': 'Naciśnij i zrób zdjęcie dokumentu',
		'translation-result-header': 'Wyniki',
		'translation-intro-header': 'Hej, ustaw proszę opcje',
		'translation_lang_select': 'Ten język zostanie zachowany. W ten sposób nie będzie pomyłek przy selekcji syntezatora mowy.',
		'translation-homescreen-instructions-info': 'Po kliknięciu przycisku poniżej, zostaniesz przeniesiony do aplikacji. Pamiętaj, żeby dodać ją do ekranu głównego:',
		'translation-homescreen-1': 'IOS: Udostępnij -> Dodaj do ekranu głównego',
		'translation-homescreen-2': 'Android: Menu w prawym górnym rogu -> Dodaj do ekranu głównego',
		'updates': 'Weryfikowanie Twojej płatności...',
		'translation-go-to-app': 'Idź do aplikacji',
		'translation-payment-completed-successfully': '✅ Płatność dotarła, dzíękujemy!',
		'translations-something-wrong': 'Coś poszło nie tak! Wyślij proszę maila na <a href="mailto:support@helpmereadthis.com">support@helpmereadthis.com</a>',
		'translation-thank-you-purchase': '✅ Dziękuję za zakup klucza!'
	},
	'en': {
		'langName': 'English',
		'synthVoice': 'en-EN',
		'translation-setup-token' : 'You need to set up the Google Cloud Vision API token first.',
		'translation-setup-token-action': 'Click here to do that',
		'translation-camera-label': 'Click here and take the photo of a document',
		'translation-result-header': 'Found Text:',
		'translation-intro-header': 'You need to set up the Google Cloud Vision API token first.',
		'translation_lang_select': 'The language you select here will be hardcoded, so that the person using this will always default to one language. This is to prevent accidental language switching for voice synthesis.',
		'translation-homescreen-instructions-info': 'After clicking the button below, you will be redirected to the App. Remeber to save it on Homescreen for easy access:',
		'translation-homescreen-1': 'IOS: Share->Add to Homescreen',
		'translation-homescreen-2': 'Android: Top-right menu in Chrome->Add to Homescreen',
		'updates': 'Verifying your payment...',
		'translation-go-to-app': 'Go to the App',
		'translation-payment-completed-successfully': '✅ Payment completed successfully!',
		'translations-something-wrong': 'Something went wrong! Please email <a href="mailto:support@helpmereadthis.com">support@helpmereadthis.com</a>',
		'translation-thank-you-purchase': '✅ Thank you for purchasing token!'
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
