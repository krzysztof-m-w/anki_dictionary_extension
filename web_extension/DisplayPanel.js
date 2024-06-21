import React from "react";

export default function DisplayPanel(props){
    const buttonRef = React.useRef(null);
    const [newWindow, setNewWindow] = React.useState(null);
    const [selectedText, setSelectedText] = React.useState(props.selectedText)

    const componentStyle = {
        visibility: props.isVisible ? "visible" : "hidden",
        width: '300px',
        height: '300px',
        border: "5px solid black"
    };

    React.useEffect(() => {
        setSelectedText(props.selectedText);
    }, [props.selectedText]);

    const handleInputChange = (event) => {
        setSelectedText(event.target.value);
    };
    
    function open_diki_window(){
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = rect.left + window.screenX;
            const y = rect.bottom + window.screenY + 100;
      
            const url = 'https://www.diki.pl/slownik-niemieckiego?q=' + selectedText;
            const windowName = '_blank';
            const windowFeatures = `width=300,height=300,left=${x},top=${y}`;
            const newWin = window.open(url, windowName, windowFeatures);
            setNewWindow(newWin);
        }
    };

    return(
        <div
            style={componentStyle}
        >
            <span>chosen phrase:<input type="text" value={selectedText} onChange={handleInputChange} /></span>
            <button ref={buttonRef} onClick={open_diki_window}>diki</button>
        </div>
    )
}