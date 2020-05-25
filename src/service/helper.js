export const getUrl = (url) => {
    if (url) {
        const pathArray = url.split("/");
        const protocol = pathArray[0];
        const host = pathArray[2];
        return protocol + "//" + host;
    }
    return "";
};
