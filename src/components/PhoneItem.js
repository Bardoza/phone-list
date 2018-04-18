import React, { Component } from "react";
import PropTypes from "prop-types";

class PhoneItem extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  };

  onTypeChange = e => {
    this.props.onChange(e.target.value, this.props.index, "type");
  };

  onNumberChange = e => {
    const number = e.target.value.replace(/\D/gi, "");
    if (number.length > 15) {
      return;
    }

    this.props.onChange(number, this.props.index, "number");
  };

  onDelete = () => this.props.onDelete(this.props.index);

  render() {
    return (
      <div className="phone-item">
        <div className="type-container">
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
        </div>
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
