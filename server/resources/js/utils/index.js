export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const getAllQueryParams = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const query = {};
    for (let param of params) {
        query[param[0]] = param[1];
    }
    return query;
};

export const getQueryParam = (key) => {
    return getAllQueryParams()[key];
};

export const getMediaUrl = (filepath) => {
    return `${window.location.origin}/storage/${filepath}`;
};

export const formatThousand = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
};

export const withCurrency = (value) => {
    return `Rp ${value}`;
};

export const openMediaLibraryModal = (id = null) => {
    document?.getElementById(id || "media-library-opener")?.click()
}