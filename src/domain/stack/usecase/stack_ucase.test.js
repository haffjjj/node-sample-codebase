// import sinon from "sinon"
import { expect } from "chai"

import _stackUcase from "./stack_ucase"

describe("stackUcase", () =>{
  describe("fetch", () => {
    const mockStackGroup = {
      data: [
        {
          title: "stack title",
          by: "stack by"
        }
      ],
      count: 1
    }

    it("success", async () => {
      const stackUcase = new _stackUcase({ 
        fetch: () => mockStackGroup
      })

      const filter = {
        title: "title"
      }
      const sort = "_id 1"
      const skip = 1
      const limit = 1

      const result = await stackUcase.fetch(filter, sort, skip, limit)
      expect(result).to.deep.equal(mockStackGroup)
    })

    it("error_failed", async () => {
      const stackUcase = new _stackUcase({ 
        fetch: () => { throw new Error("error") }
      })

      const filter = {
        title: "title"
      }
      const sort = "_id 1"
      const skip = 1
      const limit = 1
      try{
        await stackUcase.fetch(filter, sort, skip, limit)
      }
      catch(e){
        expect(e.message).to.eql("error")
      }
    })

  })

  describe("getById", () => {
    const mockStack = {
      title: "stack title",
      by: "stack by"
    }

    it("success", async () => {
      const stackUcase = new _stackUcase({ 
        getById: () => mockStack
      })

      const id = "123456"
      const result = await stackUcase.getById(id)

      expect(result).to.deep.equal(mockStack)
    })

    it("error_failed", async () => {
      const stackUcase = new _stackUcase({ 
        getById: () => { throw new Error("error") }
      })

      const id = "123456"
      try{
        await stackUcase.getById(id)
      }
      catch(e){
        expect(e.message).to.eql("error")
      }
    })

  })

})