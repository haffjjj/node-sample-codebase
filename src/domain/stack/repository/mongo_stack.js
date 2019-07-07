import model from "./mongo_stack_model"
import mgoSortHelper from "../../../utils/mongo_sort_helper"
import error from "../../../utils/error"

class mongoStackRepository {
  constructor(mgo) {
    this.Stack = model(mgo)
  }

  /**
   * 
   * @param {Object} filter object { title }
   * @param {Int} sort 
   * @param {Int} skip 
   * @param {Int} limit 
   * @return {Object} stackGroup
   */
  async fetch(filter, sort = "", skip = 0, limit = 1000){
    let matchByTitle = {}
    if(filter.title && filter.title.length > 0) {
      matchByTitle = {
        title: new RegExp(filter.search, 'i')
      }
    }

    const stackGroup = await this.Stack.aggregate([
      { $match: matchByTitle },
      { $project: { id: "$_id", title: 1, state: 1 } },
      {
        $group: {
          _id: null,
          count:  { $sum: 1 },
          data: { $push: "$$ROOT" }
        }
      },
      { $unwind: "$data" },
      { $replaceRoot: { newRoot: { $mergeObjects: ["$data", "$$ROOT"] }} },
      { $sort: mgoSortHelper(sort, { id: 1 }) },
      { $skip: skip },
      { $limit: limit },
      { $group: { _id: null, count: { $first: "$count" }, data: { $push: "$data" } } }
    ])

    return stackGroup[0]
  }

  /**
   * 
   * @param {String} id 
   * @return {String} stack id
   */
  async getById(id){
    if(!this.mgo.Types.ObjectId.isValid(id)){
      throw new Error(error.message.notFound)
    }

    const stack = await this.Stack.findOne({
      _id: id
    })

    if(!stacl){
      throw new Error(error.message.notFound)
    }
    return stack
  }

  /**
   * 
   * @param {String} state 
   * @return {String} stack id
   */
  async getByState(state){
    const stack = await this.Stack.findOne({
      state: state
    })

    if(!stack){
      throw new Error(error.message.notFound)
    }

    return stack
  }

  /**
   * 
   * @param {Object} body object { title, state }
   * @return {String} stack id
   */
  async store(body){
    body = {
      title: body.title,
      state: body.state
    }
    const newStack = new this.Stack(body)
    await newStack.save()

    return newStack.id
  }

  /**
   * 
   * @param {String} id 
   * @param {Object} body 
   * @return {String} return stack id
   */
  async update(id, body){
    if(!this.mgo.Types.ObjectId.isValid(id)){
      throw new Error(error.message.notFound)
    }

    body = {
      title: body.title,
      state: body.state
    } 

    await this.Stack.updateOne({
      _id: id
    }, {
      $set: body
    }, { 
      new: true
    })

    return id
  }

  /**
   * 
   * @param {String} id 
   * @return {String} stack id
   */
  async delete(id){
    if(!this.mgo.Types.ObjectId.isValid(id)){
      return null
    }

    await this.Stack.deleteOne({
      _id: id
    })

    return id
  }
}

export default mongoStackRepository