
import './App.css';
import React, { useState, useEffect } from "react"
import Header from "./comp/Header"
import NoteCard from './comp/NoteCard';
import firebase from "./util/firebase.js";

function App() {


  const [formTitle, setFormTitle] = useState("");

  const [formText, setFormText] = useState("")




  //

  const [allNotes, setAllNotes] = useState()


  useEffect(() => {

    const NotesRef = firebase.database().ref("Notes");

    NotesRef.on("value", (snapshot) => {


      const allOrders = snapshot.val();
      console.log(allOrders);

      const allNotes = []

      for (let i in allOrders) {
        allNotes.push({ i, ...allOrders[i] });


      }


      setAllNotes(allNotes)









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



  }


  return (
    <div className="App">
      <Header addANoteFunc={addANoteFunc} formTitle={formTitle} setFormTitle={setFormTitle} formText={formText} setFormText={setFormText} />

      <NoteCard allNotes={allNotes} formTitle={formTitle} />
    </div>
  );
}

export default App;
