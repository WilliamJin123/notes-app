import { useEffect, useState } from 'react'
import Note from './components/note'
import './App.css'
import Sidebar from './components/sidebar'

import Split from "react-split"

import { addDoc, onSnapshot, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { notesCollection, db } from './firebase'

export default function App() {

  const [notes, setNotes] = useState([]);
  const [current, setCurrent] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const [tempText, setTempText] = useState("")

  const sortedNotes = notes.sort((a, b) => b.updated - a.updated)

  async function createNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      created: Date.now(),
      updated: Date.now()
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrent(newNoteRef.id)
    setCurrentNote(newNoteRef)
  }

  async function changeNote(text) {
    const docRef = doc(db, "notes", current)
    await setDoc(docRef, {body: text, updated: Date.now()}, {merge: true})
    setCurrentNote(prev => ({
      ...prev,
      body: text
  }));
    
  }

  async function deleteNote(noteId){
    const docRef = doc(db, "notes", noteId)    
    await deleteDoc(docRef)
    
  }

  useEffect(() => {
      const unsubscribe = onSnapshot(notesCollection, function(snapshot){
        const notesArr = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }))
        setNotes(notesArr)
      } )

      return unsubscribe
    }, [])

  useEffect(() => {
    if(!current){
      setCurrent(notes[0]?.id)
    }
  }, [notes])

  useEffect(() =>{
    

    setCurrentNote(notes.find(note => note.id === current) || "");
  }, [current])
  
  useEffect(() => {
    if (currentNote){
      setTempText(currentNote.body)
    }
  }, [currentNote])


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempText !== currentNote.body) {
        changeNote(tempText);
      }
    }, 500);
    return() => clearTimeout(timeoutId)
  }, [tempText])

  return (
    notes.length >  0 ?
    <Split
      className="split"
      sizes={[20, 80]}
      direction="horizontal"
      
    >
      <Sidebar 
        notes={sortedNotes}
        addNote = {createNote}
        current = {current}
        setCurrent = {setCurrent}
        deleteNote = {deleteNote}
      />
      <Note 
        current = {current}
        tempText = {tempText}
        setTempText = {setTempText}
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

