var extensionURL = browser.runtime.getURL('');

//add style for the extensions elements
var style = document.createElement('style');
style.textContent = `
.anki-extension-popup {
    position: absolute;
    transform: translateX(-50%);
    background-color: white;
    border: 1px solid black;
    border-radius: 50%; /* Make the border a perfect circle */
    padding: 5px;
    visibility: hidden;
}

.anki-popup-icon{
    height: 20;
    width: 20px;
}
`;
document.head.appendChild(style);

var existingPop

var popup = document.createElement('div');
popup.className = 'anki-extension-popup';

var imgElement = document.createElement('img');
imgElement.className = 'anki-popup-icon'
imgElement.src = extensionURL + '/images/popup-icon.png';
imgElement.alt = 'icon';

popup.append(imgElement)

// Append the popup to the document body
document.body.appendChild(popup);


document.addEventListener('mouseup', function(event) {
    var selection = window.getSelection().toString(); // Get selected text
    if (selection) {
        var range = window.getSelection().getRangeAt(0); // Get range object

        // Calculate position relative to the selected text
        var rect = range.getBoundingClientRect();
        popup.style.top = (rect.top + window.scrollY - popup.offsetHeight - 10) + 'px';
        popup.style.left = (rect.left + window.scrollX + rect.width / 2 - popup.offsetWidth / 2) + 'px';

        popup.style.visibility = 'visible';

    }
});


document.addEventListener('click', function(event) {
    var selection = window.getSelection().toString();
    if (!selection){
        popup.style.visibility = 'hidden';
    };
});

console.log(popup)

popup.addEventListener('click', (e) => {
     console.log('click')
});