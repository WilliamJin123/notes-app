import {useState} from 'react';
import "./sidebar.css";

export default function Sidebar(props) {

    const [hovered, setHovered] = useState(false);

    
    const noteElems = props.notes.map((note, index) => (
        <div key={note.id} >
            <div
                className= {`notes ${props.current === note.id? "selected-note" : ""}`}

                onClick={() => props.setCurrent(note.id)}
                onMouseOver={() => setHovered(index)}
                onMouseOut={() => setHovered(null)}
                style={{
                    backgroundColor: hovered === index && props.current !== note.id ? 'lightgray' : ''
                }
                }
            >
                <h1 className="note-title">{note.body.split("\n")[0]}</h1>
                <i className="fa-regular fa-trash-can"
                    style={{
                        display: hovered === index || props.current === note.id ? 'block' : 'none'
                    }}
                    onClick={() => props.deleteNote(note.id)}
                ></i>
            </div>

        </div>
    ))
    
    return(
        <div className = "sidebar">
            <div className = "sidebar-heading">
                <h3>Notes</h3>
                <button className="sidebar-btn" onClick= {props.addNote}>+</button>
            </div>  
            {noteElems}
        </div>
    )
}