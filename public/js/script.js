
// Button status
const buttonStatus = document.querySelectorAll("[button-status");
console.log(buttonStatus);
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    console.log(url);

    buttonStatus.forEach((button) => {
        button.addEventListener("click", (event) => {

            const status = button.getAttribute("button-status");
            console.log(status);
            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
};

// Form search
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (event) => {
        let url = new URL(window.location.href);
        const keyword = event.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
            window.location.href = url.href;
        } else url.searchParams.delete("keyword");
        event.preventDefault();
        // console.log();
    })
}