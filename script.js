// Function to get query parameters from the URL
function getQueryParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to validate the document
function validateDocument() {
    // Get values from the URL
    var url = getQueryParameter("url");
    var trophy = getQueryParameter("trophy");
    var name = getQueryParameter("name");

    // Perform validation
    checkValidity(url, trophy, name);
}

function checkValidity(url, trophy, name) {
    // Perform asynchronous validation (you may want to use a server-side script for this)
    // For simplicity, let's assume winners.txt is a plain text file with one name per line
    fetch("winners.txt")
        .then(response => response.text())
        .then(data => {
            // Check if the name is present in the file
            var winners = data.split("\n");
            var isValid = false;
            for (var i = 0; i < winners.length; i++){
                if((trophy + "," + name) == winners[i].trim()){
                    isValid = true;
                    break;
                }
            }
            // Display the result on the webpage
            displayResult(isValid, trophy, name); 
        })
        .catch(error => {
            console.error("Error reading winners.txt:", error);
            displayResult(false);
        });
}

function displayResult(isValid, trophy, name) {
    var resultDiv = document.getElementById("validationResult");
    resultDiv.style.fontSize = "60px";
    resultDiv.style.textAlign = "center";
    if (isValid) {
        resultDiv.innerHTML = "Valid Trophy : " + trophy + " : " + name ; 
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerHTML = "Invalid Trophy Ya Nassab";
        resultDiv.style.color = "red";
    }
}

// Automatically validate the document when the page loads
validateDocument();