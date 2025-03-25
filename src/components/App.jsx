import React from "react";
import { HashRouter as Router,Routes,Route } from "react-router";
import Board from "./Board";
import Home from "./Home";
function App()
{
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board" element={<Board/>}/>
      </Routes>
    </Router>
  )
}
export default App;