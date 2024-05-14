console.log('SCRIPT WORKING');

import React from "react";
import ReactDOM from "react-dom";

// Define a React component using JSX
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.lastRange = null;
    this.state = {
      selectedText: "",
      isVisible: false,
      positionX: 200,
      positionY: 200,
    };
  }


  componentDidMount() {
    document.body.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = () => {
    var selection = window.getSelection()

    const selectedText = selection.toString();
    if(!selectedText){
      return;
    }

    
    var range = selection.getRangeAt(0);
    var endContainer = range.endContainer;
    var endOffset = range.endOffset;
    
    this.lastRange = range;

    // Create a range to represent the end of the selection
    var endRange = document.createRange();
    endRange.setStart(endContainer, endOffset);
    endRange.collapse(true); // Collapse the range to the end point

    // Get the bounding rectangle of the end point
    var endRect = endRange.getBoundingClientRect();

    // If the selection ends in the middle of a line
    if (endContainer.nodeType === Node.TEXT_NODE && endOffset < endContainer.length) {
        var textNode = endContainer;
        var dummyRange = document.createRange();
        dummyRange.setStart(textNode, endOffset);
        dummyRange.setEnd(textNode, endOffset + 1);
        var dummyRect = dummyRange.getBoundingClientRect();
        if (dummyRect.top !== endRect.top) {
            // Selection ends in the middle of a line, adjust the coordinates
            endRect = dummyRect;
        }
    }

    this.setState({
      selectedText: selectedText,
      isVisible: selectedText.trim().length > 0,
      positionX: endRect.right + window.scrollX,
      positionY: endRect.bottom + window.scrollY
    });
  }

  handleClick = () => {
    if(this.lastRange){
      const selection = window.getSelection(); 
      selection.removeAllRanges();
      selection.addRange(this.lastRange);
    }
    
    this.setState({
      isVisible : "visible"
    })
  }



  render() {
    const componentStyle = {
      position: "absolute",
      top: `${this.state.positionY}px`,
      left: `${this.state.positionX}px`,
      backgroundColor: "lightblue",
      padding: "6px",
      borderRadius: "500px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      visibility: this.state.isVisible ? "visible" : "hidden"
      
    };

    return (
      <div 
        style={componentStyle}
        onClick={this.handleClick}
      >
        +
      </div>
    );
  }
}

// Find a suitable place to mount the React component
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

// Mount the React component into the DOM
ReactDOM.render(<MyComponent />, mountNode);
