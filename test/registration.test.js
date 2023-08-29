import assert from "assert"
import registration  from "../registration.js";

describe("Registration number factory function tests", function(){
    it("should be able to set and get registration number CA74664", function(){
        var regNumbers = registration()
        regNumbers.setRegistration("CA74664")
        assert.equal("CA74664", regNumbers.getRegistration())
    })
    it("should be able to check the location for registration number GP77B152 and return GP", function(){
        var regNumbers = registration()
        regNumbers.setRegistration("GP77B152")
        assert.equal("GP", regNumbers.checklocIndicator("GP77B152"))
    })
    it("should be able to get the list of registration numbers ['CA5587']", function(){
        var regNumbers = registration()
        regNumbers.setRegistration("CA5587")
        regNumbers.errors("CA5587")
        assert.deepEqual(['CA5587'], regNumbers.getAllRegistrations("CA5587"))
    })
    it("should be not able to set and get registration number CJ12%^& as it contains special characters" , function(){
        var regNumbers = registration()
        regNumbers.setRegistration("CJ12%^&")
        assert.equal("", regNumbers.getAllRegistrations())
    })
    it("should be not able to set and get registration number CA1234 twice" , function(){
        var regNumbers = registration()
        regNumbers.setRegistration("CA1234")
        regNumbers.getAllRegistrations()
        regNumbers.setRegistration("CA1234")
        regNumbers.getAllRegistrations()
        assert.equal("CA1234", regNumbers.getAllRegistrations())
    })
    it("should be not able to return Please enter valid registration number when registration number is not" , function(){
        var regNumbers = registration()
        regNumbers.setRegistration("CA!64")
        regNumbers.getAllRegistrations()
        regNumbers.getAllRegistrations()
       
        assert.equal("Please enter valid registration number!", regNumbers.errors())
    })
})