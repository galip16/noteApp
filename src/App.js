
import './App.css';
import React, { useState, useEffect } from "react"
import Header from "./comp/Header"
import NoteCard from './comp/NoteCard';
import { firebase } from "./util/firebase.js";

function App() {


  const [formTitle, setFormTitle] = useState("");

  const [formText, setFormText] = useState("")




  //

  const [allNotes, setAllNotes] = useState(null)


  useEffect(() => {

    const NotesRef = firebase.database().ref("Notes");

    NotesRef.on("value", (snapshot) => {

      const allOrders = snapshot.val();

      const allNotes = []

      for (let id in allOrders) {
        allNotes.push({ id, ...allOrders[id] });
      }

      setAllNotes(allNotes.sort(function (a, b) { return b.isComplete - a.isComplete }).reverse())

    })

  }, [])



  function addANoteFunc(e) {

    e.preventDefault();

    const notRef = firebase.database().ref("Notes");

    const orderInfo = {
      formTitle,
      formText,
      isComplete: false
    };

    notRef.push(orderInfo);

    setFormTitle("");
    setFormText("")



  }


  return (
    <div className="App">
      <Header addANoteFunc={addANoteFunc} formTitle={formTitle} setFormTitle={setFormTitle} formText={formText} setFormText={setFormText} />

      <NoteCard allNotes={allNotes} formTitle={formTitle} />
    </div>
  );
}

export default App;
