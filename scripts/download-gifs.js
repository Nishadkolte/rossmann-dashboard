// scripts/download-gifs.js
// Run once: node scripts/download-gifs.js
// Downloads GIFs into /public/gifs/ so they load reliably

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const dir = path.join(__dirname, '../public/gifs');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const gifs = [
  { name: 'idle.gif',      url: 'https://media.giphy.com/media/13Uqp5IGFpmDle/giphy.gif' },
  { name: 'excited.gif',   url: 'https://media.giphy.com/media/MBU1IKPY441Q4/giphy.gif'  },
  { name: 'thinking.gif',  url: 'https://media.giphy.com/media/j1AeED5w0xmVy/giphy.gif'  },
  { name: 'analytics.gif', url: 'https://media.giphy.com/media/jG186kNLKs6TS/giphy.gif'  },
  { name: 'error.gif',     url: 'https://media.giphy.com/media/R548B8WxpUTsI/giphy.gif'  },
  { name: 'store.gif',     url: 'https://media.giphy.com/media/j1AeED5w0xmVy/giphy.gif'  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'Referer': 'https://giphy.com/' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => { fs.unlinkSync(dest); reject(err); });
  });
}

(async () => {
  for (const gif of gifs) {
    const dest = path.join(dir, gif.name);
    console.log(`Downloading ${gif.name}...`);
    try {
      await download(gif.url, dest);
      console.log(`✅ ${gif.name} saved`);
    } catch (e) {
      console.error(`❌ ${gif.name} failed:`, e.message);
    }
  }
  console.log('\n✅ All done! GIFs saved to /public/gifs/');
  console.log('Now update ChatBot.tsx to use /gifs/idle.gif etc.');
})();
