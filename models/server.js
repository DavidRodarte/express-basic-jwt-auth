const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT 

    this.userPath = '/api/user'
    this.authPath = '/api/auth'
    
    // Connect to database 
    this.dbConnect()
    // Middlewares
    this.middlewares()
    // Routes 
    this.routes()
  }

  async dbConnect() {
    await dbConnection()
  }

  middlewares() {
    // Use json
    this.app.use( express.json() )
    // Use cors
    this.app.use(cors())
  }

  routes() {
    this.app.use( this.userPath, require('../routes/user') )
    this.app.use( this.authPath, require('../routes/auth') )
  }

  listen() {
    this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`))
  }
}

module.exports = Server
