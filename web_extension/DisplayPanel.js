import React from "react";

export default function DisplayPanel(props){
    const componentStyle = {
        visibility: props.isVisible ? "visible" : "hidden"
    };
    return(
        

        <div 
            className="ankiComponent"
            style={componentStyle}
        >
            {props.selectedText}
        </div>
    )
}