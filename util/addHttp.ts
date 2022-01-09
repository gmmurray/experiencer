export const addhttp = (url: any) => {
    if (typeof url === 'string' && !/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'http://' + url;
    }
    return url;
};
