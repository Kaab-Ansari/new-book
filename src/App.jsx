import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
// import reactLogo from './assets/react.svg'
import "./App.css";
import Modal from "./Modal";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [mainNote, setMainNotes] = useState({
    book: "",
    author: "",
    date: "",
    note: "",
  });
  const [content, setContent] = useState([]);
  console.log(content);

  const handleOpen = () => setOpen(true);
  function handleClose() {
    setEdit(false);
    setOpen(false);
    setMainNotes({
      book: "",
      author: "",
      date: "",
      note: "",
    });
  }

  function handleChange(e) {
    const handleName = e.target.name;
    const handleValue = e.target.value;
    setMainNotes((preValue) => ({ ...preValue, [handleName]: handleValue }));
  }

  function handleAdd() {
    const mainNoteWithId = { ...mainNote, id: nanoid() };
    setContent([...content, mainNoteWithId]);
    setMainNotes({
      book: "",
      author: "",
      date: "",
      note: "",
    });
    setOpen(false);
    fetch(
      "https://crudoperation-9385d-default-rtdb.firebaseio.com/books.json",
      {
        method: "PUT",
        body: JSON.stringify([...content, mainNoteWithId]),
      }
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
      console.log("run add btn")

  }

  useEffect(() => {
    fetch("https://crudoperation-9385d-default-rtdb.firebaseio.com/books.json")
      .then((res) => res.json())
      .then((json) => (json ? setContent(json) : setContent([])));
  }, []);

  function handleDelete(id) {
    setContent((prevCard) => prevCard.filter((card) => card.id !== id));

    fetch(
      "https://crudoperation-9385d-default-rtdb.firebaseio.com/books.json",
      {
        method: "PUT",
        body: JSON.stringify(content.filter((card) => card.id !== id)),
      }
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  }

  function handleEdit(id) {
    const doubt = content.find((p) => p.id === id);
    setMainNotes(doubt);
    setOpen(true);
    setEdit(true);
  }

  function editedNote(e, id) {
    setContent((prevNote) =>
      prevNote.map((p) => (p.id === id ? { ...mainNote } : { ...p }))
    );
    setOpen(false);
    setEdit(false);
    setMainNotes({
      book: "",
      author: "",
      date: "",
      note: "",
    });
    fetch(
      "https://crudoperation-9385d-default-rtdb.firebaseio.com/books.json",
      {
        method: "PUT",
        body: JSON.stringify(
          content.map((p) => (p.id === id ? { ...mainNote } : { ...p }))
        ),
      }
    );
  }

  return (
    <div>
      {open ? (
        <Modal
          edit={edit}
          handleClose={handleClose}
          handleChange={handleChange}
          handleAdd={handleAdd}
          mainNote={mainNote}
          editedNote={editedNote}
        />
      ) : (
        <div className="main">
          <div className="content">
            <h2 style={{ color: "#b30000" }}>My Books</h2>
            {/* <button onClick={() => setModal(true)} className='input-div'>Add New Book</button> */}
            <Button
              sx={{
                textAlign: "start",
                width: "95%",
                borderRadius: "9px",
                height: "40px",
                backgroundColor: "#b30000",
                color: "white",
                fontFamily: "Times New Roman Times, serif",
                border: "none",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              Add New Book
            </Button>

            {/* <button className="add-button">+</button> */}
            <h2 style={{ color: "#b30000" }}>Read / Want to read</h2>
            {content.length > 0 &&
              content.map((bookData) => {
                return (
                  <Card
                    sx={{
                      marginBottom: "9px",
                      backgroundColor: "pink",
                      width: "100%",
                    }}
                  >
                    <CardContent
                      sx={{
                        textAlign: "justify",
                        fontFamily: "Times New Roman Times, serif",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {bookData.book}
                      </Typography>
                      <Typography variant="h5" component="div">
                        {bookData.author}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 12 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {bookData.date}
                      </Typography>
                      <Typography variant="body2">{bookData.note}</Typography>
                    </CardContent>
                    <CardActions
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <button
                        className="fa fa-trash"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => handleDelete(bookData.id)}
                      ></button>
                      <button
                        onClick={() => handleEdit(bookData.id)}
                        className="fa fa-edit"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      ></button>
                    </CardActions>
                  </Card>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
