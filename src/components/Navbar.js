import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  render() {
    return (
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
              Your Address: {this.props.account}
            </small>
            {this.props.acount ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={
                  "data:image/png,base64,${new Identicon(this.props.acount, 30).toString()}"
                }
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
