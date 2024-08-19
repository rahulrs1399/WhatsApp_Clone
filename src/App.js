import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
// import {BrowserRouter as Router,Routes,Route} from "react-router-dom"


// Switch is deprecated now solution below
function App() {
  return (
    //BEM naming convention
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
