import {Client, expect} from '@loopback/testlab';
import {ExpressServer} from '../../server';
import {setupExpressApplication} from './test-helper';

describe('PingController', () => {
  let server: ExpressServer;
  let client: Client;

  before('setupApplication', async () => {
    ({server, client} = await setupExpressApplication());
  });

  after(async () => {
    await server.stop();
  });

  it('invokes GET /ping', async () => {
    const res = await client.get('/ping?msg=world').expect(200);
    expect(res.body).to.containEql({greeting: 'Hello from LoopBack'});
  });
});
