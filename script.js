const ul = document.querySelector("#myUL")
const input = document.querySelector("#myInput")
const li = document.querySelector(".todoItem")
const allItems = JSON.parse(localStorage.getItem('items')) || {}

function add(newItem) {
    if(newItem === ""){
        alert("Oops, looks like there's nothing there!")
    } else {
        const listItem = document.createElement("li")
        const removeIcon = document.createElement("i")
        removeIcon.className = "fas fa-trash"
        removeIcon.addEventListener("click", function(e) {
            listItem.remove(e.target)
            listItem.remove(e.parent)
            delete allItems[newItem]
            localStorage.setItem('items', JSON.stringify(allItems))
            
        })

        listItem.textContent = newItem
        listItem.appendChild(removeIcon)

        ul.appendChild(listItem) 
        listItem.className = "todoItem"
        input.value = ""
        
    
        if (!allItems[newItem]) {
            allItems[newItem] = { text: newItem, subItems: {} }
            localStorage.setItem('items', JSON.stringify(allItems))
        }


        let ol = document.createElement("ol")
        ol.className = "subList"
        listItem.appendChild(ol)
        createSublistItem(ol, newItem)
        console.log(allItems)
        return ol
    }
}

const createSublistItem = (parent, parentText) => {
    let inputField = document.createElement("input")
    let newButton = document.createElement("span")
    parent.appendChild(newButton)
    newButton.textContent = "Add"
    newButton.className = "subButton"
    parent.appendChild(inputField)
    newButton.addEventListener("click", function(e) {
        e.stopPropagation()
        addingOL(parent, inputField.value, parentText)
    })

    inputField.value = ""
    
}


const addToList = document.querySelector("#add_button").addEventListener("click", function() {
    add(input.value)
})

// recreates the todo list from localStorage
Object.keys(allItems).forEach(key => {
    const parent = add(allItems[key].text)
    console.log(allItems[key].subItems)
    Object.keys(allItems[key].subItems).forEach(subItemKey => {
        console.log('!!', parent, allItems[key].subItems[subItemKey], key)
        addingOL(parent, allItems[key].subItems[subItemKey], key)
    })
})

function addingOL(parent, textValue, newItem) {
    let subListItem = document.createElement("li")
    subListItem.textContent = textValue
    allItems[newItem].subItems[textValue] = textValue
    localStorage.setItem('items', JSON.stringify(allItems))
    parent.appendChild(subListItem)
    subListItem.addEventListener("click", function() {
        if(subListItem.className !== "checked"){
            subListItem.className = "checked"
        }else{
            subListItem.classList.remove("checked")
        }
    })
}