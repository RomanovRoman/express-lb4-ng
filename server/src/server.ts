import {ServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as fs from 'fs';
import * as graphqlHTTP from 'express-graphql';
import {createGraphQlSchema} from 'oasgraph';

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: ServerApplication;
  private server: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new ServerApplication(options);
    // host lb4 @ /api
    this.app.use('/api', this.lbApp.requestHandler);

    // mounting graphql endpoint using the middleware express-graphql

    // can we obtain openapi.json from lbApp?  .getApiSpec() is empty at this point
    // openapi.json manually placed
    const myschema = JSON.parse(
      fs.readFileSync(path.resolve('./bin/openapi.json'), 'utf8'),
    );
    createGraphQlSchema(myschema, {
      strict: false,
      viewer: true,
      addSubOperations: true,
      fillEmptyResponses: true,
    })
      .then(({schema}) => {
        this.app.use(
          '/graphql',
          graphqlHTTP({
            schema: schema,
            graphiql: true,
          }),
        );
      })
      .catch(err => {
        console.log('graphql creation event error: ', err.message);
      });

    // host angular files
    this.app.use(express.static(path.resolve('./dist/public')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host || '127.0.0.1';
    this.server = this.app.listen(port, host);
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    this.server.close();
  }
}
