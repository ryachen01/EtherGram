//imports
import React, { Component } from "react";
import TokenContract from "../../contracts/MyToken.json";
import "./Purchase.css"

class TokenPurchase extends Component{

  //initialize web3 to connect with smart contracts and wallets
  state = {web3: null, accounts: null, contract: null, response:null};

  componentDidMount = async () => {

    try {

      const web3 = this.props.web3;

      const accounts = this.props.accounts;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TokenContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TokenContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({web3, accounts, contract: instance}, this.runOnStart);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runOnStart = async () => {
    const { accounts, contract } = this.state;

    const response = await contract.methods.balanceOf(accounts[0]).call();

    this.setState({ storageValue: (response/1000000000000000000)});

  };

  buyCoins = async () => {
    //Purchase Tokens
    const { accounts, contract } = this.state;
    const amount = document.getElementById("Value").value;
    await contract.methods.buy().send({from: accounts[0], value: (1e18 * amount), gasPrice: 1e9});
    const total = await contract.methods.totalSupply().call();
    console.log(total);

  };

  updateValue = async () => {
    //Conversion between Ether to ERC20 Token
    const amount = document.getElementById("Value").value;
    const tokenValue = amount * 2000;
    document.getElementById("Token Value").value = tokenValue;

  }

  getEthAmount = async () => {
    //Conversion between Ether to ERC20 Token
    const amount = document.getElementById("Token Value").value;
    const tokenValue = amount/2000;
    document.getElementById("Value").value = tokenValue;

  }



    render(){

        return (

        <div className = "Buy">


      <h1> Buy Tokens! </h1>

      <div>Your Token Balance is: {this.state.storageValue}</div>

      <p> </p>


      Amount in Ether: <input type="text" onChange = {this.updateValue} id = "Value"></input>
      <button onClick = {this.buyCoins} id = "Buy" >Purchase Coins</button>
      <p> </p>
      Amount in Tokens: <input type="text" id = "Token Value" defaultValue = "0" onChange = {this.getEthAmount}></input>
      <p> Token address: 0xc47763cd25154fD25B0CCaF0b03d48165CC850ee </p>

        </div>

        );

      }

    }

export default TokenPurchase;
