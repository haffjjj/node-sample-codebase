import escapeRegExp from "escape-string-regexp"
import validation from "./validation"
import error from "../../../utils/error"

class stackUsecase {
  constructor(stackRepository) {
    this.stackRepository = stackRepository
  }

  /**
   * 
   * @param {Object} filter object { title }
   * @param {Int} sort 
   * @param {Int} skip 
   * @param {Int} limit 
   * @return {Object} stackGroup
   */
  async fetch(filter, sort, skip, limit){
    filter.search = escapeRegExp(filter.title.trim())
    return this.stackRepository.fetch(filter, sort, skip, limit)
  }

  /**
   * 
   * @param {String} id 
   * @return {Object} stack
   */
  async getById(id){
    const stack = this.stackRepository.getById(id)
    return stack
  }

  /**
   * 
   * @param {String} state 
   * @return {Object} stack
   */
  async getByState(state){
    const stack = this.stackRepository.getByState(state)
    return stack
  }

  /**
   * @param {Object} body object { title }
   * @return {String} stack id
   */
  async store(body){
    await validation.storeBody(body)

    const state = body.title.toUpperCase().replace(/ /g, '_')

    try{
      await this.getByState(state)
      throw new Error(error.message.duplicate)
    }
    catch(e){
      if (e.message !== error.notFound) throw(e)
    }

    body = {
      title: body.title,
      state: state
    }

    const result = await this.stackRepository.store(body)
    return result
  }

  /**
   * 
   * @param {String} id 
   * @param {Object} body 
   * @return {String} stack id
   */
  async update(id, body){
    await validation.updateBody(body)

    const stackById = await this.getById(id)
    if(!stackById) {
      throw new Error(error.message.notFound)
    }

    const state = body.title.toUpperCase().replace(/ /g, '_')

    const stackByState = await this.getByState(state)
    if(stackByState && state !== stackById.state){
      throw new Error(error.message.duplicate)
    }

    body = {
      title: body.title,
      state: state
    }

    const result = await this.stackRepository.update(id, body)
    return result
  }

  /**
   * 
   * @param {String} id 
   * @return {String} stack id
   */
  async delete(id){
    const stackById = await this.getById(id)
    if(!stackById) {
      throw new Error(error.message.notFound)
    }

    const result = await this.stackRepository.delete(id)
    return result
  }

}

export default stackUsecase