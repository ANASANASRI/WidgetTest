 document.addEventListener("DOMContentLoaded", function() {

/////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Create the button
    var button = document.createElement("button");
    button.textContent = "Payer avec aman pay";
    button.id = "toggleButton";

    // Append the button to the desired container
    var container = document.getElementById("content-behind-iframe");
    container.appendChild(button);

    // Click 
    button.addEventListener("click", function() {
        var iframe = document.getElementById("myiframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "myiframe";
            iframe.src = "https://anasanasri.github.io/autowidget/";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            container.appendChild(iframe);
        } else {
            iframe.style.display = "block";
        }
    });

    //
    window.addEventListener("message", function(event) {
        if (event.data === "closeWidget") {
            document.getElementById("myiframe").style.display = "none";
        }
    });
    
    // Dynamically inject CSS styles
    var styles = `
        #toggleButton {
            background-color: green;
            color: white;
            border: round 1px solid;
            padding: 10px 20px;
            cursor: pointer;
            /* Add any other styles you desire */
        }
    `;

    var styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Extracting data-access_key and data-host attributes
var accessKey = document.getElementById("paypik").getAttribute("data-access_key");
var host = document.getElementById("paypik").getAttribute("data-host");

// Sending data to Angular project
var data = {
    accessKey: accessKey,
    host: host
};

// Posting data to Angular project
window.parent.postMessage(data, "https://anasanasri.github.io/autowidget/");
});
