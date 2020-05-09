console.log("hellowwww")
let noteForm = document.querySelector("#noteForm")



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
        let nameList = document.createElement("ul")
        for (let entry of data) {
        let listItem = document.createElement("li")
        listItem.dataset.id = entry.id
        listItem.innerText = entry.item
        nameList.appendChild(listItem)
    }
    let noteList = document.querySelector(".noteList")
    noteList.appendChild(nameList)
})
}
renderNotes()


// UPDATE a list of notes on the page with NAME


// UPDATE the text content of the note chosen



// delete the note NAME AND CONTENT




