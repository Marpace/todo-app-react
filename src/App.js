import Header from "./components/Header";
import ItemInput from "./components/ItemInput";
import ListItem from "./components/ListItem";
import ListFooter from "./components/ListFooter";
import Filters from "./components/Filters";
import {useEffect, useState} from "react"
import {ReactSortable} from "react-sortablejs";
import LoadingScreen from "./components/loadingScreen"


function App() {

  // const base_url = "http://localhost:5000";
  const base_url = "https://todo-api-6215.herokuapp.com"


  const [items, setItems] = useState([]);
  const [itemsLeft, setItemsLeft] = useState()
  const [theme, setTheme] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [loading, setLoading] = useState(false)

  function getItems(){
    
    fetch(`${base_url}/get-items`)
    .then(response => response.json())
    .then(data =>{
        setItems(data.items);
        setItemsLeft(data.items.filter(item => item.status === "active").length)
      });
    }

  
  function getTheme(){
    setLoading(true);
    fetch(`${base_url}/get-theme`)
    .then(response => response.json())
    .then(data =>{
      setTheme(data.theme);
      setLoading(false);
    });
  }
  
  function changeTheme(theme){
    fetch(`${base_url}/set-theme`, {
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
    console.log("fired")
        fetch(`${base_url}/add-item`, {
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
    fetch(`${base_url}/delete-item`, {
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
    fetch(`${base_url}/clear-completed`, {
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
    fetch(`${base_url}/update-list-order`, {
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
         <LoadingScreen 
           state={loading ? "show-flex" : "hidden"}
         />
      </div>
    </main>
  );
}

export default App;
