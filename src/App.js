import "./App.css";
import Excesersise from "./views/Excersise";

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
        <Router>
            <div className="App">
                <ul className="App-header">
                <li>
                    <Link to="/Excercise/1">Challenge 1</Link>
                </li>
                <li>
                    <Link to="/Excercise/2">Challenge 2</Link>
                </li>
                </ul>
            <Routes>
                    <Route exact path='/Excercise/:ID' element={< Excesersise />}></Route>
                    <Route exact path='/Excercise/:ID' element={< Excesersise />}></Route>

            </Routes>
            </div>
        </Router>
  );
}

export default App;
