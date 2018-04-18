import React from 'react'
import { shallow } from 'enzyme'
import PhoneItem from './PhoneItem'

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

beforeEach( () => {
    mockOnChange = jest.fn()
    mockOnDelete = jest.fn()
    phoneItem = <PhoneItem 
    onChange={mockOnChange}
    onDelete={mockOnDelete}
    index={0}
    types={["Work", "Mobile"]}
    availableTypes={["Mobile"]}
    type="Work"
    number="476887251"
/>
})
describe('PhoneItem', () => {
    
    it("Render correctly", () => {
        expect(shallow(phoneItem)).toMatchSnapshot()  
    })

    it("should call onDelete when delete button is pressed", () => {
        const wrapper = shallow(phoneItem)
        wrapper.find('button').simulate("click")
        expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    it("should render only 2 options", () => {
      
        const wrapper = shallow(phoneItem)
        expect(wrapper.find('option')).toHaveLength(2)
    })

    it("option with value Work should be disabled", () => {
        const wrapper = shallow(phoneItem)
        expect(
            wrapper.find('option[value="Work"]').prop("disabled")
        ).toBeTruthy()
    })
    it("option with value Mobile should be disabled", () => {
        const wrapper = shallow(phoneItem)
        expect(
            wrapper.find('option[value="Mobile"]').prop("disabled")
        ).toBeFalsy()
    })

    it("should call mockOnChange when changing select option", ()=> {
        const wrapper = shallow(phoneItem)
        wrapper.find('select').simulate('change',{target:{value:'Mobile'}})
        expect(mockOnChange).toBeCalledWith("Mobile", 0, "type")
    })

    it("should call mockOnChange when changing input text", ()=> {
        const wrapper = shallow(phoneItem)
        wrapper.find('input').simulate('change',{target:{value:'3548321'}})
        expect(mockOnChange).toBeCalledWith("3548321", 0, "number")
    })

    it("should call mockOnChange with only numerical values", ()=> {
        const wrapper = shallow(phoneItem)
        wrapper.find('input').simulate('change',{target:{value:'123456789hgsj'}})
        expect(mockOnChange).toBeCalledWith("123456789", 0, "number")
    })
    
})