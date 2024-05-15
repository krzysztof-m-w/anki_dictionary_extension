import React from "react";
import ReactDOM from "react-dom";

import DisplayPanel from "./DisplayPanel";


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
      showDisplayPanel : false
    };
  }


  componentDidMount() {
    document.body.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.body.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp = (event) => {
    //ignore actions from inside the component
    if (this.node.contains(event.target)) {
      return
    }

    var selection = window.getSelection()

    const selectedText = selection.toString();
    if(!selectedText){
      this.setState({
        isVisible : false,
        showDisplayPanel : false
      })
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
      isVisible: true,
      positionX: endRect.right + window.scrollX,
      positionY: endRect.bottom + window.scrollY
    });
  }

  handleClick = () => {
    this.setState({
      showDisplayPanel : true
    })

  }



  render() {
    const componentStyle = {
      position: "absolute",
      top: `${this.state.positionY}px`,
      left: `${this.state.positionX}px`,
      cursor: "pointer",
      visibility: this.state.isVisible ? "visible" : "hidden"
      
    };

    return (
      <div 
        style={componentStyle}
        ref={(node) => { this.node = node; }}>
        <div className="ankiComponent"
          onClick={this.handleClick}
        >
          +
        </div>
        <DisplayPanel 
          selectedText={this.state.selectedText}
          isVisible={this.state.showDisplayPanel}
        />
      </div>
    );
  }
}

// Find a suitable place to mount the React component
const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

// Mount the React component into the DOM
ReactDOM.render(<MyComponent />, mountNode);
