import Header from "./components/Header";
import ItemInput from "./components/ItemInput";
import ListItem from "./components/ListItem";
import ListFooter from "./components/ListFooter";
import Filters from "./components/Filters";
import {useEffect, useState} from "react"
import {ReactSortable} from "react-sortablejs";


function App() {



  const [items, setItems] = useState([]);
  const [itemsLeft, setItemsLeft] = useState()
  const [theme, setTheme] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  function getItems(){
    fetch('http://localhost:5000/get-items')
    .then(response => response.json())
    .then(data =>{
        setItems(data.items);
        setItemsLeft(data.items.filter(item => item.status === "active").length)
    });
  }

  
  function getTheme(){
    fetch('http://localhost:5000/get-theme')
    .then(response => response.json())
    .then(data =>{
      setTheme(data.theme);
      console.log("theme: " + data.theme)
    });
  }

  function changeTheme(theme){
    fetch("http://localhost:5000/change-theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({theme: theme})
    }).then(() => {
      console.log("switched theme");
      getTheme();
    })
  }

  function applyFilter(filter){
    setCurrentFilter(filter);
  }

  function addItem(inputValue){
        fetch("http://localhost:5000/add-item", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({content: inputValue, status: "active"})
        }).then(() => {
            console.log("new item added to the list")
            getItems();
        })
  }

  function deleteItem(id){
    fetch("http://localhost:5000/delete-item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        }).then(() => {
            console.log("Deleted item")
            getItems();
        })
  }

  function clearCompleted(){
    fetch("http://localhost:5000/clear-completed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      console.log("Deleted completed items.")
      getItems();
      setCurrentFilter("all")
    })
  }

  function updateListOrder(evt){
    fetch("http://localhost:5000/update-list-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        newIndex: evt.newIndex,
        itemId: evt.item.id,
        content: evt.item.children[1].innerHTML,
        status: evt.item.children[0].id
      })
    })
    .then(() => {
      getItems();
    })
  }

  useEffect(() => {
      getItems();
      getTheme();
  }, []);



  return (
    <main className={`main-${theme}`}>
      <div className="wrap">
        <Header 
          theme={theme}
          changeTheme={changeTheme}
        />
        <ItemInput 
          addItem={addItem}
          theme={theme}
        />

          <ReactSortable
          className={`todo-list todo-list-${theme}`}
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
              deleteItem={deleteItem}
              theme={theme}
              status={item.status}
              filter={currentFilter}
              getItems={getItems}
            />
          ))}
        </ReactSortable>

        <ListFooter 
          theme={theme}
          applyFilter={applyFilter}
          filter={currentFilter}
          itemsLeft={itemsLeft}
          clearCompleted={clearCompleted}
        />
        <Filters 
          theme={theme}
          applyFilter={applyFilter}
          filter={currentFilter}
        />
      </div>
    </main>
  );
}

export default App;
