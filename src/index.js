(function () {


    // String
    var urlImg = "assets/images";
    var lang = "fr";
    var browser = "mobile";
    var language = "";

    // ?
    var dateUpload = "?";

    // Number
    var maxFileSize = 10;
    var maxFileGallery = 20;
    var incrementPreviewImg = 0;

    // Booleans
    var nightMode = false;

    // Nodes
    var gallery = window.document.querySelector("#gallery");
    var upload = window.document.querySelector("#upload");
    var welcomeA = window.document.querySelector("#welcomeA");
    var colorList = window.document.querySelector("#colorList");
    var bottom = window.document.querySelector("#bottom");
    var navBar = window.document.querySelector("#navBarBoot");
    var file = window.document.querySelector("#file");
    var divPreview = window.document.querySelector("#divPreview");
    var imgPreview = window.document.createElement("img");
    var BottomTitle = window.document.createElement("h6");
    var welcomeAccueil = window.document.createElement("h1");
    var colorUl = window.document.createElement("ul");
    var extUl = window.document.createElement("ul");

    var userInfos = [];
    var acceptableExtensions = [];
    var menuItems = [];
    var images = [];

    /**
     * function to push multiple image into images 
     * (same name and URL with a different number at the end of both)
     * @param {Number} foo
     */
    // function pushImgAliceBorderland(foo) {
    //     images.push({
    //         name: "Alice in borderland Tome " + foo,
    //         url: "/assets/images/aliceInBorderland" + foo + ".jpg",
    //         taille: 22,
    //         extension: "jpg",
    //         color: ["#ff0000", "#00ff00", "#0000ff"],
    //     })
    // }

    /**
     * create Element and text
     * @param {String} tagName 
     * @param {String} text 
     * @param {String} target 
     */
    function textInElement(tagName, text, target) {
        if (!tagName || "string" !== typeof tagName) {
            throw new Error("a tag name is required or isn't a string");
        }
        var element = window.document.createElement(tagName);
        if ("undefined" !== typeof text) {
            element.appendChild(window.document.createTextNode(text));
        }
        if ("undefined" !== typeof target) {
            var target = document.querySelector(target);
            target.appendChild(element);
        }
        return element;
    }

    /**
     * Function to push one image into images
     * @param {String} name 
     * @param {String} url 
     * @param {Number} taille 
     * @param {String} extension 
     */
    function pushImage(name, url, taille, extension, imageColor) {
        images.push({
            name: name,
            url: url,
            taille: taille,
            extension: extension,
            color: imageColor,
        })
    }

    /**
     * Function to push item into menu
     * @param {String} name 
     * @param {String} url 
     */
    function pushMenuItem(name, url) {
        menuItems.push(
            {
                name: name,
                url: url
            }
        )
    }

    /**
     * Check if the extension of one image is acceptable,
     * return true or false.
     * @param {Object} image
     * @returns {Boolean}
     */
    function isExtensionValid(image) {
        for (var key in acceptableExtensions) {
            if (image.extension == acceptableExtensions[key]) {
                return true
            }
        }
        return false;
    }

    /**
     * Display image preview with color of the image
     * where x is the index of images[],
     * Event delete images with a button
     * @param {Number} foo 
     */
    function previewImgColor(foo) {
        colorUl.innerHTML = "";
        colorList.innerHTML = "";
        colorList.appendChild(colorUl);

        for (var key in images[foo].color) {
            var colorLi = window.document.createElement("li");
            colorLi.style = "background-color:" + images[foo].color[key].html_code;
            colorLi.setAttribute("class", "color-item");
            colorUl.appendChild(colorLi);
            colorLi.appendChild(
                window.document.createTextNode(
                    images[foo].color[key].html_code + " (Couleur la plus proche : " + images[foo].color[key].closest_palette_color + ")"
                )
            );
        }

        imgPreview.setAttribute("src", images[foo].url);
        imgPreview.setAttribute("alt", images[foo].name);
        imgPreview.style.maxWidth = "100%";
        imgPreview.style.maxHeight = "100%";
        divPreview.appendChild(imgPreview);

        createButton();
        onClickDelete(foo);
    }

    /**
     * Function to create a button delete
     */
    function createButton() {
        var btn = window.document.createElement("button");
        var text = window.document.createTextNode("Delete");
        btn.appendChild(text);
        colorList.appendChild(btn);
        btn.setAttribute("class", "btn-danger btn-delete");
    }

    /**
     * Assign Click event to the button delete which
     * will delete data of the current images
     * and all display information of this image.
     * @param {Number} foo 
     */
    function onClickDelete(foo) {
        var btn = document.querySelector(".btn-delete");
        btn.addEventListener("click", function () {
            resultat = window.confirm("Êtes-vous sûr");
            if (true === resultat) {
                console.log(images.length);
                var result = images.find(function (elem) {
                    return elem.url === images[foo].url;
                })
                var indexImg = images.indexOf(result);
                images.splice(indexImg, 1);
                console.log(images.length);
                colorList.innerHTML = "";
                divPreview.innerHTML = "";
                gallery.innerHTML = "";
                displayImg();
            }
        })
    }

    /**
    * Add <img> to gallery
    */
    function displayImg() {
        gallery.innerHTML = "";
        for (var key in images) {
            if (null === images[key].extension || isExtensionValid(images[key])) {
                var divImg = window.document.createElement("div");
                divImg.setAttribute("class", "col-6 col-md-3 col-xl-1 divImgGallery");
                var itemImg = window.document.createElement("img");
                itemImg.setAttribute("class", "img-fluid");
                itemImg.setAttribute("src", images[key].url);
                itemImg.setAttribute("alt", images[key].name);
                itemImg.setAttribute("style", "width: 100%");
                gallery.appendChild(divImg);
                divImg.appendChild(itemImg);
                var nomImg = window.document.createElement("p");
                nomImg.setAttribute("class", "bg-light text-center");
                divImg.appendChild(nomImg);
                nomImg.appendChild(window.document.createTextNode(images[key].name));
                registerEvent(itemImg, key);
            } else {
                console.log("Extension erreur");
            }
        }
    }

    /**
     * 
     * @param {HTMLElement} itemImg 
     * @param {Number} key 
     */
    function registerEvent(itemImg, key) {
        itemImg.addEventListener("click", function () {
            previewImgColor(key);
        })
    }


    /**
     * Add and display item to menu into bootstrap navbars
     */
    function displayMenuItems() {
        for (var key in menuItems) {
            var navBarA = window.document.createElement("a");
            var navBarLi = window.document.createElement("li");
            navBarLi.setAttribute("class", "nav-item");
            navBar.appendChild(navBarLi);
            navBarA.setAttribute("href", menuItems[key].url);
            navBarA.setAttribute("class", "nav-link");
            navBarLi.appendChild(navBarA);
            navBarA.appendChild(window.document.createTextNode(menuItems[key].name));
        }
    }

    /**
     * Display lenght of images
     */
    function imagesLength() {
        if (images.length) {
            console.log("il y a " + images.length + " images");
        } else {
            console.log("Votre galerie est vide");
        }
    }

    /**
     * Add extension to acceptableExtensions
     * @param {String} ext 
     */
    function pushAcceptableExtension(ext) {
        acceptableExtensions.push(ext);
    }

    /**
     * Check if images lenght < 20 then display button upload, else display gallery full 
     */
    function displayButton() {
        if (images.length < maxFileGallery) {
            var buttonUpload = window.document.createElement("button");
            buttonUpload.setAttribute("class", "btn btn-success");
            upload.appendChild(buttonUpload);
            buttonUpload.appendChild(window.document.createTextNode("Upload"));

            buttonUpload.addEventListener("click", function () {
                file.click();

            });
            onChangeFile(file.files[0]);
            displayForm();

        } else {
            var msgGalleryFull = window.document.createElement("p");
            upload.appendChild(msgGalleryFull);
            msgGalleryFull.append(window.document.createTextNode("Gallerie full"))
        }
    }

    function displayForm() {
        var formUpload = window.document.createElement("form");
        upload.appendChild(formUpload);
        formUpload.setAttribute("action", "");
        formUpload.setAttribute("id", "formUpload");
        formUpload.setAttribute("method", "GET");
        var inputUrl = window.document.createElement("input");
        var inputSubmit = window.document.createElement("input");
        formUpload.appendChild(inputUrl);
        formUpload.appendChild(inputSubmit);
        inputUrl.setAttribute("type", "url");
        inputUrl.setAttribute("required", "required");
        inputSubmit.setAttribute("type", "submit");
        inputSubmit.setAttribute("value", "envoyer");
        inputSubmit.setAttribute("class", "btn btn-primary")
        inputSubmit.onclick = function () {
            onSubmitForm(formUpload);
            return false;
        }

    }

    function onSubmitForm(formUploadElement) {
        // console.log(formUploadElement.elements[0].value)
        var xhr = new XMLHttpRequest();
        // Ouvrir une connexion
        xhr.open("GET", "https://api.imagga.com/v2/colors?image_url=" + formUploadElement.elements[0].value);
        // Enregistrer des event handlers
        xhr.onload = function (event) {
            var obj = JSON.parse(xhr.responseText);
            console.log(formUploadElement.elements[0].value);
            if (200 === xhr.status) {
                pushImage(
                    "toto",
                    formUploadElement.elements[0].value,
                    null,
                    null,
                    obj.result.colors.image_colors,
                );
                previewImgColor(incrementPreviewImg);
                colorUl.innerHTML = "";

                for (var key in obj.result.colors.image_colors) {
                    var colorLi = window.document.createElement("li");
                    colorLi.style = "background-color:" + obj.result.colors.image_colors[key].html_code;
                    colorLi.setAttribute("class", "color-item");
                    colorUl.appendChild(colorLi);
                    colorLi.appendChild(
                        window.document.createTextNode(
                            obj.result.colors.image_colors[key].html_code
                            + " (Couleur proche : "
                            + obj.result.colors.image_colors[key].closest_palette_color
                            + ")"
                        )
                    );
                }
                displayImg();
                incrementPreviewImg++;
            } else {
                alert("Format non pris en charge");
            }
        };
        // Customize header
        xhr.setRequestHeader(
            "authorization",
            "Basic YWNjX2Y0NTlkZGJiNmQ5ZTI2Mjo2MzMwMmVhMzk4ZDQxNzQ4YjI5OTFhMjAyMGZjN2Y3OA=="
        )
        xhr.send();
    }

    function onChangeFile(files) {
        file.addEventListener("change", function () {

            // Avoir le client
            var xhr = new XMLHttpRequest();
            // Ouvrir une connexion
            xhr.open("POST", "https://api.imagga.com/v2/colors");
            // Enregistrer des event handlers
            xhr.onload = function (event) {
                var obj = JSON.parse(xhr.responseText);
                var reader = new FileReader;
                reader.onload = function (event) {
                    var url = reader.result;
                    if (200 === xhr.status) {
                        pushImage(
                            "toto",
                            url,
                            null,
                            null,
                            obj.result.colors.image_colors,
                        );
                        previewImgColor(incrementPreviewImg);
                        colorUl.innerHTML = "";

                        for (var key in obj.result.colors.image_colors) {
                            var colorLi = window.document.createElement("li");
                            colorLi.style = "background-color:" + obj.result.colors.image_colors[key].html_code;
                            colorLi.setAttribute("class", "color-item");
                            colorUl.appendChild(colorLi);
                            colorLi.appendChild(
                                window.document.createTextNode(
                                    obj.result.colors.image_colors[key].html_code
                                    + " (Couleur proche : "
                                    + obj.result.colors.image_colors[key].closest_palette_color
                                    + ")"
                                )
                            );
                        }
                        displayImg();
                        incrementPreviewImg++;
                    } else {
                        alert("Format non pris en charge");
                    }

                }
                reader.onerror = function (event) {

                }
                reader.readAsDataURL(files);

            };
            // Customize header
            xhr.setRequestHeader("authorization", "Basic YWNjX2Y0NTlkZGJiNmQ5ZTI2Mjo2MzMwMmVhMzk4ZDQxNzQ4YjI5OTFhMjAyMGZjN2Y3OA==")
            var body = new FormData;
            body.append("image", files);
            // Envoyer la requete
            xhr.send(body);
        })
    }

    // call function to push acceptable extension
    pushAcceptableExtension("jpg");
    pushAcceptableExtension("png");
    pushAcceptableExtension("gif");

    // call function to push menu item
    pushMenuItem("accueil", "accueil.com");
    pushMenuItem("gallerie", "gallerie.com");
    pushMenuItem("mail", "mail.com");

    // call function to display a button or gallery full
    displayButton();

    // call function to add and display menu items into the navbar
    displayMenuItems();

    // call function to display lenght of images
    imagesLength();

    // call function to display image
    displayImg();

    // Check lang
    if ("fr" === lang) {
        language = "Bonjour";
    } else if ("de" === lang) {
        language = "Guttentag";
    } else {
        language = "Hello";
    }

    // Display title in FR or EN
    welcomeA.appendChild(welcomeAccueil);
    var myWel = window.document.createTextNode(language);
    welcomeAccueil.appendChild(myWel);

    // Display ul acceptable extensions
    bottom.appendChild(BottomTitle)
    var titleExtension = window.document.createTextNode("Extensions");
    BottomTitle.appendChild(titleExtension);
    bottom.appendChild(extUl);
    for (var key in acceptableExtensions) {
        var extensionLi = window.document.createElement("li");
        extUl.appendChild(extensionLi);
        extensionLi.appendChild(window.document.createTextNode(acceptableExtensions[key]));
    }
})
    ();