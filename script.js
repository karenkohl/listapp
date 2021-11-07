const todoObjectList = []
let ul = document.querySelector("#myUL")
let input = document.querySelector("#myInput")
let li = document.querySelector(".todoItem")

function add(newItem) {
    if(newItem === ""){
        alert("Oops, looks like there's nothing there!")
    }else{
        let listItem = document.createElement("li")
        let i = document.createElement("i")
        i.className = "fas fa-trash"
        i.addEventListener("click", function(e) {
            listItem.remove(e.target)
            listItem.remove(e.parent)
        })
        listItem.textContent = newItem
        listItem.appendChild(i)
        todoObjectList.shift(newItem)
        ul.appendChild(listItem) 
        listItem.className = "todoItem"
        input.value = ""


        let ol = document.createElement("ol")
        ol.className = "subList"
        listItem.appendChild(ol)
    
        createSublistItem(ol)
        
    }
}

const createSublistItem = (parent) => {
    let inputField = document.createElement("input")
    let newButton = document.createElement("span")
    parent.appendChild(newButton)
    newButton.textContent = "Add"
    newButton.className = "subButton"
    parent.appendChild(inputField)
    newButton.addEventListener("click", function(e) {
        e.stopPropagation()
        let subListItem = document.createElement("li")
        subListItem.textContent = inputField.value
        parent.appendChild(subListItem)
        subListItem.addEventListener("click", function() {
            if(subListItem.className !== "checked"){
                subListItem.className = "checked"
            }else{
                subListItem.classList.remove("checked")
            }
        })
        inputField.value = ""
    })
    
}



const addToList = document.querySelector("#add_button").addEventListener("click", function() {
    add(input.value)
})
