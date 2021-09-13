import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/BumpPortal.json'

export default function App() {
  // Just a state variable we use to store our user's public wallet address
  const[currAccount, setCurrentAccount] = React.useState("");
  const contractAddress = "0xa558b88B4FF16136876FB276c2aBb6ACf25B1BB8"
  const contractABI = abi.abi;

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
          setCurrentAccount(account);
        } else {
          console.log("No authorized account found");
        }
      })
    }

    const connectWallet = () => {
      const { ethereum } = window;
      if(!ethereum) {
        alert('Get metamask!')
      }

      ethereum.request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        console.log("Connected", accounts[0]);
        setCurrentAccount(accounts[0]);
      })
      .catch(err => console.log(err))
    }

    const bump = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const bumpportalContract = new ethers.Contract(contractAddress, contractABI, signer);

      let count = await bumpportalContract.getTotalBumps();
      console.log("Retrieved total bump count...", count.toNumber());
    }
    
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

        <button className="bumpButton" onClick={bump}>
          Bump me here 👊 
        </button>

        {currAccount ? null : (
        <button className="bumpButton" onClick={connectWallet}>
          Connect Wallet
        </button>
        )}
      </div>
    </div>
  );
}
