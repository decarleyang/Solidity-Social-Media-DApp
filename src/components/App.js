import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlochainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlochainData() {
    if (window.ethereum) {
      const web3 = window.web3;
      //Load account
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      this.setState({ account: accounts[0] });
    } else {
      window.alert("Non-Ethereum Wallet detected. Can't read the address!");
    }
  }

  constructor(props) {
    super(props);
    this.state = { account: "" };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            CAN Social Network
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-nome d-sm-block">
              <small id="acount" className="font-wh">
                Your Address: {this.state.account}
              </small>
              {this.props.acount ? (
                <img
                  className="ml-2"
                  width="30"
                  height="30"
                  src={
                    "data:image/png;base64,${new Identicon(this.props.acount, 30).toString()}"
                  }
                />
              ) : (
                <span></span>
              )}
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a href="#" target="_blank" rel="noopener noreferrer"></a>
                <h1>CAN Social Network</h1>
                <p></p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
