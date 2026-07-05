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
