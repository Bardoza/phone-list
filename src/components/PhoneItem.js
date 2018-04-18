import React, { Component } from "react";

class PhoneItem extends Component {
  render() {
    return (
      <div>
        <select value={this.props.type} onChange={() => {}}>
          {this.props.types.map(type => (
            <option
              key={type}
              value={type}
              disabled={!this.props.availableTypes.some(t => t === type)}
            >
              {type}
            </option>
          ))}
        </select>
        <input type="text" value={this.props.number} onChange={() => {}} />
        <button>x</button>
      </div>
    );
  }
}

export default PhoneItem;
