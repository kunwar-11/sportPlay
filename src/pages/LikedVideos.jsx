import { Link } from "react-router-dom";
import { FooterBar, Sidebar } from "../components";
import PlaylistCard from "../components/PlaylistCard";
import { useData } from "../contexts/DataContext";

export const LikedVideos = () => {
  const {
    state: { likedVideos, status },
  } = useData();

  return (
    <div className="home">
      <Sidebar />
      {status === "loading" && <h1>Loading...</h1>}
      {likedVideos && status === "success" && (
        <>
          {likedVideos.length > 0 ? (
            <div className="videoList">
              {likedVideos.map((each, index) => (
                <PlaylistCard
                  each={each}
                  key={index}
                  type={"REMOVE_FROM_LIKED_VIDEOS"}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p>Not yet Liked any Video</p>
              <Link to="/">
                <button className="btn btn-secondary btn-primary">
                  Back To SportTube
                </button>
              </Link>
            </div>
          )}
        </>
      )}
      <FooterBar />
    </div>
  );
};
