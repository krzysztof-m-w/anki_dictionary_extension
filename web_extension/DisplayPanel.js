import React from "react";

export default function DisplayPanel(props){
    const componentStyle = {
        visibility: props.isVisible ? "visible" : "hidden",
        width: '300px',
        height: '300px',
        border: "5px solid black"
    };
    
    function open_diki_window(){
        const url = 'https://www.diki.pl/slownik-niemieckiego';
        const windowName = '_blank'; 
        const windowFeatures = 'width=300,height=300';
        window.open(url, windowName, windowFeatures);
    };

    return(
        <div
            style={componentStyle}
        >
            <button onClick={open_diki_window}>diki</button>
        </div>
    )
}