import Todolist from "./components/TodoList";
import NewTask from "./components/NewTask";
import "./index.css";



function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>TODO</h1>
        <img src="/images/icon-sun.svg"></img>
      </div>
      <NewTask />
      <Todolist />
    </div>
  );
}

export default App;
