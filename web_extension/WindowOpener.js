import React from "react";

export default function WindowOpener(props){
    const buttonRef = React.useRef(null);
    const [newWindow, setNewWindow] = React.useState(null);

    function openWindow(){
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = rect.left + window.screenX;
            const y = rect.bottom + window.screenY + 100;
      
            const url = props.url + props.selectedText;
            const windowName = '_blank';
            const windowFeatures = `width=300,height=300,left=${x},top=${y}`;
            const newWin = window.open(url, windowName, windowFeatures);
            setNewWindow(newWin);
        }
    };

    function closeWindow(){
        if(newWindow){
            newWindow.close();
        }
        setNewWindow(null);
    }

    return(
        <button ref={buttonRef} onClick={openWindow}>{props.name}</button>
    )
}