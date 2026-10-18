import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: { baseURL: 'http://127.0.0.1:4173', headless: true },
  webServer: {
    command: "node -e \"const h=require('http'),f=require('fs'),p=require('path');h.createServer((q,s)=>{const u=q.url.split('?')[0],x=p.join('dist',u==='/'?'index.html':u);f.readFile(x,(e,d)=>{if(e){s.statusCode=404;s.end('404')}else{s.end(d)}})}).listen(4173,'127.0.0.1')\"",
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true
  }
});
