import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import SocialNetwork from "../abis/SocialNetwork.json";
import Navbar from "./Navbar";

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
      console.log("accounts", accounts);
      this.setState({ account: accounts[0] });
      //Network ID
      const networkId = await web3.eth.net.getId();
      const networkData = SocialNetwork.networks[networkId];
      console.log("networkId", networkId);
      if (networkData) {
        const socialNetwork = web3.eth.Contract(
          SocialNetwork.abi,
          networkData.address
        );
        this.setState({ socialNetwork });
        console.log("socialNetwork", socialNetwork);

        const postCount = await socialNetwork.methods.postCount().call();
        this.setState({ postCount });
        console.log("postCount", postCount);

        //load Post
        for (var i = 1; i <= postCount; i++) {
          const post = await socialNetwork.methods.posts(i).call();
          this.setState({
            posts: [...this.state.posts, post]
          });
        }
        console.log("posts", { posts: this.state.posts });
      } else {
        window.alert(
          "Social Netowrk contract not deployed to detected network"
        );
      }
    } else {
      window.alert(
        "Non-Ethereum Wallet detected. Can't read the address! Please instead a Ethereum Wallet. You should consider trying MetaMask."
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      socialNetwork: null,
      postCount: 0,
      posts: []
    };
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "500px" }}
            >
              <div className="content mr-auto ml-auto">
                <h1>CAN Social Network</h1>
                {this.state.posts.map((post, key) => {
                  return (
                    <div className="card mb-4" key={key}>
                      <div className="card-header">
                        <small className="text-muted">Post Header</small>
                      </div>
                      <ul id="postList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p>Post Body</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <p>Post Footer</p>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
