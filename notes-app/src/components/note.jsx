import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useEffect, useState, useRef} from 'react';
import * as Showdown from "showdown";
import './note.css';

export default function Note(props) {
    
    const [tab, setTab] = useState("write");
    const textArea = useRef(null);
    const [height, setHeight] = useState('auto');

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
      });
    function adjustHeight() {
            if (textArea.current){
                setHeight("auto");
                setHeight(`${textArea.current.scrollHeight}px`);
            }
        }  
    useEffect(() =>{
        
        adjustHeight();
    }, [props.current.body])


    return (
        <div className = "editor">
            <ReactMde
                ref = {textArea}
                style={{ 
                    height: height
                }} 
                className = 'reactMde'
                value = {props.current.body}
                onChange={(value) => {
                    props.changeNote(value);
                    adjustHeight();
        
                } }
                selectedTab={tab}
                onTabChange={setTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                
            />
        </div>
    )
}