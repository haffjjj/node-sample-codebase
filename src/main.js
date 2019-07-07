import "dotenv/config"
import _express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import mongoInit from "./utils/mongo_init"
import sentryInit from "./utils/sentry_init"
import logger from "./utils/logger"
import _gqlServer from "./utils/gql_server"

//Stack
import _stackHttpRestHandler from "./domain/stack/delivery/http/rest/stack_rest_handler"
import _stackHttpGqlHandler from "./domain/stack/delivery/http/graphql/stack_gql_handler"
import _stackUsecase from "./domain/stack/usecase/stack_ucase"
import _stackRespository from "./domain/stack/repository/mongo_stack"

class main{
  constructor(){
    this.main()
  }

  async init(){
    try{
      //init mongodb
      await sentryInit()
      await mongoInit(mongoose)
    }
    catch(e){
      logger("error", "main-init", "error init", e.stack)
    }
  }

  async main() {
    try{
      await this.init()
      const express = _express()
      express.use(bodyParser.json())
      express.use(bodyParser.urlencoded({
        extended: true
      }))

      // ### Domain ###
      const stackRespository = new _stackRespository(mongoose)  
      const stackUsecase = new _stackUsecase(stackRespository)
      new _stackHttpRestHandler(stackUsecase, express)
      const stackHttpGqlHandler = new _stackHttpGqlHandler(stackUsecase)
      // ###

      // regist graphql handler
      const gqlServer = _gqlServer(
        stackHttpGqlHandler
      )
      gqlServer.applyMiddleware({ app: express })
      express.listen(process.env.port, () => console.log(`app listening on port ${process.env.port}!`))
    }
    catch(e){
      logger("error", "main-main", "error main", e.stack)
    }
  }
}

new main()