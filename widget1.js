document.addEventListener("DOMContentLoaded", function() {
    // Create the button
    var button = document.createElement("button");
    button.textContent = "Payer avec pay pik !!";
    button.id = "toggleButton";

    // Append the button to the desired container
    var container = document.getElementById("content-behind-iframe");
    container.appendChild(button);

    
    
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
// Click event listener for the button
button.addEventListener("click", function() {

        // Get reference to the script element
        var scriptElement = document.getElementById('paypik');

        // Get the values of data-access_key and data-host attributes
        var accessKey = scriptElement.getAttribute('data-access_key');
        var host = scriptElement.getAttribute('data-host');

////////////////////////////////

        // Construct the URL with the correct values of accessKey and host
        var url = `http://localhost:8085/merchant/permission?hostname=${host}&secretKey=${accessKey}`;
        // Fetch data from localhost
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response from localhost:', data);
            if (data === false) {
                // If data is false, redirect to error page
                loadError();
            } else {
                // If data is true, load the widget
                loadWidget(accessKey, host);
            }
            })
        .catch(error => console.error('Error fetching data from localhost:', error));
});

////////////////////////////////

    function loadError() {
        var iframe = document.getElementById("myiframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "myiframe";
            iframe.src = 'https://anasanasri.github.io/errorpermission/';
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            container.appendChild(iframe);
        } else {
            iframe.style.display = "block";
        }
    }

    //

    function loadWidget(accessKey, host) {
        var iframe = document.getElementById("myiframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "myiframe";
            iframe.src = `https://anasanasri.github.io/autowidget/?access_key=${accessKey}&host=${host}`;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            container.appendChild(iframe);
        } else {
            iframe.style.display = "block";
        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Event listener to handle message received from the widget
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
});


//  document.addEventListener("DOMContentLoaded", function() {

// /////////////////////////////////////////////////////////////////////////////////////////////////////////
//     // Create the button
//     var button = document.createElement("button");
//     button.textContent = "Payer avec aman pay";
//     button.id = "toggleButton";

//     // Append the button to the desired container
//     var container = document.getElementById("content-behind-iframe");
//     container.appendChild(button);

//     // Click 
//     button.addEventListener("click", function() {
//         var iframe = document.getElementById("myiframe");
//         if (!iframe) {
//             iframe = document.createElement("iframe");
//             iframe.id = "myiframe";
//             iframe.src = "https://anasanasri.github.io/autowidget/";
//             iframe.style.width = "100%";
//             iframe.style.height = "100%";
//             container.appendChild(iframe);
//         } else {
//             iframe.style.display = "block";
//         }
//     });

//     //
//     window.addEventListener("message", function(event) {
//         if (event.data === "closeWidget") {
//             document.getElementById("myiframe").style.display = "none";
//         }
//     });
    
//     // Dynamically inject CSS styles
//     var styles = `
//         #toggleButton {
//             background-color: green;
//             color: white;
//             border: round 1px solid;
//             padding: 10px 20px;
//             cursor: pointer;
//             /* Add any other styles you desire */
//         }
//     `;

//     var styleElement = document.createElement("style");
//     styleElement.textContent = styles;
//     document.head.appendChild(styleElement);
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Get reference to the script element
// var scriptElement = document.getElementById('paypik');

// // Get the values of data-access_key and data-host attributes
// var accessKey = scriptElement.getAttribute('data-access_key');
// var host = scriptElement.getAttribute('data-host');

// // Log the data
// console.log("Data to be sent to Angular project:", { accessKey, host });

// // Construct the URL with query parameters
// var url = 'https://anasanasri.github.io/autowidget/?accessKey=' + encodeURIComponent(accessKey) + '&host=' + encodeURIComponent(host);

// // Using fetch to send data to Angular project using GET request
// fetch(url)
//   .then(function(response) {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     console.log('Data sent successfully to Angular project');
//   })
//   .catch(function(error) {
//     console.error('Error sending data to Angular project:', error);
//   });
// });

