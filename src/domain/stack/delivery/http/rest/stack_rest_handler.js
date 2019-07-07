import error from "../../../../../utils/error"

class stackRestHandler {
  constructor(stackUsecase, e) {
    this.stackUsecase = stackUsecase
  
    //query
    e.get("/stacks", this.fetch.bind(this))

    //mutation
  }

  async fetch(req, res){
    const stacks = this.stackUsecase.fetch()

    res.send(await stacks)
  }

}

export default stackRestHandler