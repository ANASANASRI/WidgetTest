document.addEventListener("DOMContentLoaded", function() {
    // Create the button
    var button = document.createElement("button");
    button.textContent = "Payer avec aman pay";
    button.id = "toggleButton";

    // Append the button to the desired container
    var container = document.getElementById("content-behind-iframe");
    container.appendChild(button);

    // Add event listener to display the widget iframe
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

    // Add event listener to close button inside the iframe
    window.addEventListener("message", function(event) {
        if (event.data === "closeWidget") {
            document.getElementById("myiframe").style.display = "none";
        }
    });
});
