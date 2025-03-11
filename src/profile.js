import { on } from "events";
import { signUp, logout, login, onAuthStateChanged } from "./auth";
import { db } from "./config";
import { doc, setDoc, collection, deleteDoc, onSnapshot } from "firebase/firestore";

const saveItem = async function() {
    const itemtype = document.getElementById("itemType").value.trim();
    const itemname = document.getElementById("itemName").value.trim();
    const itemcreator = document.getElementById("itemMaker").value.trim();
    const itemyear = document.getElementById("itemYear").value.trim();

    try {
        const itemRef = doc(db, "items", itemname.toLowerCase());
        await setDoc(itemRef, {
            type: itemtype,
            name: itemname,
            creator: itemcreator,
            year: itemyear,
            timestamp: new Date()
        });
        console.log("Item successfully created");
        const type = document.getElementById("itemType").value = "";
        const name = document.getElementById("itemName").value = "";
        const creator = document.getElementById("itemMaker").value = "";
        const year = document.getElementById("itemYear").value = "";

    }catch(error) {
        console.error("Error saving item: ", error);
    }
}


const deleteItem = async function(collection, docId) {
    try {
        await deleteDoc(doc(db, collection,docId));
        console.log('Document with ID ${docId} deleted successfully');
    }catch(error) {
        console.error("Error deleting item ", error);
    }
}

const itemCollection = collection(db, "items");
onSnapshot(itemCollection, (snapshot) => {
    const tableBody = document.getElementById("items-table");
    tableBody.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${data.type}</td>
        <td>${data.name}</td>
        <td>${data.creator}</td>
        <td>${data.year}</td>
        `;
        tableBody.appendChild(row);
    });
});

const addItemForm = document.querySelector("#addItem")
addItemForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    saveItem()
})

const deleteItemForm = document.querySelector("#deleteItem")
deleteItemForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const item = document.getElementById("deleteItemName").value;
    deleteItem("items", item);
})