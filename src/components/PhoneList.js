import React, { Component } from "react";
import PropTypes from "prop-types";
import PhoneItem from "./PhoneItem";

export const defaultPhone = {
  number: "",
  type: "Home"
};

/**
 *  Renders a list of PhoneItems and allows to add, edit and delete the numbers
 */

class PhoneList extends Component {
  static propTypes = {
    title: PropTypes.string // Optional title for the Phone List
  };

  static defaultProps = {
    title: ""
  };

  state = {
    types: ["Home", "Mobile", "Work", "Other"], // Array of phone types
    phones: [defaultPhone] // Default phone object
  };

  /**
   *  returns an array of strings with the phone types not used in the phones state
   */
  getAvailableTypes = () =>
    this.state.types.filter(
      type => !this.state.phones.some(phone => phone.type === type)
    );

  /**
   * Adds a new row to the list if there are any phone type not in use already
   */
  addNewPhone = () => {
    const availableTypes = this.getAvailableTypes();

    if (!availableTypes.length) {
      alert("You have use all the available phone types");
      return;
    }

    const newPhone = {
      number: "",
      type: availableTypes[0]
    };

    this.setState({
      phones: [...this.state.phones, newPhone]
    });
  };

  /**
   *  Edit a custom field on the phone object
   *  @param {string|integer} newValue - the new value to change on the phone
   *  @param {integer} phoneIndex - the index of the phone to edit
   *  @param {string} field - the custom field to change the value
   */
  handleItemChange = (newValue, phoneIndex, field = "type") => {
    const phone = this.state.phones[phoneIndex];
    this.setState({
      phones: [
        ...this.state.phones.slice(0, phoneIndex),
        {
          ...phone,
          [field]: newValue
        },
        ...this.state.phones.slice(phoneIndex + 1)
      ]
    });
  };

  /**
   * Removes a phone from the array
   * @param {integer} phoneIndex - Index of the phone to be removed
   */
  handleItemDelete = phoneIndex => {
    const phones =
      this.state.phones.length === 1
        ? [defaultPhone]
        : [
            ...this.state.phones.slice(0, phoneIndex),
            ...this.state.phones.slice(phoneIndex + 1)
          ];

    this.setState({
      phones
    });
  };

  /**
   * Logs the current phone state to the console
   */
  logPhones = () => {
    console.table(this.state.phones); // eslint-disable-line
  };

  render() {
    const availableTypes = this.getAvailableTypes();
    return (
      <div className="phone-container">
        <h3>{this.props.title}</h3>
        <div className="phone-list">
          {this.state.phones.map((p, ix) => (
            <PhoneItem
              key={`${p.type}`}
              index={ix}
              {...p}
              types={this.state.types}
              availableTypes={availableTypes}
              onChange={this.handleItemChange}
              onDelete={this.handleItemDelete}
            />
          ))}
        </div>
        <div className="phone-footer">
          <button onClick={this.logPhones} className="button">
            Log
          </button>
          <button onClick={this.addNewPhone} className="button button-primary">
            Add Another
          </button>
        </div>
      </div>
    );
  }
}

export default PhoneList;
