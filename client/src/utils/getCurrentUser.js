export const getCurrentUser = () => {
    const fiverUser = JSON.parse(localStorage.getItem("fiverUser"));
    return fiverUser;
}