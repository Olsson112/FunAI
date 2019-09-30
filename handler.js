let classifier;
var imageContainer = document.getElementById("imageContainer")
let feedbackText = document.getElementById("result")
let loader = document.getElementById("loader")
const fileInput = document.getElementById('file-input');


fileInput.addEventListener('change', (e) => imageTaken(e.target.files));

async function processImage(image) {
    try {
        turnOnLoader()
        const classifier = await ml5.imageClassifier("MobileNet")
        const predictions = await classifier.classify(image)
        turnOffLoader(predictions[0].label, predictions[0].confidence)
        console.log(predictions)
    } catch(err) {
        console.log(err)
    }
}

function turnOnLoader() {
    feedbackText.style.display = "none"
    loader.style.display = "initial"
}

function turnOffLoader(label, confidence) {
    feedbackText.innerText = label
    feedbackText.style.display = "initial"
    loader.style.display = "none"
}

function imageTaken(files) {

  var image = URL.createObjectURL(files[0])
  var imageTag = document.createElement("img")
  imageTag.classList += "image"
  imageTag.src = image
  imageContainer.innerHTML = ""
  imageContainer.appendChild(imageTag)
  
  processImage(imageTag);
} 


