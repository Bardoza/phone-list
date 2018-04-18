import React, { Component } from "react";

class PhoneItem extends Component {
  onTypeChange = e => {
    this.props.onChange(e.target.value, this.props.index, "type");
  };

  onNumberChange = e => {
    this.props.onChange(
      e.target.value.replace(/\D/, ""),
      this.props.index,
      "number"
    );
  };
  onDelete = e => {
    this.props.onDelete(this.props.index);
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
        <button onClick={this.onDelete}>x</button>
      </div>
    );
  }
}

export default PhoneItem;
