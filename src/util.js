export const isInPlayList = (playlist, playId) => {
  if (playlist.some((each) => each.playId === playId)) {
    return true;
  }
  return false;
};

export const findVideo = (videoId, videos) => {
  return videos.find((each) => each.playId === videoId);
};
