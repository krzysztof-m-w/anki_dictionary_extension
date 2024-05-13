console.log('SCRIPT WORKING');

import React from "react";
import ReactDOM from "react-dom";

// Define a React component using JSX
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
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
    const selectedText = window.getSelection().toString();
    const selection = window.getSelection().getRangeAt(0).getBoundingClientRect();
    console.log(selection)

    var range = window.getSelection().getRangeAt(0);
    var endContainer = range.endContainer;
    var endOffset = range.endOffset;

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

  render() {
    const componentStyle = {
      position: "absolute",
      top: `${this.state.positionY}px`,
      left: `${this.state.positionX}px`,
      transform: "translate(-50%, -50%)",
      backgroundColor: "lightblue",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      cursor: "pointer",
      visibility: this.state.isVisible ? "visible" : "hidden"
      
    };

    return (
      <div 
        style={componentStyle}
      >
        Hello from React!
      </div>
    );
  }
}

// Find a suitable place to mount the React component
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

// Mount the React component into the DOM
ReactDOM.render(<MyComponent />, mountNode);
