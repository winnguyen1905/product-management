// SHOW ALERT
const showAlert = document.querySelector("[show-alert]");
    if(showAlert) {
        const cancel = showAlert.querySelector(".button-cancel");
        showAlert.classList.toggle('show');
        cancel.addEventListener("click", () => {
            showAlert.classList.add('show');
        });
        setTimeout(() => {
            showAlert.classList.add('show');
        }, showAlert.getAttribute("data-time"));
    }