//-----------------------------------------------------------------CREATE PAGE-----------------------------------------------------------
// Upload image LINK or FILE
    const buttonOptionPostImage = document.querySelector("[button-toggle-option-image]");
    const isShowPreview = document.querySelector("div[preview-image-upload]");
    let imagePreview = isShowPreview ? isShowPreview.querySelector("img") : document.querySelector("div[preview-image-upload] img");;

    let imageText = document.querySelector("[input-image-text]");onChangeOfInputText();
    let imageUpload = document.querySelector("[input-image-upload]");


    if(buttonOptionPostImage) {
        buttonOptionPostImage.addEventListener("click", (e) => {

            // clear image src
            imagePreview.src = "";


            buttonOptionPostImage.classList.toggle("btn-info");
            const parentNode = buttonOptionPostImage.closest('div[class="form-control"]');
            const inputChange = parentNode.querySelector('div[input-change]');
            
            if(buttonOptionPostImage.innerHTML == "Upload Image File") {
                buttonOptionPostImage.innerHTML = "Populate Image Link";
                inputChange.innerHTML = '<input type="text" placeholder="Your Image Link" input-image-text class="form-control-file" id="thumbnail" name="thumbnail" style="padding: 7px; border-radius: 5px">';
                imageText = document.querySelector("[input-image-text]");
            } else {
                buttonOptionPostImage.innerHTML = "Upload Image File";
                inputChange.innerHTML = '<input type="file" input-image-upload class="form-control-file" style="padding: 4px; border-radius: 5px" id="thumbnail" name="thumbnail" accept="image/*">';
                imageUpload = document.querySelector("[input-image-upload]"); // because input file was be delete, therefore we need to get again input file
            }
            onChangeOfInputText();
            onChangeOfInputFile();
        });
    }
// END UPLOAD


// PREVIEW IMAGE UPLOAD

        function onChangeOfInputFile() { // input file onChange reader and preview
            if(imageUpload) {
                imageUpload.addEventListener("change", (e) => {
                    const [file] = e.target.files;
                    if(file) {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (e) => {
                            imagePreview.src =  e.target.result;
                        }
                        // OR imagePreview.src = URL.createObjectURL(file);
                    }
                })
            }
        }
        function onChangeOfInputText() {
            if(imageText) {
                imageText.addEventListener("input", (e) => {
                    imagePreview.src = imageText.value;
                })
            }
        }


//-----------------------------------------------------------------EDIT PAGE-----------------------------------------------------------