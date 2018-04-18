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
            />
          ))}
        </div>
        <div>
          <button>Log</button>
          <button>Add Another</button>
        </div>
      </div>
    );
  }
}

export default PhoneList;
