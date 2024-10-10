import { useEffect, useState } from 'react'
import Note from './components/note'
import './App.css'
import Sidebar from './components/sidebar'
import {nanoid} from "nanoid"
import Split from "react-split"



export default function App() {

  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
  ]);
  const [current, setCurrent] = useState(
    (notes[0] && notes[0].id) || ""
  );
  const [currentNote, setCurrentNote] = useState(notes[0]);

  function createNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes(prev => ([...prev, newNote]))
    setCurrent(newNote.id)
  }

  function changeNote(text) {
    setNotes(prev=> (
      prev.map(prevNote => ({
        ...prevNote,

        body: prevNote.id === current? text : prevNote.body
      }))
    ))
  }

useEffect(() =>{
  function findCurrent(){
  return notes.find(note => {
    return note.id === current
  }) || notes[0]
}
  setCurrentNote(findCurrent());

}, [notes, current])
  

  return (
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
      />
      <Note 
        current = {currentNote}
        changeNote = {changeNote}
      />
    </Split>
  )
}

