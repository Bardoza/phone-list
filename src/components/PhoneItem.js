import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 *  Renders a simple phone number with a select field to change the phone type and a delete button
 */

class PhoneItem extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired, // Function to be called when there is a change in the phone type or phone number
    index: PropTypes.number.isRequired, // Index of the current number on the parent state array
    onDelete: PropTypes.func.isRequired, // Function to be called when the delete button is pressed
    types: PropTypes.arrayOf(PropTypes.string).isRequired, // array of all phone types
    availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired, // array of all available phone types
    type: PropTypes.string.isRequired, // the type of the current phone
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired // the number of the current form
  };

  /**
   * Calls the onChange props with the component index and current value from the select
   */
  onTypeChange = e => {
    this.props.onChange(e.target.value, this.props.index, "type");
  };

  /**
   * Validate the phhone number and calls the onChange props with the current value and index
   */
  onNumberChange = e => {
    const number = e.target.value.replace(/\D/gi, "");
    if (number.length > 15) {
      return;
    }

    this.props.onChange(number, this.props.index, "number");
  };

  onDelete = () => this.props.onDelete(this.props.index);

  render() {
    const isFirstChild = this.props.index === 0;
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
          className={isFirstChild ? "first" : ""}
        />
        {!isFirstChild && <button onClick={this.onDelete}>x</button>}
      </div>
    );
  }
}

export default PhoneItem;
