const editor = document.getElementById('editor');
const clearButton = document.getElementById('clearButton');

function loadText() {
  let text = localStorage.getItem('editorContent');
  if (text) {
    editor.value = text; 
  }
}

function saveText() {
  localStorage.setItem('editorContent', editor.value);
}

function clearContent() {
  editor.value = ''; 
  localStorage.removeItem('editorContent');
}

editor.addEventListener('input', saveText);
clearButton.addEventListener('click', clearContent);

window.onload = loadText;