import { isInPlayList } from "../util";

export const dataReducerFunction = (state, action) => {
  switch (action.type) {
    case "LOAD_VIDEOS":
      return {
        ...state,
        videos: action.payload,
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
        unLikedVideos: isInPlayList(state.unLikedVideos, action.payload.playId)
          ? state.unLikedVideos.filter(
              (each) => each.playId !== action.payload.playId
            )
          : state.unLikedVideos,
      };
    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: state.likedVideos.filter(
          (each) => each.playId !== action.payload
        ),
      };
    case "ADD_TO_UNLIKED_VIDEOS":
      return {
        ...state,
        unLikedVideos: state.unLikedVideos.concat(action.payload),
        likedVideos: isInPlayList(state.likedVideos, action.payload.playId)
          ? state.likedVideos.filter(
              (each) => each.playId !== action.payload.playId
            )
          : state.likedVideos,
      };
    case "REMOVE_FROM_UNLIKED_VIDEOS":
      return {
        ...state,
        unLikedVideos: state.unLikedVideos.filter(
          (each) => each.playId !== action.payload
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
          (each) => each.playId !== action.payload.playId
        ),
      };
    case "CREATE_PLAYLIST":
      return { ...state, playlists: state.playlists.concat(action.payload) };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((each) =>
          each.id === action.payload.id
            ? { ...each, list: each.list.concat(action.payload.video) }
            : each
        ),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((each) =>
          each.id === action.payload.id
            ? {
                ...each,
                list: each.list.filter(
                  (data) => data.playId !== action.payload.playId
                ),
              }
            : each
        ),
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist.id !== action.payload
        ),
      };
    case "ADD_NOTE":
      return { ...state, notes: state.notes.concat(action.payload) };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.noteId !== action.payload),
      };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((each) => {
          return each.noteId === action.payload.id
            ? { ...each, note: action.payload.note }
            : each;
        }),
      };
    default:
      break;
  }
};
