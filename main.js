console.log("hellowwww")
let noteForm = document.querySelector("#noteForm")
let noteList = document.querySelector(".noteList")


var coll = document.getElementsByClassName("collapse");
var i;

// for (i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function() {
//         event.preventDefault();
//         if (event.target.matches (".collapse")){
//         this.classList.toggle("active");
//         var content = this.nextElementSibling;
//         if (content.style.display === "block") {
//           content.style.display = "none";
//         } else {
//           content.style.display = "block";
//         }
//       }});
//     }


// 1 Create Event Listener with submit button
noteForm.addEventListener("submit", function(){
    
    event.preventDefault();
        let nameInput = document.querySelector("#nameInput")
        let nameText = nameInput.value
        let textInput = document.querySelector("#textInput")
        let noteText = textInput.value
    console.log(noteText)
    console.log(nameText)

    // ""
    createNewNote(noteText, nameText)
})

// 2 Send the INPUT to the database server. Note name and content
function createNewNote(noteText, nameText) {
return fetch("http://localhost:3000/notes", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({item:noteText, name:nameText})
})
.then(response => response.json())
.then(data => console.log(data))
}

// 3 FETCH the note from the database server
function renderNotes(){
    fetch("http://localhost:3000/notes",{
        method: "GET"
    })
    .then(response => response.json())
    .then (function(data) {
        let list = document.createElement("ul")
    for (let entry of data) {

    let listItem = document.createElement("li")
        // listItem.dataset.id = entry.idf
        listItem.dataset.id = entry.id
        let  noteContent = entry.item

        let buttName = entry.name
        let listButton = document.createElement("button")
        listButton.classList.add ("collapse")
        listButton.innerText = buttName
        let noteMake = document.createElement("div")
        noteMake.classList.add("dropContent")
        let noteBox = document.createElement("p")
        noteBox.innerText = noteContent

    let deleteIcon = document.createElement("span")
        deleteIcon.id = "delete"
        deleteIcon.classList.add("fa", "fa-trash")

    let editIcon = document.createElement("span")
        editIcon.id = "edit"
        editIcon.classList.add("fa", "fa-edit")
// ADD P DIV FOR BOX DROP CONTENT;

    listItem.appendChild(listButton)
    
    
        list.appendChild(listItem)
        listItem.appendChild(noteMake)
        noteMake.appendChild(noteBox)
        listItem.appendChild(editIcon)
        listItem.appendChild(deleteIcon) 

        
    }
    noteList.appendChild(list)
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            event.preventDefault();
            if (event.target.matches (".collapse")){
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          }});
        }
})
}

// DELETE ITEMS
noteList.addEventListener("click", function (event) {
    // console.log(event.target)
    if (event.target.matches ("#delete")) {
        console.log(event.target.parentElement)
        deleteNoteItem(event.target.parentElement.dataset.id)
    }
})
function deleteNoteItem(noteId) {
    fetch(`http://localhost:3000/notes/${noteId}` , {
        method: "DELETE"
    })
    .then(response => response.json())
}
// EDIT ITEMS OMG

noteList.addEventListener("click", function (event) {
    // console.log(event.target)

    if (event.target.matches ("#edit")) {
        
        console.log( "first phase")
        let editInput = document.createElement("input")
        editInput.classList.add("editInput")
        let editTarget = event.target.parentElement
        let editButton = document.createElement("button")
        editButton.id = "editButton"
        editButton.innerText = "Edit Note"
        editTarget.appendChild(editInput)
        editTarget.appendChild(editButton)
}
    
})
noteList.addEventListener("click", function (event) {
    if (event.target.matches("#editButton")) {
        // console.log(event.target.parentElement)
        let editText = document.querySelector(".editInput")
        let newText = editText.value
        let newTextId = event.target.parentElement.dataset.id
        console.log(newText)
        editNoteItem(newText, newTextId)
        event.preventDefault()
}
})

function editNoteItem(newText, newTextId) {
    fetch(`http://localhost:3000/notes/${newTextId}` , {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({item:newText})
})
    .then(response => response.json())
    .then(data => console.log(data))
}
renderNotes()
// UPDATE the text content of the note chosen



// delete the note NAME AND CONTENT




