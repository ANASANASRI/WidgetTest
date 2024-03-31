/*jslint browser:true*/
/*jslint es5: true */
/*global $, jQuery*/

var AmnPy = {

    // Constants
    SCRIPT_ID: "amanpay-js",

    // Attributes
    dataMap: {},
    form: null,

    // Init
    init: function (dataMap) {
        "use strict";

        // CONSTANTS
        var ENABLE_CSRF = false;
        var WIDGET_URL = "https://app-demo.amanpay.net:8443/widget/";
        var ORIGIN_URL = "https://app-demo.amanpay.net:8443";

        // VARS
        var i,
            key,
            thisElement,
            frameId,
            dataPrefix,
            attrs,
            hiddenField,
            frame,
            btn,
            btnimg,
            btnImgSrc,
            myContainer;

        thisElement = document.getElementById(AmnPy.SCRIPT_ID);
        frameId = AmnPy.SCRIPT_ID + "-frame";

                                                                              
        // DATAMAP
        // If datamap not defined on the init, read from the script tag
        if (!dataMap) {
            dataPrefix = "data-";
            attrs = thisElement.attributes;
            // Extract "data-" attributes and values to send to the server
            for (i = 0; i < attrs.length; i += 1) {
                if (attrs[i].name.indexOf(dataPrefix) === 0) {
                    AmnPy.dataMap[attrs[i].name.replace(dataPrefix, "")] = attrs[i].value;
                }
            }
        } else {
            AmnPy.dataMap = dataMap;
        }
                                                                              
                                                                              
        // MESSAGING HANDLER
        // Support messaging from the frame (close/redirect)
        var receiveAmnPyMessage = function (event) {
            var jsonData;

            // -------- IMPORTANT -------------
            if (event.origin !== ORIGIN_URL) {
                return;
            } // ------------------------------

            jsonData = JSON.parse(event.data);
           
            if (jsonData.action === "closeAmanPayModal") {
                AmnPy.closeModal({reason:'close', data:jsonData});
            }
            if (jsonData.action === "closeAmanPayModalAndRefresh") {
                AmnPy.closeModal({reason:'closeRefresh', data:jsonData});
                window.location.reload(true);
            }
            if (jsonData.action === "closeAmanPayModalAndRedirect") {
                AmnPy.closeModal({reason:'closeRedirect', data:jsonData});
                window.location.replace(jsonData.path);
            }
            if (jsonData.action === "ChangeAmanPayModalCSS") {
                // changement de background au cas de redirection 3DS
                //document.getElementById(frameId).style.backgroundColor = "rgba(0,0,0,0.5)";
                document.getElementById(frameId).style.backgroundColor = "rgb(255, 255, 255)";
            }
            if (jsonData.action === "ChangeAmanPayModalCSSRet") {
                // changement de background au cas de redirection 3DS
                document.getElementById(frameId).style.backgroundColor = "rgba(0, 0, 0, 0.498039)"; 
            } 
        };
                                                                              
        // Attach the messaging handler to the current window
        if (window.addEventListener) {
            window.addEventListener('message', receiveAmnPyMessage, false);
        } else {
            window.attachEvent('onmessage', receiveAmnPyMessage); // IE8
        }
                                                                                         

        // FORM ELEMENT
        // On the fly add the form to submit to the frame
        AmnPy.form = document.createElement("form");
        AmnPy.form.setAttribute("method", "post");
        AmnPy.form.setAttribute("action", WIDGET_URL);
        AmnPy.form.setAttribute("target", frameId);
        // Add "data-"" elements
        for (var key in AmnPy.dataMap) {
            if (AmnPy.dataMap.hasOwnProperty(key)) {
                hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", AmnPy.dataMap[key]);
                AmnPy.form.appendChild(hiddenField);
            }
        }
        // CSRF
        if (ENABLE_CSRF) {
            hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", "csrf_token");
            hiddenField.setAttribute("value", "1711912069.71##7f3246b7a978909965bcb89f00ba6cf67011ac51");
            AmnPy.form.appendChild(hiddenField);
        }
        // Add the window url
        hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "location");
        hiddenField.setAttribute("value", document.location.toString());
        AmnPy.form.appendChild(hiddenField);
        document.body.appendChild(AmnPy.form);


        // IFRAME ELEMENT
        // iFrame on which the widget will be loaded
        frame = document.createElement("iframe");
        frame.setAttribute("id", frameId);
        frame.setAttribute("name", frameId);
        frame.setAttribute("frameborder", "0");
        frame.setAttribute("allowtransparency", "true");
        //frame.setAttribute("style", "display:none; z-index: 99999; background-color: rgba(0,0,0,0.5); border: 0px none transparent; overflow-x: hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; min-width: 100%; min-height: 100%;");
        
        // Detect if IOS Mobile phone and add specific class css 
        // device detection
        if (AmnPy.isIosMobil())
        {                        
            // CONTAINER ELEMENT
            // Contain ifra element
            myContainer = document.createElement("div");
            myContainer.setAttribute('id','scroll-container'); 
            myContainer.setAttribute('style','background-color: rgba(0, 0, 0, 0.5);overflow: auto;-webkit-overflow-scrolling: touch;position: fixed;left: 0;right: 0;top: 0;bottom: 0;width: 100%;height: 100%;z-index: 9999;min-width: 100%;min-height: 100%;display: none;');
            frame.setAttribute("style", "overflow: scroll !important;-webkit-overflow-scrolling: touch!important;display: none; z-index: 99999;border: 0px none transparent; overflow: hidden auto; visibility: visible; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; min-width: 100%; min-height: 100%;");                         
            myContainer.appendChild(frame);
            document.body.appendChild(myContainer);
        }else{
            frame.setAttribute("style", "display:none; z-index: 99999; background-color: rgba(0,0,0,0.5); border: 0px none transparent; overflow-x: hidden; overflow-y: auto; visibility: visible; margin: 0px; padding: 0px; -webkit-tap-highlight-color: transparent; position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; min-width: 100%; min-height: 100%;");           
            document.body.appendChild(frame);
        } 

        // BUTTON ELEMENT (1/2)
        // When data-module="button", display the button launcher
        // Display LOADER first, and then the real button when form submit                                                                       
        if (AmnPy.dataMap.mode && AmnPy.dataMap.mode === 'button') {
            // Button link
            btn = document.createElement("a");
            btn.setAttribute("href", "#");
            btn.setAttribute("id","btn-amanpay")
            //btn.setAttribute("target", "_blank");
            btn.onclick = function () { AmnPy.loadModal(); return false; };
            // Button image
            btnimg = document.createElement("img");
            btnImgSrc = "https://app-demo.amanpay.net:8443/static/img/loader.gif";
            btnimg.setAttribute("src", btnImgSrc);
            btn.appendChild(btnimg);
            thisElement.parentNode.insertBefore(btn, thisElement);
        }
                                                                              
        // FORM SUBMIT
        // Submit the form and preload the paiement page
        AmnPy.form.submit();
            
        // BUTTON ELEMENT (2/2)
        // When data-module="button", display the button launcher
        // Display the button once the widget is loaded                                                            
        if (AmnPy.dataMap.mode && AmnPy.dataMap.mode === 'button') {
            btnImgSrc = "https://app-demo.amanpay.net:8443/static/img/button.png";
            btnimg.setAttribute("src", btnImgSrc);
        }
                                                                              
        // ---- IMPORTANT : KEEP THAT PART ALWAYS  ----                                                                  
        // CALLBACKS : ON LOAD
        // When data-onload_callback is set, call it after the form submit is done (widget loaded)
        if (AmnPy.dataMap.onload_callback && typeof window[AmnPy.dataMap.onload_callback] === "function") {
            window[AmnPy.dataMap.onload_callback]();
        }
        // --------                                                                                                                                      
    },
    isIosMobil:function(){
        isIosPhone = false; 
        if(/iPhone|Android/.test(navigator.userAgent)){
            isIosPhone= true;
        }else{
            isIosPhone = false;
        }
        return isIosPhone;
    },
    loadModal: function () {
        "use strict";
        var getDocument = document;
        if(AmnPy.isIosMobil()) {
            getDocument.getElementById("scroll-container").style.display = "block";
            getDocument.body.setAttribute('style','overflow:hidden;position:fixed;');
            getDocument.body.classList.add('widgetOpen'); 
        }
        document.getElementById(AmnPy.SCRIPT_ID + "-frame").style.display = "block";
        // CALLBACK : ON OPEN
        // When data-onclose_callback is set, call it after the init is done
        if (AmnPy.dataMap.onopen_callback && typeof window[AmnPy.dataMap.onopen_callback] === "function") {
            window[AmnPy.dataMap.onopen_callback]();
        }
    },      
    openModal: function () {
        "use strict";
        AmnPy.loadModal();
    },    
    closeModal: function (data) {
        "use strict";
        var getDocument = document;
        if(AmnPy.isIosMobil()){
            getDocument.getElementById("scroll-container").style.display = "none";
            getDocument.body.setAttribute('style','');
            getDocument.body.classList.remove('widgetOpen');
        }
        document.getElementById(AmnPy.SCRIPT_ID + "-frame").style.display = "none";
        // CALLBACK : ON CLOSE
        // When data-onclose_callback is set, call it after the init is done
        if (AmnPy.dataMap.onclose_callback && typeof window[AmnPy.dataMap.onclose_callback] === "function") {
            window[AmnPy.dataMap.onclose_callback](data);
        }
    }
};

AmnPy.init();