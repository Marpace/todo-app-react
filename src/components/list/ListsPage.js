import React, { useEffect, useState } from "react";
import NewListBtn from "../buttons/NewListBtn";
import Header from "../Header";
import List from "./List";
import LogoutBtn from "../buttons/LogoutBtn"
import LoadingScreen from "../loadingScreen"
import CollapsedList from "./CollapsedList";

function ListsPage(props) {

    const [lists, setLists] = useState([]);
    const [singleList, setSingleList] = useState(null);
    const [theme, setTheme] = useState("");
    const [loading, setLoading] = useState(false);
    const [header, setHeader] = useState("TODO")

    useEffect(() => {
        getTheme();
        getLists();
        const list = JSON.parse(localStorage.getItem("list"));
        if(list !== null) {
            console.log(list)
            setSingleList(list)
            setHeader(list.title)
        }
    }, [])


    function getLists(){
        setLoading(true)
        fetch(`${props.base_url}/get-lists`, {
          headers: {
            Authorization: 'Bearer ' + props.token
          }
        })
        .then(res => res.json())
        .then(data => {
            setLists(data.lists)
            setLoading(false)
        })
        .catch(err => console.log(err));
    }

    function getSingleList(listId){
        fetch(`${props.base_url}/get-single-list`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "Content-type": "Application/json"
            },
            body: JSON.stringify({listId: listId})
        })
        .then(res => res.json())
        .then(data => {
            const selectedList = data.list;
            setSingleList(selectedList);
            localStorage.setItem("list", JSON.stringify(selectedList))
            setHeader(selectedList.title.toUpperCase());
        })
        .catch(err => console.log(err))
    }

    function createList(listTitle){
        const dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
        const dateCreated = new Date().toLocaleDateString("en-US", dateOptions)
        fetch(`${props.base_url}/create-list`, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: listTitle, 
                dateCreated: dateCreated
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(`Created ${listTitle} list ${dateCreated}`)
            getLists();
            setSingleList(data.list);
            setHeader(data.list.title.toUpperCase());
        })
    }

    function deleteList(listId){
        fetch(`${props.base_url}/delete-list`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + props.token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({listId: listId})
        })
        .then(() => {
          getLists();
          console.log("Deleted list")
        })
        .catch(err => console.log(err))
      }
    
    
    function getTheme(){
        fetch(`${props.base_url}/get-theme`)
        .then(response => response.json())
        .then(data =>{
            setTheme(data.theme);
        });
    }
      
    function changeTheme(theme){
        fetch(`${props.base_url}/set-theme`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({theme: theme})
        })
        .then(() => {
            console.log("switched theme");
            getTheme();
        })
    }
    

    function renderLayout() {
        if(loading) {
            return (
                <LoadingScreen />
            )
        }
        else if(singleList) {
            return(
                <List 
                    listId={singleList._id}
                    listTitle={singleList.title}
                    theme={theme}
                    base_url={props.base_url} 
                    items={singleList.listItems}
                    getLists={getLists}
                    setSingleList={setSingleList}
                    setHeader={setHeader}
                />
            ) 
        }
        return (
            <div className={`collapsed-wrap`}>
                {lists.map((list) => (
                    <CollapsedList 
                        key={list._id}
                        listTitle={list.title}
                        listId={list._id}
                        dateCreated={list.dateCreated}
                        theme={theme}
                        getSingleList={getSingleList}
                        deleteList={deleteList}
                    />
                ))}
                <NewListBtn 
                    theme={theme}
                    createList={createList}
                />
                <LogoutBtn 
                    theme={theme}
                    onLogout={props.onLogout}
                />   
            </div>
        )
    }

    return (
        <main className={`main-${theme}`}>
            <div className="wrap">
                <Header 
                    header={header}
                    theme={theme}
                    changeTheme={changeTheme}
                />
                {renderLayout()}
            </div>
        </main>
    )


}




export default ListsPage;