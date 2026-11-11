const fs = require('fs');
const path = require('path');
const https = require('https');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data.replace(/^\uFEFF/, '')));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading verse.json...');
  const verseRaw = await download('https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/verse.json');
  const verses = JSON.parse(verseRaw);
  console.log(`Success! Total verses downloaded: ${verses.length}`);

  console.log('Downloading translation.json...');
  const transRaw = await download('https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/translation.json');
  const translations = JSON.parse(transRaw);
  console.log(`Success! Total translations: ${translations.length}`);

  console.log('Downloading commentary.json...');
  const commRaw = await download('https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/commentary.json');
  const commentaries = JSON.parse(commRaw);
  console.log(`Success! Total commentaries: ${commentaries.length}`);

  const rawDir = path.join(__dirname, '..', 'data', 'raw');
  if (!fs.existsSync(rawDir)) fs.mkdirSync(rawDir, { recursive: true });

  fs.writeFileSync(path.join(rawDir, 'verse.json'), verseRaw);
  fs.writeFileSync(path.join(rawDir, 'translation.json'), transRaw);
  fs.writeFileSync(path.join(rawDir, 'commentary.json'), commRaw);

  console.log('All raw data files saved successfully!');
}

run().catch(err => {
  console.error('Download error:', err);
  process.exit(1);
});
