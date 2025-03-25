import "../styles/Home.css"
import { useNavigate } from "react-router";
function Home(){
    const navigate=useNavigate();
    return <>
    <div className="Home-body">
        <div className="Home-container">
            <div className="boxes">
                <div className="boxes-flex">    <span className="box1"></span>
                <span className="box2"></span></div>
                <div className="boxes-flex">    <span className="box2"></span>
                <span className="box3"></span></div>
            </div>
            <p>Tango</p>
            <aside>Harmonize the grid.</aside>
            <h1>A game Re-Created by THANUSH S</h1>
            <button onClick={()=>navigate("/board")}>Start game</button>
        </div>

    </div>
    </>
}
export default Home;