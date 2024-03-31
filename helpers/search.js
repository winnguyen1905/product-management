module.exports = (query) => {
    let objectSearch = {
        // keyword : ""
    };
    if(query.keyword) {
        const keyword = query.keyword;
        const regexp = new RegExp(keyword, "i");
        objectSearch.title = regexp;
    } else if (query.id_search) {
        objectSearch._id = query.id_search;
    }
    return objectSearch;
}
