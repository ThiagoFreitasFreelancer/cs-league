import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';
import { renderApplication } from '@angular/platform-server';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  // Serve static files from /browser
  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    renderApplication(bootstrap, {
      document: indexHtml,
      url: req.originalUrl,
      platformProviders: [
        { provide: APP_BASE_HREF, useValue: req.baseUrl || '/' }
      ]
    })
      .then((html: string) => res.send(html))
      .catch((err: unknown) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  const listener = server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });

  listener.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Please use a different port.`);
      process.exit(1);
    } else {
      throw err;
    }
  });
}

run();
