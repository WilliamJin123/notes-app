import { useEffect, useState } from 'react'
import Note from './components/note'
import './App.css'
import Sidebar from './components/sidebar'
import {nanoid} from "nanoid"
import Split from "react-split"



export default function App() {

  const [notes, setNotes] = useState(
    () =>
    JSON.parse(localStorage.getItem("notes")) || [
    {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
  ]);
  const [current, setCurrent] = useState(

    () => JSON.parse(localStorage.getItem("current")) || (notes[0] && notes[0].id) || null
  );
  const [currentNote, setCurrentNote] = useState(
    () => notes[0] || null);

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prev => ([...prev, newNote]))
    setCurrent(newNote.id)
    setCurrentNote(newNote)
  }

  function changeNote(text) {
    setNotes(prev=> {
      const newArr = []
      for(let i = 0; i<prev.length; i++){
        if(prev[i].id === current){
          newArr.unshift({ ...prev[i], body: text})
        }else{
          newArr.push(prev[i])
        }
      }
      return newArr;
    })
  }

  function deleteNote(event, id){
    event.stopPropagation();
    setNotes(prev => prev.filter(note => note.id !== id))
  }


useEffect(() =>{
  function findCurrent(){
  return notes.find(note => {
    return note.id === current
  }) || notes[0]
}
  setCurrentNote(findCurrent());
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("current", JSON.stringify(current));
}, [notes, current])
  



  return (
    notes.length >  0 ?
    <Split
      className="split"
      sizes={[20, 80]}
      direction="horizontal"
      
    >
      <Sidebar 
        notes={notes}
        addNote = {createNote}
        current = {currentNote}
        setCurrent = {setCurrent}
        deleteNote = {deleteNote}
      />
      <Note 
        current = {currentNote}
        changeNote = {changeNote}
      />
    </Split>
    :
    <div className="no-notes">
      <h1>You have no notes</h1>
      <button
        className="first-note"
        onClick={createNote}
      >Create one now</button>
    </div>
  )
}

