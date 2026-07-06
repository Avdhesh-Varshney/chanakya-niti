export const parseEpisodeFile = (downloadUrl) => {
  const parts = downloadUrl.split('/');
  const filename = decodeURIComponent(parts[parts.length - 1]);

  // Filenames aren't consistently formatted in the source repo, e.g.:
  //   "Ep 01 - Title.mp3"   (space-hyphen-space)
  //   "Ep 806- Title.mp3"   (hyphen, no leading space)
  //   "Ep 240-Title.mp3"    (hyphen, no spaces at all)
  //   "Ep 430 Title.mp3"    (no hyphen at all)
  const match = filename.match(/^Ep\s*(\d+)\s*-?\s*(.+)\.\w+$/i);

  if (!match) {
    return { id: NaN, title: undefined, url: downloadUrl };
  }

  const id = parseInt(match[1], 10);
  const title = match[2].trim();

  return { id, title, url: downloadUrl };
};
