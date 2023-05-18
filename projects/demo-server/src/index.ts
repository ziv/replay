import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';

const randomData = () => {
  const keys = ['foo', 'bar', 'zug', 'dan', 'key'];
  const values = [1, 2, 3, 4, 5, 6, 7, 9, new Date(), 'test', 'some data'];
  const len = Math.floor((Math.random() * 5));
  const data: Record<string, unknown> = {};
  for (let i=0 ; i<len ; ++i) {
    data[keys[i]] = values[Math.floor((Math.random() * 11))];
  }
  return JSON.stringify(data);
};

const handler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(randomData());
};

createServer(handler).listen(3003);
