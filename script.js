const input = document.getElementById("input");
const saveBtn = document.getElementById("saveBtn");
const noteContainer = document.querySelector(".notes-container");

//load window
window.addEventListener("load", showNotes);

//save 
saveBtn.addEventListener("click", () => {
    const note = input.value;
    if (note === "") return;
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    input.value = "";
    showNotes(); 
})

//show notes
function showNotes(){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    noteContainer.innerHTML = "";
    notes.forEach((note, index) => {
        noteContainer.innerHTML += `
        <div class="note">
        <div class="note-text">
            <input type = "checkbox" id = "text" name = "text" value = "${note}">
            <div class= "note-element">
            <label for = "text">${note}</label>
            </div>
        </div>
        <button onclick="deleteNotes(${index})">❌</button>
        </div>
        `;
    });
}
//delete notes
function deleteNotes(index){
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}