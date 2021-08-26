import { Delete } from "@material-ui/icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeVideoFromPlaylist } from "../api_calls";
import { FooterBar, Sidebar } from "../components";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "../styles/user.css";
import { setupAuthHeaderForServiceCalls } from "../util";
export const User = () => {
  const {
    state: { name, token, userId },
    authDispatch,
  } = useAuth();
  const {
    state: { history },
    dispatch,
  } = useData();
  const navigate = useNavigate();
  return (
    <div className="home">
      <Sidebar />
      <div>
        {!history && <h1>Loading...</h1>}
        {history && (
          <h2
            style={{ textAlign: "center", padding: "1rem" }}
          >{`Welcome ! ${name}`}</h2>
        )}
        {history && history.length > 0 && (
          <>
            <h3 style={{ padding: "1rem" }}>Your History</h3>
            <div className="history">
              {history.map((each) => (
                <div key={each._id} style={{ margin: "0.2rem" }}>
                  <Link to={`/videos/${each._id}`}>
                    <img
                      src={each.thumbnail}
                      style={{ maxHeight: "15rem" }}
                      alt="img"
                    />
                  </Link>
                  <div
                    style={{
                      padding: "0.5rem 2rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>remove from your history</span>
                    <Delete
                      onClick={() =>
                        removeVideoFromPlaylist({
                          dispatch,
                          navigate,
                          token,
                          userId,
                          videoId: each._id,
                          type: "REMOVE_FROM_HISTORY",
                          genre: "history",
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {history && (
          <button
            className="btn btn-secondary-danger"
            onClick={() => {
              localStorage.removeItem("UserDetails");
              authDispatch({ type: "LOGOUT" });
              setupAuthHeaderForServiceCalls(null);
              navigate("/");
            }}
          >
            Logout
          </button>
        )}
      </div>
      <FooterBar />
    </div>
  );
};
