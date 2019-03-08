
// function encodeAudio(event) {
//     // grab user-selected file
//     let reader = new FileReader();
//     const file = event.target.files[0];
//     // convert file to string including base64
//     reader.readAsDataURL(file);
//     reader.onload = (file) => {
//         // separate base64 from result string
//         let encoded = reader.result.split(",");
//         console.log("I am result split: ", encoded[1])
//     }
// }

// export default encodeAudio;