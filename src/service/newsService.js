import "isomorphic-fetch";

export const getNews = (page) => {
    try {
        return fetch(`https://hn.algolia.com/api/v1/search?page=${page}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data && data.hits) {
                    return {
                        ...data,
                        hits: updatePresistData(data.hits || []),
                    };
                }
                return {};
            });
    } catch (err) {
        throw err;
    }
};

export const updatePresistData = (data) => {
    if (typeof Storage === "undefined") {
        return data;
    }
    let presistDataElm = localStorage.getItem("presist_data_details");
    if (!presistDataElm) {
        return data;
    }
    presistDataElm = JSON.parse(presistDataElm);
    const newData = [];
    data.forEach((d) => {
        if (!presistDataElm[d.objectID]) {
            newData.push({
                ...d,
            });
        }
        if (presistDataElm[d.objectID] && presistDataElm[d.objectID].show) {
            newData.push({
                ...d,
                points: d.points + presistDataElm[d.objectID].upVoteCount,
            });
        }
    });
    return newData;
};

export const presistData = (id, type) => new Promise((resolve, reject) => {
    let presistData = {};
    const presistDataElm = localStorage.getItem("presist_data_details");
    if (presistDataElm) {
        presistData = JSON.parse(presistDataElm);
    }
    let upVoteCount = 0;
    let show = true;
    if (type === "hide") {
        show = false;
    } else {
        upVoteCount = 1;
    }

    if (presistData[id]) {
        presistData[id] = {
            upVoteCount: presistData[id].upVoteCount + upVoteCount,
            show: show,
        };
    } else {
        presistData[id] = {
            upVoteCount: upVoteCount,
            show: show,
        };
    }
    localStorage.setItem(
        "presist_data_details",
        JSON.stringify(presistData)
    );
    resolve(true)
}) 