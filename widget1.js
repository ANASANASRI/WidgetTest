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
// Get reference to the script element
var scriptElement = document.getElementById('paypik');

// Get the values of data-access_key and data-host attributes
var accessKey = scriptElement.getAttribute('data-access_key');
var host = scriptElement.getAttribute('data-host');

// Send the values to your Angular project
var url = 'https://anasanasri.github.io/autowidget/';
var data = {
  accessKey: accessKey,
  host: host
};

// Using fetch to send data to Angular project
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(function(response) {
  console.log('Data sent successfully to Angular project');
}).catch(function(error) {
  console.error('Error sending data to Angular project:', error);
});

console.log("hhhhhhhhhhhhhhhhhhhh",data);
// Posting data to Angular project
});
