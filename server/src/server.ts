import {ServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: ServerApplication;
  private server: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new ServerApplication(options);
    // host lb4 @ /api
    this.app.use('/api', this.lbApp.requestHandler);
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
