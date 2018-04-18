import React, { Component } from "react";
import PropTypes from 'prop-types'
import PhoneItem from "./PhoneItem";

const defaultPhone = {
  number: "",
  type: "Home"
};

class PhoneList extends Component {
  

  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: ""
  }

  state = {
    types: ["Home", "Mobile", "Work", "Other"],
    phones: [defaultPhone]
  };


  // returns an array of strings with the phone types not used in the phones state
  getAvailableTypes = () => 
     this.state.types.filter(
      type => !this.state.phones.some(phone => phone.type === type)
    );
  

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

  handleItemDelete = phoneIndex => {
    const phones = this.state.phones.length === 1
      ? [defaultPhone]
      : [
          ...this.state.phones.slice(0, phoneIndex),
          ...this.state.phones.slice(phoneIndex + 1)
        ];

    this.setState({
      phones
    });
  };

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
              key={p.number}
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
          <button onClick={this.logPhones} className="button">Log</button>
          <button onClick={this.addNewPhone} className="button button-primary">Add Another</button>
        </div>
      </div>
    );
  }
}

export default PhoneList;
