import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  // Just a state variable we use to store our user's public wallet address
  const[currAccount, setCurrAccount] = React.useState("");
  
  const checkIfWalletIsConnected = () => {
      // First Make Sure we have access to window.ethereum
      const { ethereum } = window;
      if(!ethereum) {
        console.log("Make sure you have metamask!");
        return 
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      // Check if we're authorized to access the user's wallet
      ethereum.request({ method: 'eth_accounts' }).then(accounts => {
        // We could have multiple accounts. Check for one
        if(accounts.length !== 0) {
          // Grab the first account we have access to
          const account = accounts[0];
          console.log("Found an authorized account: ", account);
          
          // Store the user's public wallet address for later
          setCurrAccount(account);
        } else {
          console.log("No authorized account found");
        }
      })
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
