
let noteForm = document.querySelector("#noteForm")
let noteList = document.querySelector(".noteList")


let coll = document.getElementsByClassName("collapse");
let i;



noteForm.addEventListener("submit", function(){
    event.preventDefault();
        let nameInput = document.querySelector("#nameInput")
        let nameText = nameInput.value
        let textInput = document.querySelector("#textInput")
        let noteText = textInput.value
    
    createNewNote(noteText, nameText)
})


function createNewNote(noteText, nameText) {
 fetch("http://localhost:3000/notes", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({item:noteText, name:nameText})
})
.then(response => response.json())
.then(data => console.log(data))
}


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
        let noteContent = entry.item

        let buttonName = entry.name
        let listButton = document.createElement("button")
        listButton.classList.add ("collapse")
        listButton.innerText = buttonName
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


noteList.addEventListener("click", function (event) {
    
    if (event.target.matches ("#edit")) {
        
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
    
        let editText = document.querySelector(".editInput")
        let editedText = editText.value
        let editedTextId = event.target.parentElement.dataset.id
        editNoteItem(editedText, editedTextId)
        event.preventDefault()
    }
})

function editNoteItem(editedText, editedTextId) {
    fetch(`http://localhost:3000/notes/${editedTextId}` , {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({item:editedText})
    }   )
    .then(response => response.json())
    .then(data => console.log(data))
}


renderNotes()