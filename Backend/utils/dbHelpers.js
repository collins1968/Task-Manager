import sql from 'mssql';
import config from '../db/config.js'

export class Connection {
  pool;
  constructor() {
    this.pool = this.getConnection(); //When this class is instantiated we call getConnection immediately
  }

  //   Creates the connection=>Function connecting to db
  getConnection() {
    const pool = sql.connect(config.sql);
    return pool;
  }

  // Insert/Add params in the request
  createRequest(request, params) {
    for (const key in params) {
      request.input(key, params[key]);
    }
    return request;
  }

  //   We will call this function through this class whenever we want to query using a procedure
  async executeProcedure(procedureName, params) {
    let pool = await this.pool;
    let request = pool.request();
    params ? (request = this.createRequest(request, params)) : request;
    return await request.execute(procedureName);
  }

  //   We will call this function whenever we want query prefferably with a simple query
  async executeQuery(query, params) {
    const request = (await this.pool).request();
    params ? (request = this.createRequest(request, params)) : request;
    return await request.query(query)
  }
}