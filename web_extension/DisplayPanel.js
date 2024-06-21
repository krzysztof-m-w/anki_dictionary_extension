import React from "react";
import WindowOpener from "./WindowOpener";

export default function DisplayPanel(props){
    const [selectedText, setSelectedText] = React.useState(props.selectedText)

    const componentStyle = {
        visibility: props.isVisible ? "visible" : "hidden",
        width: '300px',
        height: '300px',
        border: "5px solid black",
        display: "flex",
        flexDirection: "column", 
        background: '#4a8bad'
    };

    React.useEffect(() => {
        setSelectedText(props.selectedText);
    }, [props.selectedText]);

    const handleInputChange = (event) => {
        setSelectedText(event.target.value);
    };
    

    return(
        <div
            style={componentStyle}
        >
            <span>chosen phrase:<input type="text" value={selectedText} onChange={handleInputChange} /></span>
            <WindowOpener selectedText={selectedText} name={'diki'} url={'https://www.diki.pl/slownik-niemieckiego?q='}/>
            <WindowOpener selectedText={selectedText} name={'deepl'} url={'https://www.deepl.com/pl/translator#de/pl/'}/>
        </div>
    )
}