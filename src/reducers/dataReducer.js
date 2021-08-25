import { isInPlayList } from "../util";

export const dataReducerFunction = (state, action) => {
  switch (action.type) {
    case "LOAD_VIDEOS":
      return {
        ...state,
        videos: action.payload,
      };
    case "LOAD_WATCHLATER":
      return {
        ...state,
        watchLater: action.payload,
      };
    case "LOAD_LIKEDVIDEOS":
      return {
        ...state,
        likedVideos: action.payload,
      };
    case "LOAD_HISTORY":
      return {
        ...state,
        history: action.payload,
      };
    case "LOAD_UNLIKEDVIDEOS":
      return {
        ...state,
        unLikedVideos: action.payload,
      };
    case "LOAD_PLAYLIST":
      return {
        ...state,
        playlists: action.payload,
      };
    case "LOAD_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "INCREASE_VIEWS":
      return {
        ...state,
        videos: state.videos.map((video) =>
          video._id === action.payload
            ? { ...video, views: video.views + 1 }
            : video
        ),
      };
    case "STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "ADD_TO_HISTORY":
      return { ...state, history: [...state.history, action.payload] };
    case "REMOVE_FROM_HISTORY":
      break;
    case "ADD_TO_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.concat(action.payload),
        unLikedVideos: isInPlayList(state.unLikedVideos, action.payload._id)
          ? state.unLikedVideos.filter(
              (each) => each._id !== action.payload._id
            )
          : state.unLikedVideos,
      };
    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (each) => each._id !== action.payload
        ),
      };
    case "ADD_TO_UNLIKED_VIDEOS":
      return {
        ...state,
        unLikedVideos: state.unLikedVideos.concat(action.payload),
        likedVideos: isInPlayList(state.likedVideos, action.payload._id)
          ? state.likedVideos.filter((each) => each._id !== action.payload._id)
          : state.likedVideos,
      };
    case "REMOVE_FROM_UNLIKED_VIDEOS":
      return {
        ...state,
        unLikedVideos: state.unLikedVideos.filter(
          (each) => each._id !== action.payload
        ),
      };
    case "ADD_TO_WATCHLATER":
      return {
        ...state,
        watchLater: state.watchLater.concat(action.payload),
      };
    case "REMOVE_FROM_WATCHLATER":
      return {
        ...state,
        watchLater: state.watchLater.filter(
          (each) => each._id !== action.payload
        ),
      };
    case "CREATE_PLAYLIST":
      return { ...state, playlists: state.playlists.concat(action.payload) };
    case "CURRENT_PLAYLIST":
      return { ...state, currentPlaylist: action.payload };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((each) =>
          each._id === action.payload.playlistId
            ? { ...each, videos: each.videos.concat(action.payload.video) }
            : each
        ),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((each) =>
          each._id === action.payload.playlistId
            ? {
                ...each,
                videos: each.videos.filter(
                  (data) => data._id !== action.payload.videoId
                ),
              }
            : each
        ),
        currentPlaylist: {
          ...state.currentPlaylist,
          videos: state.currentPlaylist.videos.filter(
            (each) => each._id !== action.payload.videoId
          ),
        },
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        ),
      };
    case "ADD_NOTE":
      return { ...state, notes: state.notes.concat(action.payload) };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((each) => {
          return each._id === action.payload.id
            ? { ...each, text: action.payload.note.text }
            : each;
        }),
      };
    case "PLAYLIST_DETAILS_CLEANUP":
      return {
        ...state,
        currentPlaylist: null,
      };
    default:
      break;
  }
};
