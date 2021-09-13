import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  
  const checkIfWalletIsConnected = () => {
      // First Make Sure we have access to window.ethereum
      const { ethereum } = window;
      if(!ethereum) {
        console.log("Make sure you have metamask!");
        return 
      } else {
        console.log("We have the ethereum object", ethereum);
      }
    }
    
    // This runs our function when the page loads
    React.useEffect(() => {
      checkIfWalletIsConnected()
    }, [])
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there! Sending you a 👊
        </div>

        <div className="bio">
        I am Anand. Building something new 👀
        </div>

        <button className="waveButton" onClick={null}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
