import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import "./App.css";
import CreateAccount from "./components/CreateAccount"
import Header from "./components/Header"

class NewAccount extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, address: null};



  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts});
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };




  render() {


    if (!this.state.web3) {



      return <div>Loading Web3, accounts, and contract...</div>;


    }
    return (
      <div className="App">
      <Header web3 = {this.state.web3} accounts = {this.state.accounts} address = {this.state.address}/>
      <CreateAccount web3 = {this.state.web3} accounts = {this.state.accounts}/>


      </div>
    );
  }
}

export default (NewAccount);
