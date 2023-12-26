module.exports = (query) => {
    let objectSearch = {
        // keyword : ""
    };
    if(query.keyword) {
        const keyword = query.keyword;
        const regexp = new RegExp(keyword, "i");
        objectSearch.title = regexp;
    }
    return objectSearch;
}