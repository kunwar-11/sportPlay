import { Delete, Edit } from "@material-ui/icons";
import React, { useState } from "react";
import { useData } from "../contexts/DataContext";
import "../styles/notes.css";

const Note = ({ note, setNote, setIsEdit, setEdit }) => {
  const { dispatch } = useData();
  return (
    <div className="eachNote">
      <div style={{ width: "inherit" }}>
        <p>{note.note}</p>
      </div>
      <div className="notes_icon">
        <Edit
          onClick={() => {
            setIsEdit(true);
            setNote(note.note);
            setEdit(note.noteId);
          }}
        />
        <Delete
          onClick={() =>
            dispatch({ type: "DELETE_NOTE", payload: note.noteId })
          }
        />
      </div>
    </div>
  );
};
let noteId = 1234;
export const Notes = ({ videoId }) => {
  const [note, setNote] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const {
    state: { notes },
    dispatch,
  } = useData();
  const noteAdditionHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTE",
      payload: { noteId: ++noteId, id: videoId, note: note },
    });
    setNote("");
  };
  const editNoteHandler = (e) => {
    e.preventDefault();
    dispatch({ type: "EDIT_NOTE", payload: { id: edit, note: note } });
    setIsEdit(false);
    setNote("");
    setEdit(null);
  };
  return (
    <div className="notes">
      <form onSubmit={isEdit ? editNoteHandler : noteAdditionHandler}>
        <div className="notesForm">
          <input
            type="text"
            className="inputText"
            placeholder="enter your note"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
          <button type="submit" className="btn btn-primary">
            ADD
          </button>
        </div>
      </form>
      <div className="notes">
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              note.id === videoId && (
                <Note
                  note={note}
                  key={note.noteId}
                  setNote={setNote}
                  setIsEdit={setIsEdit}
                  setEdit={setEdit}
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
