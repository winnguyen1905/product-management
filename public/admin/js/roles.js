//Permission
const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit-permissions]");
    buttonSubmit.addEventListener("click", (e) => {
        let permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach((tr) => {
            const name = tr.getAttribute("data-name");
            const inputs = tr.querySelectorAll("input");
            if(name == "id") {
                inputs.forEach((input) => {
                    permissions.push({
                        id: input.value,
                        permissions: []
                    });
                });
            } else { 
                inputs.forEach((input, index) => {
                    if(input.checked) {
                        permissions[index].permissions.push(name);
                    }
                });
            }
        });
        sendChangePermission(permissions);
    });
}


    // SEND CHANGE PERMISSIONS
    function sendChangePermission(arrPermissions) {
        const form_change_permissions = document.querySelector("#form-change-permissions");
        if(form_change_permissions) {
            const input = form_change_permissions.querySelector("input");
            const string  = JSON.stringify(arrPermissions);
            console.log(string);
            input.value = string;
            form_change_permissions.submit();
        }
    }
//End Permission

// Permissions Default
const dataDefault = document.querySelector("[permissions-data]");
if(dataDefault) {
    const data  =  JSON.parse(dataDefault.value);
    const rows = tablePermissions.querySelectorAll("[data-name]")
    rows.forEach((row) => {
        const inputs = row.querySelectorAll("input[type=checkbox]");
        const name = row.getAttribute("data-name");
        inputs.forEach((input, index) => {
            if(data[index].permissions.indexOf(name) != -1) {
                input.checked = true;
            }
        });
    });
}
// END permissions default