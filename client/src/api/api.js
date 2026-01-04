export const apiRequest = async (url, method, body = null) => {
    const options = {
        method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    return response.json();
};
