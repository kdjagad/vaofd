

export const getFormObject = (formData) => {
    var object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    return object;
}

export const getCurrentUser = () => {
    var user = localStorage.getItem("user") || null;
    user = user ? JSON.parse(user) : {};
    return user;
}