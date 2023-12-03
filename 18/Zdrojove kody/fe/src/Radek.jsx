import { React, Component } from "react";
import "./Tabulka.css";
import testznak from "./testznak.jpg";
import nic from "./nic.png";

class Radek extends Component {
  state = {
    pic_url: "../public/testznak.jpg",
  };

  render() {
    return (
      <div className={"radek " + this.props.mod}>
        <div
          style={{
            width: "50px",
            aspectRatio: "1/1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={this.props.znak === "nic.png" ? nic : testznak}
            alt="znak_obce"
            className="znak"
          />
        </div>
        <div className="radek-flex">
          <div className="h3holder">
            <h3
              style={{
                fontWeight: this.props.bold ?? true ? "bold" : "normal",
              }}
            >
              {this.props.jmeno}
            </h3>
          </div>
          <div className="h3holder">
            <h3
              style={{
                fontWeight: this.props.bold ?? true ? "bold" : "normal",
              }}
            >
              {this.props.obyvatele}
            </h3>
          </div>
          <div className="h3holder">
            <h3
              style={{
                fontWeight: this.props.bold ?? true ? "bold" : "normal",
              }}
            >
              {this.props.index}
            </h3>
          </div>
        </div>
        <div className={"kolecko " + this.props.gucciK}></div>
      </div>
    );
  }
}

export default Radek;
