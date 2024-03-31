let count = 0;
function treeParent(arr, parentId = "" ) {
    const tree = [];
    arr.forEach( item => {
        if (item.parent_id === parentId) {
            count++;
            const newItem = item;
            newItem.index = count;
            const children = treeParent(arr, item.id);
            if(children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports = (arr, currentPage = 0) => {
    count = (currentPage - 1)*6;
    const result = treeParent(arr);
    return result;
}