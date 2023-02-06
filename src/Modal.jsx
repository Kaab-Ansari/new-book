import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./App.css";

export default function BasicModal(props) {
  const { mainNote } = props;
  const { book, author, date, note, id } = mainNote;
  // console.log(props.mainNote);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-main">
          <div
            style={{
              border: "1px solid #ac3939",
              backgroundColor: "#ac3939",
              padding: "5px",
            }}
          >
            <h3 style={{ color: "white" }}>Add New Book</h3>
          </div>
          <div className="modal-content">
            <div>
              <h4 style={{ color: "#b30000" }}>Book Title</h4>
              <input
                name="book"
                onChange={props.handleChange}
                className="input-color"
                type="text"
                value={book}
              />
            </div>
            <div>
              <h4 style={{ color: "#b30000" }}>Author</h4>
              <input
                name="author"
                onChange={props.handleChange}
                className="input-color"
                type="text"
                value={author}
              />
            </div>
            <div>
              <h4 style={{ color: "#b30000" }}>Date Added</h4>
              <input
                name="date"
                onChange={props.handleChange}
                className="input-color"
                type="date"
                value={date}
              />
            </div>
            <div>
              <h4 style={{ color: "#b30000" }}>Notes</h4>
              <textarea
                onChange={props.handleChange}
                name="note"
                style={{
                  backgroundColor: "#ffeecc",
                  width: "100%",
                  height: "60px",
                  fontFamily: "Times New Roman Times, serif"
                }}
                rows="6"
                cols="55"
                value={note}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              border: "1px solid #ac3939",
              height: "60px",
              backgroundColor: "#ac3939",
              padding: "5px",
            }}
          >
            <div className="modal-btns">
              <button className="cancel-btn" onClick={props.handleClose}>
                Cancel
              </button>
              {props.edit ? 
              <button className="add-btn" onClick={(e) => props.editedNote(e,id)}>
                Update 
              </button>
              :
              <button className="add-btn" onClick={props.handleAdd}>
                Add
              </button>
               }
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
