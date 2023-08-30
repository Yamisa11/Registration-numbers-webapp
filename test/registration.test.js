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
  
})