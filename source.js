/*const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: 'a309cbeae1d54537b5956f31bcb385e8'
});

app.models.predict("aaa03c23b3724a16a56b629203edc62c", "https://samples.clarifai.com/metro-north.jpg").then(
    function (response) {
        console.log(response);
        // do something with response
    },
    function (err) {
        console.log(err);
        // there was an error
    }
);

*/

function loadImage() {
    var fileElmt = document.getElementById("file");
    var image = handleFileUpload(fileElmt);

    var imageElmt = document.getElementById("img");

    if(image === undefined){
        console.log('ERROR WHILE READING IMAGE  D:');
    }

    console.log("success");

    return true;
}

function handleFileUpload(doc) {
    return new Promise(function (resolve, reject) {
        var file = doc.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            return fileReader.result;            
        }

        if(file){
            fileReader.readAsDataURL(file);
        } else {
            return undefined;
        }
    })
}