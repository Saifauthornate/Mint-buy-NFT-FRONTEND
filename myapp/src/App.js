import Web3Modal from "web3modal";
import { providers, Contract,utils } from "ethers";
import { useEffect, useRef, useState } from "react";
import { DEPLOYED_CONTRACT_ADDRESS, abi } from "./iindex";
import './App.css';
export default function App() {

  const [walletConnected, setWalletConnected] = useState(false);
  const [Balance, setBalance] = useState();
  const [sym,setSymbol] = useState();

  const [text, setText] = useState();                                                   
  const [buyNF,setBuyNF]= useState();

  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();


  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


  const NFTname = async () => {
    try {

      const provider = await getProviderOrSigner();
      const myNftContract = new Contract(DEPLOYED_CONTRACT_ADDRESS, abi, provider);

      const value = await myNftContract.name();
      setText(value);
      // console.log(value);

    } catch (err) {
      console.error(err);
    }
  };


  const balanceOf = async () => {

    try {
      const signer = await getProviderOrSigner(true);
      const myNftContract = new Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
      const balance = await myNftContract.balanceOf("0xaF09B9535E239AaDcC2B96331341647F84a3537f");
      
      setBalance(balance.toString());
      // console.log(balance);

    } catch (err) {
      console.error(err);
    }
  };


  const NFTSymbol = async () => {

    try {
      const signer = await getProviderOrSigner(true);
      const myNftContract = new Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
      const symb = await myNftContract.symbol();
      
     setSymbol(symb);

    } catch (err) {
      console.error(err);
    }
  };


  const mintnft = async () => {
    try {

      const signer = await getProviderOrSigner(true);
      const myNftContract = new Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
      const nftminting = await myNftContract.mintNFT("0xaF09B9535E239AaDcC2B96331341647F84a3537f");
      alert("NFT Minted")


    } catch (err) {
      console.error(err);
    }
  };


  const buyNFT = async () => {

    try {
      const signer = await getProviderOrSigner(true);
      const myNftContract = new Contract(DEPLOYED_CONTRACT_ADDRESS, abi, signer);
      const balance = await myNftContract.buyNFT(2,{
          gasPrice: utils.parseUnits("100", "gwei"),
          gasLimit: "99000",
          value: utils.parseEther("1"),
      });
      
      setBuyNF(balance);
      // console.log(balance);

    } catch (err) {
      console.error(err);
    }
  };


    
  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);



    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
     
      NFTname();
     
      balanceOf();
      NFTSymbol();
     
    }
  }, [walletConnected]);

  return (
    <div className="App">

      
      <h2> TokenName: {text} </h2>
      <h2> Symbol: {sym} </h2>
      `<h2>Number of minted NFT is {Balance} out of 100 </h2>`
     
     <button className="btn" onClick={mintnft}>Mint NFT</button>  <br />  <br />
     <button className="btn" onClick={buyNFT}>Buy NFT</button>
    </div>
  );
}
