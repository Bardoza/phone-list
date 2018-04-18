import React, { Component } from "react";
import PhoneItem from "./PhoneItem";

class PhoneList extends Component {
  state = {
    types: ["Home", "Mobile", "Work", "Other"],
    phones: [
      {
        number: "4777153366",
        type: "Work"
      }
    ]
  };

  getAvailableTypes = () => {
    return this.state.types.filter(
      type => !this.state.phones.some(phone => phone.type === type)
    );
  };

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

  onChange = (newValue, phoneIndex, field = "type") => {
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

  onDelete = phoneIndex => {
    const phone = this.state.phones[phoneIndex];
    this.setState({
      phones: [
        ...this.state.phones.slice(0, phoneIndex),
        ...this.state.phones.slice(phoneIndex + 1)
      ]
    });
  };

  logPhones = () => {
    console.table(this.state.phones);
  };

  render() {
    const availableTypes = this.getAvailableTypes();
    return (
      <div>
        <div className="phone-container">
          {this.state.phones.map((p, ix) => (
            <PhoneItem
              key={ix}
              index={ix}
              {...p}
              types={this.state.types}
              availableTypes={availableTypes}
              onChange={this.onChange}
              onDelete={this.onDelete}
            />
          ))}
        </div>
        <div>
          <button onClick={this.logPhones}>Log</button>
          <button onClick={this.addNewPhone}>Add Another</button>
        </div>
      </div>
    );
  }
}

export default PhoneList;
