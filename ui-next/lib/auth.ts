const getCurrentAuthUser = async () => {
    const allCookies = cookies().getAll();

    try {
        const authUser = await axios.get("/user", {
            withCredentials: true,
            headers: {
                Cookie: allCookies.reduce(
                    (acc, cookie) => `${acc}${cookie.name}=${cookie.value};`,
                    ""
                ),
            },
        });
        return authUser.data;
    } catch (error) {
        return null;
    }
};
