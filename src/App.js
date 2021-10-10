import "./App.css";
import NodeGraph from "./Components/NodeGraph/NodeGraph.js";
import { isMobile, isTablet } from 'react-device-detect';

function App() {

    if(isMobile || isTablet){
        return (
            <div className="App">
                <div className="Container">

                <p className="title">Designed for Desktops</p>
                <img className="brokenRobo" src="./robo.png" alt="broken robo" />
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            
            <NodeGraph />
        </div>
    );
}

export default App;
