function loadImage() {
    var imageUrl = document.getElementById("url").value;
    var image = document.getElementById("img");

    image.src = imageUrl;
}

function handleFileUpload(doc) {
    return new Promise(function (resolve, reject) {
        var file = doc.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            resolve(fileReader.result);
        }

        if (file) {
            try {
                fileReader.readAsDataURL(file);
            } catch (error) {
                console.log(error);
                reject(error);
            }

        }
    })
}

const app = new Clarifai.App({
    apiKey: 'a309cbeae1d54537b5956f31bcb385e8'
});

function analyzeImage() {
    // Clean list
    var resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    var imageSource = document.getElementById("url").value;
    app.models.predict("aaa03c23b3724a16a56b629203edc62c", imageSource).then(
        function (response) {
            var resultList = document.getElementById("resultList");

            var concepts = response.outputs[0].data.concepts;
            for (let i = 0; i < concepts.length; i++) {
                var li = document.createElement("li");
                var conceptText = "Concept : " + concepts[i].name + ".  Certainty: " + concepts[i].value;
                li.appendChild(document.createTextNode(conceptText));
                li.className = "list-group-item";
                resultList.appendChild(li);
            }
        },
        function (err) {
            console.log(err);
        }
    );

}