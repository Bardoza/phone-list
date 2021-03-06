import React from "react";
import { shallow } from "enzyme";
import PhoneItem from "./PhoneItem";

/**
 *  Proptypes
 *  onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string).isRequired,
    availableTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
 */

let phoneItem;
let mockOnChange;
let mockOnDelete;

beforeEach(() => {
  mockOnChange = jest.fn();
  mockOnDelete = jest.fn();
  phoneItem = (
    <PhoneItem
      onChange={mockOnChange}
      onDelete={mockOnDelete}
      index={1}
      types={["Work", "Mobile"]}
      availableTypes={["Mobile"]}
      type="Work"
      number="476887251"
    />
  );
});
describe("PhoneItem", () => {
  it("Render correctly", () => {
    expect(shallow(phoneItem)).toMatchSnapshot();
  });

  it("should call onDelete when delete button is pressed", () => {
    const wrapper = shallow(phoneItem);
    wrapper.find("button").simulate("click");
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("should render only 2 options", () => {
    const wrapper = shallow(phoneItem);
    expect(wrapper.find("option")).toHaveLength(2);
  });

  it("option with value Work should be disabled", () => {
    const wrapper = shallow(phoneItem);
    expect(wrapper.find('option[value="Work"]').prop("disabled")).toBeTruthy();
  });
  it("option with value Mobile should be disabled", () => {
    const wrapper = shallow(phoneItem);
    expect(wrapper.find('option[value="Mobile"]').prop("disabled")).toBeFalsy();
  });

  it("should call mockOnChange when changing select option", () => {
    const wrapper = shallow(phoneItem);
    wrapper.find("select").simulate("change", { target: { value: "Mobile" } });
    expect(mockOnChange).toBeCalledWith("Mobile", 1, "type");
  });

  it("should call mockOnChange when changing input text", () => {
    const wrapper = shallow(phoneItem);
    wrapper.find("input").simulate("change", { target: { value: "3548321" } });
    expect(mockOnChange).toBeCalledWith("3548321", 1, "number");
  });

  it("should call mockOnChange with only numerical values", () => {
    const wrapper = shallow(phoneItem);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "123456789hgsj" } });
    expect(mockOnChange).toBeCalledWith("123456789", 1, "number");
  });

  it("should not call mockOnChange if the number is > 15 chars", () => {
    const wrapper = shallow(phoneItem);
    wrapper
      .find("input")
      .simulate("change", { target: { value: "9834567891234566" } });
    expect(mockOnChange).not.toBeCalled();
  });

  it("should  render the delete button if index !== 0", () => {
    const wrapper = shallow(phoneItem);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should not render the delete button if index === 0", () => {
    const wrapper = shallow(
      <PhoneItem
        onChange={mockOnChange}
        onDelete={mockOnDelete}
        index={0}
        types={["Work", "Mobile"]}
        availableTypes={["Mobile"]}
        type="Work"
        number="476887251"
      />
    );
    expect(wrapper.find("button")).toHaveLength(0);
  });

  it("should render the input text without first class", () => {
    const wrapper = shallow(phoneItem);
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    expect(wrapper.find('input[type="text"].first')).toHaveLength(0);
  });
  it("should render the input text with first class", () => {
    const wrapper = shallow(
      <PhoneItem
        onChange={mockOnChange}
        onDelete={mockOnDelete}
        index={0}
        types={["Work", "Mobile"]}
        availableTypes={["Mobile"]}
        type="Work"
        number="476887251"
      />
    );
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    expect(wrapper.find('input[type="text"].first')).toHaveLength(1);
  });
});
