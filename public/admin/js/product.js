//change status of product
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    buttonChangeStatus.forEach( button => {
        button.addEventListener("click",(e) => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            const statusChange = statusCurrent == "active" ? "inactive" : "active";
            // console.log(statusCurrent);
            // console.log(statusChange);
            const formChangeStatus = document.querySelector("#form-change-status");
            const path = formChangeStatus.getAttribute("data-path");
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit();
        });
    });
};









// delete product
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length) {
    buttonDelete.forEach( button => {
        const form_delete_item = document.querySelector("#form-delete-item");
        const path = form_delete_item.getAttribute("data-path");
        button.addEventListener("click",(e) => {

            const isComfirm = confirm("Are you sure that you want to change delete status ?");

            if(isComfirm) {

                const id = button.getAttribute("data-id"); //
                const deleteStatus = button.getAttribute("delete-status");
                const changeStatusDelete = deleteStatus === "true" ? "false" : "true";

                
                form_delete_item.action = path + `/${changeStatusDelete}/${id}?_method=DELETE`;
                form_delete_item.submit();
            };
        });
    })
}

//end delete


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