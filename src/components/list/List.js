import React, { useEffect, useState } from "react";
import {ReactSortable} from "react-sortablejs";
import ListItem from "./ListItem"
import ItemInput from "./ItemInput";
import ListFooter from "./ListFooter";
import Filters from "./Filters";
import Modal from "../modals/Modal";

function List(props){

  const [itemsLeft, setItemsLeft] = useState()
  const [items, setItems] = useState(props.items);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    localStorage.setItem("originalItems", JSON.stringify(items))
  }, [])

  
  function addItem(content, status) {
    setItems( prev => {
      return [...prev, {
        content: content,
        status: status
      }]
    })
  }

  function deleteItem(index){
    setItems( prev => {
      const arr = [...prev]
      arr.splice(index, 1)
      return arr;
    })
  }

  function checkItem(index) {
    setItems(prev => {
      const arr = [...prev]; 
      arr[index].status = arr[index].status === "active" ? "completed" : "active"
      return arr; 
    })
  }

  function clearCompleted() {
    setItems( prev => {
      const arr = [...prev].filter(item => item.status === "active")
      return arr;
    })
  }

  function handleBackButtonClick() {
    const originalItems = localStorage.getItem("originalItems");
    console.log(items)
    console.log(originalItems)
    if(!originalItems || JSON.stringify(items) === originalItems) {
      const username = localStorage.getItem("username")
      props.setSingleList(null)
      props.setHeader(`${username}'s lists`)
      localStorage.removeItem("list")
      localStorage.removeItem("originalItems")
    } else {
      setShowModal(true);
    }
  }

  // function updateListOrder(evt){
  //     fetch(`${props.base_url}/update-list-order`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: 'Bearer ' + localStorage.getItem("token"),
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         newIndex: evt.newIndex,
  //         itemId: evt.item.id,
  //         content: evt.item.children[1].innerHTML,
  //         status: evt.item.children[0].id,
  //         listId: props.listId
  //       })
  //     })
  //     .then(() => getItems())
  //     .catch(err => console.log(err))
  //   }

  function saveList() {
    setLoading(true);
    fetch(`${props.base_url}/save-list`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: items,
        listId: props.listId
      })
    }).then(res => res.json())
    .then( data => {
      setLoading(false)
      localStorage.setItem("list", JSON.stringify(data.list))
      if(showModal) {
        const username = localStorage.getItem("username")
        props.setSingleList(null)
        props.setHeader(`${username}'s lists`)
        localStorage.removeItem("list")
      } else {
        localStorage.setItem("originalItems", JSON.stringify(items))
        setShowBanner(true)
        setTimeout(() => {
          setShowBanner(false)
        }, 2000);
      }
      console.log("List saved!")
    })
    .catch(err => console.log(err))
  }

  function applyFilter(filter){
    setCurrentFilter(filter);
  }
    
    
  // function clearCompleted(){
  //   fetch(`${props.base_url}/clear-completed`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: 'Bearer ' + localStorage.getItem("token"),
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({listId: props.listId})
    
  //   })
  //   .then(() => {
  //     console.log("Deleted completed items.")
  //     getItems()
  //     setCurrentFilter("all")
  //   })
  // }

  return(
    <div className="todo-list-wrap">

      <div onClick={handleBackButtonClick} className="back-btn">
        <img className="back-btn__icon" src="./images/back_icon.svg"></img>
      </div>

      <ItemInput 
        addItem={addItem}
        theme={props.theme}
      />
      <div
          className={`todo-list todo-list-${props.theme} ${items.length > 0 ? "" : "hidden"}`}
          // animation={200}
          // list={items}
          // delay={200}
          // delayOnTouchOnly={true}
          // setList={setItems}
          // onEnd={updateListOrder}
          >
          {items.map((item, index) => (
              <ListItem 
              key={index}
              index={index}   
              id={item._id}
              content={item.content}
              theme={props.theme}
              status={item.status}
              filter={currentFilter}
              deleteItem={deleteItem}
              checkItem={checkItem}
              />
          ))}
      </div>
      <ListFooter 
        theme={props.theme}
        filter={currentFilter}
        itemsLeft={itemsLeft}
        showFooter={items.length > 0}
        applyFilter={applyFilter}
        clearCompleted={clearCompleted}
      />
      <Filters 
        theme={props.theme}
        filter={currentFilter}
        showFilters={items.length > 0}
        applyFilter={applyFilter}
      />

      
      <div className={`bottom-text ${items.length > 0 ? "" : "hidden"}`}>
          <p className="bottom-text__desktop">Drag and drop to reorder list</p>
          <p className="bottom-text__mobile">Tap and hold a list item to move it</p>
      </div> 

      <div className="save-list">
        <button onClick={saveList} className={`save-list__btn button-${props.theme} ${loading ? "loading-button" : ""}`}>{loading ? "" : "Save list"}</button>
      </div>

      <Modal 
        lineOne="Save list before exiting?"
        buttonContent="Save"
        showModal={showModal}
        setShowModal={setShowModal}
        buttonFunction={saveList}
      />

      <div className={`banner ${showBanner ? "show-banner" : ""}`}>
        <p>List has been saved!</p>
      </div>

    </div>
  )
}

export default List;

