# 🧐 Help Me Read This!

### An app that captures the photo from the camera and reads the text out loud

You, or your loved ones with vision impairment will be able to:

- 💊 Scan and read the fine print on medical prescriptions
- 📋 Read the legal documents
- 🚀 Enjoy a little bit of freedom, self-sufficiency and dignity

## The full description, video and demo is available here:

# https://www.helpmereadthis.com/

## Architecture

This is a Single Page Web Application:

- Uses .webmanifest to be installable to home screen and behave as an app
- Uses file input to capture image from camera
- Uploads the image to Google Cloud Vision API which does OCR recognition
- Uses Speech API to read the content out loud
- IF Google API token is used, only Google backend is used, ensuring total independence from my backend
- If you don't want to set up a token, you can subscribe to use my backend.

## Contributing

This is a hackish project. Please do contribute :D. The actual logic of the app is in ./app.html and ./app.js
