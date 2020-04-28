import { apikey } from "./apikey";

let encoded = null;
//TODO: refactor to get rid of global var

export const encodeAudio = (event) => {
  let reader = new FileReader();
  try {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = (file) => {
      encoded = reader.result.split(",")[1];
      console.log(encoded);
      return encoded;
    };
  } catch (error) {
    alert(
      "Uh oh, an error occurred. Please try again. Did you select a .wav file less than a minute long?"
    );
  }
};

export const getTranscript = () => {
  // add Google Cloud project API key to src/apikey.js
  // this.setState({ loading: true });
  let url = "https://speech.googleapis.com/v1/speech:recognize?key=" + apikey;
  let config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
    enableAutomaticPunctuation: true,
  };
  let audio = {
    content: encoded,
  };
  let requestBody = {
    audio: audio,
    config: config,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      // this.setState({ loading: false });
      let newText = response.results[0].alternatives[0].transcript;
      // this.setState({ transcriptText: newText });
    })
    .catch((error) => {
      console.error(error);
      // this.setState({ transcriptText: newText });
    });
};
