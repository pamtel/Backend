import './App.css';
import Todo from './Todo'

function App() {
  return (
    <div className="App">
      <h1>My Todo App</h1>
        <div className="flex">
          <div className="content"></div>
        </div>
      <Todo />
    </div>
  );
}

export default App;
