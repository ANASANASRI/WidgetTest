document.addEventListener("DOMContentLoaded", function() {
    
    // Create the button
    var button = document.createElement("button");
    button.id = "toggleButton";
    button.style.display = "inline-flex"; // Set display to inline-flex

    // Create the image element for the logo
    var logo = document.createElement("img");
    logo.src = "https://i.ibb.co/gFZGbV3/Logopng.png"; // Set the path to your logo image
    logo.alt = "PayPik Logo";
    logo.width = "20"; // Set the width of the logo (adjust as needed)
    logo.style.marginRight = "10px"; // Add margin between the image and button text

    // Append the logo to the button first
    button.appendChild(logo);

    // Set the button text
    button.appendChild(document.createTextNode("Payer avec PayPik"));

    // Append the button to the desired container
    var container = document.getElementById("content-behind-iframe");
    container.appendChild(button);
    
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
// Click event listener for the button
button.addEventListener("click", function() {

        // 
        var scriptElement = document.getElementById('paypik');

        // 
        var accessKey = scriptElement.getAttribute('data-access_key');
        var marchandId = scriptElement.getAttribute('data-marchand_id');
        var orderId = scriptElement.getAttribute('data-order_id');
        var orderDescription = scriptElement.getAttribute('data-order_description');
        var productsIds = scriptElement.getAttribute('data-products_ids');
        var amount = scriptElement.getAttribute('data-amount');
        var currency = scriptElement.getAttribute('data-currency');
        var hmac = scriptElement.getAttribute('data-hmac');
        var redirectUrl = scriptElement.getAttribute('data-redirect_url');
        
        //
        var currentURL = window.location.href;    
        console.log(currentURL);
        
        // Log HMAC value
        console.log("HMAC: " + hmac);

//////////////////////////////// Test host and access key and hmac

    var url = `http://localhost:8085/marchand/permission?hostname=${currentURL}&accessKey=${accessKey}&marchandId=${marchandId}&orderId=${orderId}&amount=${amount}&currency=${currency}&hmac=${hmac}`;

    // Fetch data from localhost
    fetch(url)
    .then(response => {
        if (!response.ok) {
        loadError();
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response Permission:', data);
        if (data === true && data.status !== 400) {
        loadWidget(accessKey, currentURL, marchandId, orderId, orderDescription, productsIds, amount, currency, hmac, redirectUrl);
        } else {
        loadError(); // Redirect to error page
        }
    })
    .catch(error => {
        console.error('Error fetching data from localhost:', error);
        loadError(); // Redirect to error page
    });

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

    function loadWidget(accessKey, currentURL, marchandId, orderId, orderDescription, productsIds, amount, currency, hmac, redirectUrl) {
        var iframe = document.getElementById("myiframe");
        if (!iframe) {
            iframe = document.createElement("iframe");
            iframe.id = "myiframe";
            iframe.src = `https://anasanasri.github.io/autowidget/?access_key=${accessKey}&host=${currentURL}&marchand_id=${marchandId}&order_id=${orderId}&order_description=${orderDescription}&products_ids=${productsIds}&amount=${amount}&currency=${currency}&hmac=${hmac}&redirect_url=${redirectUrl}`;
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
        background-color: #5BC084;
        color: white;
        border-radius: 10px;
        border: round 1px solid;
        padding: 10px 20px;
        cursor: pointer;
        user-select: none;
        /* Add any other styles you desire */
    }
    #toggleButton:hover {
        background-color: #3E8D5E;
    }
    `;

    var styleElement = document.createElement("style");
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);

});
