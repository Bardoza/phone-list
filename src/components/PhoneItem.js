import React, { Component } from "react";

class PhoneItem extends Component {
  onTypeChange = e => {
    this.props.onChange(e.target.value, this.props.index, "type");
  };

  onNumberChange = e => {
    this.props.onChange(e.target.value, this.props.index, "number");
  };
  render() {
    return (
      <div>
        <select value={this.props.type} onChange={this.onTypeChange}>
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
        <input
          type="text"
          value={this.props.number}
          onChange={this.onNumberChange}
        />
        <button>x</button>
      </div>
    );
  }
}

export default PhoneItem;
