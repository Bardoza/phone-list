import React from 'react'
import { shallow } from 'enzyme'
import PhoneList, { defaultPhone } from './PhoneList';

/**
 *  Proptypes
 *  title: PropTypes.string,
 */

let phoneList;




beforeEach( () => {
    phoneList = <PhoneList title="List 1" />

})
describe('phoneList', () => {
    
    it("Render correctly", () => {
        expect(shallow(phoneList)).toMatchSnapshot()  
    })

    it("should set defautl state on init", () =>{
        const wrapper = shallow(phoneList)
        expect(wrapper.state().phones).toEqual([defaultPhone])
    })


    it("should return an array with the unused phone types", () =>{
        const wrapper = shallow(phoneList)
        const inst = wrapper.instance()
        wrapper.setState({
            phones: [{
                type:"Work",
                number:"47736541234"
            }]
        })
        expect(inst.getAvailableTypes()).toEqual([
            'Home','Mobile', "Other"
        ])
    })
    
    it("should render the footer  buttons", () => {
        const wrapper = shallow(phoneList)
        expect(wrapper.find(".button")).toHaveLength(2)
    })
    
    it("should add a new phone to the list", () => {
        const wrapper = shallow(phoneList)
        expect(wrapper.find("PhoneItem")).toHaveLength(1)
        wrapper.find('.button-primary').simulate("click")
        expect(wrapper.find("PhoneItem")).toHaveLength(2)
    })
    
    
    
    it("should not add a new phone if there are no free types", () =>{
        const wrapper = shallow(phoneList)
        wrapper.setState({
            phones: [{
                type:"Home",
                number: "48726345397"
            },{
                type:"Work",
                number:"47736541234"
            },
            {
                type:"Mobile",
                number:"4498736162"
            },
            {
                type:"Other",
                number:"4773971635"
            }]
        })

        expect(wrapper.find("PhoneItem")).toHaveLength(4)
        wrapper.find('.button-primary').simulate("click")
        expect(wrapper.find("PhoneItem")).toHaveLength(4)


    })
    
})