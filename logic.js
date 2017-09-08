function loadImage() {
    var imageUrl = document.getElementById("url").value;
    var image = document.getElementById("img");

    image.src = imageUrl;
    image.style.display = "";
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
    loadImage();
    // Clean list
    document.getElementById("table-body1").innerHTML = "";
    document.getElementById("table-body2").innerHTML = "";

    var tableDiv = document.getElementById("tables");
    debugger;
    tableDiv.style.display = "";

    var imageSource = document.getElementById("url").value;
    app.models.predict("aaa03c23b3724a16a56b629203edc62c", imageSource).then(
        function (response) {
            var resultList = document.getElementById("resultList");
            var tbody1 = document.getElementById("table-body1");
            var tbody2 = document.getElementById("table-body2");
            var tables = [tbody1, tbody2];

            var concepts = response.outputs[0].data.concepts;
            for (let i = 0; i < concepts.length; i++) {
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                td1.appendChild(document.createTextNode(concepts[i].name));

                var td2 = document.createElement("td");
                td2.appendChild(document.createTextNode(concepts[i].value));

                tr.appendChild(td1);
                tr.appendChild(td2);
                tables[Math.floor(i / 10)].appendChild(tr);
            }
        },
        function (err) {
            console.log(err);
        }
    );

}