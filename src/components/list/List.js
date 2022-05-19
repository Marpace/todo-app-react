import React, { useState } from "react";
import {ReactSortable} from "react-sortablejs";
import ListItem from "./ListItem"
import ItemInput from "./ItemInput";
import ListFooter from "./ListFooter";
import Filters from "./Filters";
import BackToListsBtn from "../buttons/BackToListsBtn";

function List(props){

  const [itemsLeft, setItemsLeft] = useState()
  const [items, setItems] = useState(props.items);
  const [currentFilter, setCurrentFilter] = useState("all");

  function getItems(){
    fetch(`${props.base_url}/get-items`, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({listId: props.listId})
    })
    .then(response => response.json())
    .then(data =>{
        setItems(data.items);
        setItemsLeft(data.items.filter(item => item.status === "active").length)
      }
    )
    .catch(err => console.log(err)); 
  }

  function addItem(inputValue){
    fetch(`${props.base_url}/add-item`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({content: inputValue, status: "active", listId: props.listId})
    }).then(() => {
        console.log("new item added to the list")
        getItems();
    })
    .catch(err => console.log(err))
  }

  function deleteItem(id){
    fetch(`${props.base_url}/delete-item`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({itemId: id, listId: props.listId})
    })
    .then(() => {
        console.log("Deleted item")
        getItems();
    })
    .catch(err => console.log(err))
  }

  function checkItem(itemId, status){
    fetch(`${props.base_url}/check-item`, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({itemId: itemId, status: status, listId: props.listId})
  })
  .then(() => getItems())
  .catch(err => console.log(err))
  }

  function removeSingleList(){
    localStorage.removeItem("list")
  }
  
  function updateListOrder(evt){
      fetch(`${props.base_url}/update-list-order`, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          newIndex: evt.newIndex,
          itemId: evt.item.id,
          content: evt.item.children[1].innerHTML,
          status: evt.item.children[0].id,
          listId: props.listId
        })
      })
      .then(() => getItems())
      .catch(err => console.log(err))
    }

  function applyFilter(filter){
    setCurrentFilter(filter);
  }
    
    
  function clearCompleted(){
    fetch(`${props.base_url}/clear-completed`, {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({listId: props.listId})
    
    })
    .then(() => {
      console.log("Deleted completed items.")
      getItems()
      setCurrentFilter("all")
    })
  }

  function renderComponent() {
    if(items.length <= 0) {
      return (
        <div className="todo-list-wrap">
          <ItemInput 
            addItem={addItem}
            theme={props.theme}
          />
          <BackToListsBtn 
              theme={props.theme}
              setSingleList={props.setSingleList}
              setHeader={props.setHeader}
              removeSingleList={removeSingleList}
            />
        </div>
      )
    }
    else {
      return (
        <div className="todo-list-wrap">
          <ItemInput 
            addItem={addItem}
            theme={props.theme}
          />
          <ReactSortable
              className={`todo-list todo-list-${props.theme}`}
              animation={200}
              list={items}
              delay={200}
              delayOnTouchOnly={true}
              setList={setItems}
              onEnd={updateListOrder}
              >
              {items.map((item) => (
                  <ListItem 
                  key={item._id}
                  id={item._id}
                  content={item.content}
                  theme={props.theme}
                  status={item.status}
                  filter={currentFilter}
                  deleteItem={deleteItem}
                  checkItem={checkItem}
                  />
              ))}
          </ReactSortable>
          <ListFooter 
            theme={props.theme}
            applyFilter={applyFilter}
            filter={currentFilter}
            itemsLeft={itemsLeft}
            clearCompleted={clearCompleted}
          />
          <Filters 
            theme={props.theme}
            applyFilter={applyFilter}
            filter={currentFilter}
          />

          
          <div className="bottom-text">
              <p className="bottom-text__desktop">Drag and drop to reorder list</p>
              <p className="bottom-text__mobile">Tap and hold a list item to move it</p>
          </div> 

          <BackToListsBtn 
            setSingleList={props.setSingleList}
            theme={props.theme}
            setHeader={props.setHeader}
            removeSingleList={removeSingleList}
          />
        </div>
      )
    }
  }

  return(
    renderComponent()
  )
}

export default List;

