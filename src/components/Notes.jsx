import { Delete, Edit } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import "../styles/notes.css";
import { API_URL, navigateToLogin } from "../util";
import { toast } from "react-toastify";
const Note = ({ note, setText, setIsEdit, setEditId }) => {
  const { dispatch } = useData();
  const {
    state: { userId },
  } = useAuth();
  const deleteNote = async () => {
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const { data } = await axios.delete(
        `${API_URL}/notes/${userId}/${note._id}`
      );
      if (data.success) {
        dispatch({ type: "DELETE_NOTE", payload: data.note._id });
        dispatch({ type: "STATUS", payload: "success" });
        toast.warning(`Note Removed`, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "success" });
    }
  };
  return (
    <div className="eachNote">
      <div style={{ width: "inherit" }}>
        <p>{note.text}</p>
      </div>
      <div className="notes_icon">
        <Edit
          onClick={() => {
            setIsEdit(true);
            setText(note.text);
            setEditId(note._id);
          }}
        />
        <Delete onClick={deleteNote} />
      </div>
    </div>
  );
};
export const Notes = ({ videoId }) => {
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const {
    state: { notes },
    dispatch,
  } = useData();
  const {
    state: { userId, token },
  } = useAuth();
  const navigate = useNavigate();
  const noteAdditionHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { note },
        status,
      } = await axios.post(`${API_URL}/notes/${userId}`, {
        videoId,
        text,
      });
      if (status === 201) {
        dispatch({
          type: "ADD_NOTE",
          payload: note,
        });
        setText("");
        dispatch({ type: "STATUS", payload: "success" });
        toast.success(`Note added`, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "STATUS", payload: "error" });
    }
  };
  const editNoteHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "STATUS", payload: "loading" });
      const {
        data: { note, success },
      } = await axios.post(`${API_URL}/notes/${userId}/${editId}`, {
        text,
      });
      if (success) {
        dispatch({ type: "EDIT_NOTE", payload: { id: editId, note } });
        setIsEdit(false);
        setText("");
        setEditId(null);
        dispatch({ type: "STATUS", payload: "success" });
        toast.success(`Note Updated`, {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      dispatch({ type: "STATUS", payload: "error" });
    }
  };

  return (
    <div className="notes">
      <form
        onSubmit={
          token
            ? isEdit
              ? editNoteHandler
              : noteAdditionHandler
            : () => navigateToLogin(navigate)
        }
      >
        <div className="notesForm">
          <input
            type="text"
            className="inputText"
            placeholder="enter your note"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </div>
      </form>
      <div className="notes">
        {notes && notes.length > 0 ? (
          notes.map((note) => {
            return (
              note.videoId === videoId && (
                <Note
                  note={note}
                  key={note._id}
                  setText={setText}
                  setIsEdit={setIsEdit}
                  setEditId={setEditId}
                />
              )
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
