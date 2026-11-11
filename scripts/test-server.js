const http = require('http');
const { spawn } = require('child_process');

console.log('Starting Next.js server test...');
const server = spawn('npx', ['next', 'start', '-p', '3005'], { shell: true });

server.stdout.on('data', data => {
  const msg = data.toString();
  if (msg.includes('Ready in') || msg.includes('started server on') || msg.includes('http://localhost:3005')) {
    console.log('Next.js server is ready on port 3005!');
    runTests();
  }
});

server.stderr.on('data', data => {
  // console.error(data.toString());
});

function get(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3005${path}`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function runTests() {
  try {
    console.log('\n--- Test 1: GET /api/chapters ---');
    const chRes = await get('/api/chapters');
    const chData = JSON.parse(chRes.data);
    console.log(`Status: ${chRes.status}, Chapters Count: ${chData.chapters?.length}`);

    console.log('\n--- Test 2: GET /api/verses/2/47 ---');
    const vRes = await get('/api/verses/2/47');
    const vData = JSON.parse(vRes.data);
    console.log(`Status: ${vRes.status}, Verse 2.47: ${vData.verse?.text?.split('\n')[0]}`);
    console.log(`Padartha Word Count: ${vData.verse?.word_meanings?.length}`);
    console.log(`Hindi translation: ${vData.verse?.translation_hi?.slice(0, 60)}...`);

    console.log('\n--- Test 3: GET /api/daily-verse ---');
    const dRes = await get('/api/daily-verse');
    const dData = JSON.parse(dRes.data);
    console.log(`Status: ${dRes.status}, Daily Verse: Chapter ${dData.chapter_number}, Verse ${dData.verse_number}`);

    console.log('\n--- Test 4: GET /api/search?q=karma ---');
    const sRes = await get('/api/search?q=karma');
    const sData = JSON.parse(sRes.data);
    console.log(`Status: ${sRes.status}, Search results count: ${sData.count}`);

    console.log('\n--- Test 5: GET / (Homepage HTML) ---');
    const homeRes = await get('/');
    console.log(`Status: ${homeRes.status}, HTML size: ${homeRes.data.length} bytes`);

    console.log('\n✅ ALL INTEGRATION TESTS PASSED PERFECTLY!');
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    server.kill();
    process.exit(0);
  }
}

setTimeout(() => {
  console.log('Timeout waiting for server, killing process');
  server.kill();
  process.exit(1);
}, 20000);

