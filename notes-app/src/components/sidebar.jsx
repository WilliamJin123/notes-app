import {useState} from 'react';
import "./sidebar.css";

export default function Sidebar(props) {

    const [hovered, setHovered] = useState(false);

    
    const noteElems = props.notes.map((note, index) => (
        <div key={note.id} >
            <div
                className= {`notes ${props.current.id === note.id? "selected-note" : ""}`}

                onClick={() => props.setCurrent(note.id)}
                onMouseOver={() => setHovered(index)}
                onMouseOut={() => setHovered(null)}
                style={{
                    backgroundColor: hovered === index && props.current.id !== note.id ? 'lightgray' : ''
                }
                }
            >
                <h1 className="note-title">Note {index+1}</h1>
            </div>

        </div>
    ))
    
    return(
        <div className = "sidebar">
            <div className = "sidebar-heading">
                <h3>Notes</h3>
                <button onClick= {props.addNote}>+</button>
            </div>  
            {noteElems}
        </div>
    )
}