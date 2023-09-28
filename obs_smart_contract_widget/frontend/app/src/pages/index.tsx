import React, { useEffect, useState } from 'react';
import Web3, { Contract } from 'web3';

export default function Home() {
  const [web3, setWeb3] = useState<any | null>(null);
  var contractInstance:Contract<any>;
  var contractABI:any = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "getOwnerAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  var contractAddress:string = "0xc40570196d08fb29d74d926783c2316c4b85b27d";

  useEffect(() => {
    async function initializeWeb3() {


      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum;
            
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable(); // Request user permission to connect
          setWeb3(web3Instance);
        } catch (error) {
          console.error('User denied access to accounts');
        }
      } else {
        console.error('Web3 is not detected. Please install MetaMask!');
      }
    }else{
      console.log("window.ethereum undefined");
    }
    }

    initializeWeb3();
  }, []);

  const getAddress = () => {
    const web3Instance = new Web3(window.ethereum);
    contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
    console.log("Click "+contractInstance);
      contractInstance.methods.getOwnerAddress().call()
  .then(result => {
    console.log('Owner Address:', result);
  })
  .catch(error => {
    console.error('Fehler:', error);
  });

    // Hier können Sie Ihre eigene Logik ausführen oder andere Aktionen durchführen
  };


  return (
    <>
    <div>
    {web3 ? (
      <><p>Connected to Web3!</p><button onClick={getAddress}>Klick mich</button></>
    ) : (
      <p>Web3 not connected. Please install MetaMask and connect to an Ethereum network.</p>
    )}
  </div>
  </>
     )
}
