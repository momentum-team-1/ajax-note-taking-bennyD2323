console.log("hellowwww")
let noteForm = document.querySelector("#noteForm")
let noteList = document.querySelector(".noteList")


// 1 Create Event Listener with submit button
noteForm.addEventListener("submit", function(){
    console.log("mammamia");
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
        listItem.dataset.id = entry.id
        listItem.innerText = entry.item
        let deleteIcon = document.createElement("span")
        deleteIcon.id = "delete"
        deleteIcon.classList.add("fa", "fa-trash")
        let editIcon = document.createElement("span")
        editIcon.id = "edit"
        editIcon.classList.add("fa", "fa-edit")
        listItem.appendChild(editIcon)
        listItem.appendChild(deleteIcon) 
        list.appendChild(listItem)
    }
    noteList.appendChild(list)
})
}


// DELETE ITEMS
noteList.addEventListener("click", function (event) {
    console.log(event.target)
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
    console.log(event.target)
    if (event.target.matches ("#edit")) {
        console.log(event.target.parentElement)
        deleteNoteItem(event.target.parentElement.dataset.id)
    }
})
function editNoteItem(noteId) {
    fetch("http://localhost:3000/notes", {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({item:noteText, name:nameText})
})
    .then(response => response.json())
}
renderNotes()
// UPDATE the text content of the note chosen



// delete the note NAME AND CONTENT




