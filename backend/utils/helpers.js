export const parseEpisodeFile = (downloadUrl) => {
    const parts = downloadUrl.split("/");
    const filename = decodeURIComponent(parts[parts.length - 1]);

    const separator = filename.includes(" - ") ? " - " : "- ";
    const [label, rest] = filename.split(separator);

    const id = parseInt(label.replace(/\D/g, ""), 10);
    const title = rest ? rest.split(".")[0] : undefined;

    return { id, title, url: downloadUrl };
}
