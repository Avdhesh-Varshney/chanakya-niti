import jwt from "jsonwebtoken";

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

export const formatDataToSend = (user) => {
    const access_token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_ACCESS_KEY, { expiresIn: '30d' });
    return {
        access_token,
        episode: user.episode
    }
}

export const formatAudioDataToSend = (URL) => {
    const parts = URL.split("/");
    const filename = parts[parts.length - 1];

    let splitFilename;
    if (filename.includes(" - ")) {
        splitFilename = filename.split(" - ");
    } else if (filename.includes("- ")) {
        splitFilename = filename.split("- ");
    }

    const title = splitFilename[0];
    const content = splitFilename[1].split(".")[0];
    return { title, content, filename };
}