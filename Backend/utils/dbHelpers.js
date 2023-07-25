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

  //  We will call this function through this class whenever we want to query using a procedure
  async executeProcedure(procedureName, params) {
    let pool = await this.pool;
    let request = pool.request();
    params ? (request = this.createRequest(request, params)) : request;
    return await request.execute(procedureName);
  }

  async executeProcedureWithOutput(procedureName, params) {
    let pool = await this.pool;
    let request = pool.request();
    // If parameters are provided, create the request with parameters
    if (params) {
      request = this.createRequest(request, params);
      // Add an OUTPUT parameter to store the task_id
      request.output('task_id', sql.Int);
    }
    // Execute the stored procedure
    const result = await request.execute(procedureName);
    // Get the task_id from the OUTPUT parameter
    const task_id = result.output.task_id;
    return task_id;
  }

  //   We will call this function whenever we want query prefferably with a simple query
  async executeQuery(query, params) {
    const request = (await this.pool).request();
    params ? (request = this.createRequest(request, params)) : request;
    return await request.query(query)
  }
}