import fs from 'node:fs';

const OLD = 'https://www.dropbox.com/scl/fi/94kgf42tctglywzkl0roe/LeKathlyn_Resume.pdf?rlkey=wc9u3sqt5rsd1oabixwhsrzmk&st=f62uxhyj&dl=0';
const NEW = 'https://www.dropbox.com/scl/fi/xgbnkxe5gx43fwqydfz30/Kathlyn-Le-Resume.pdf?rlkey=9aznfdszl2gtrf9pr0js8mzw6&st=fai9iziw&dl=0';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let totalReplaced = 0;
for (const f of htmlFiles) {
  const before = fs.readFileSync(f, 'utf8');
  const parts = before.split(OLD);
  if (parts.length > 1) {
    const n = parts.length - 1;
    fs.writeFileSync(f, parts.join(NEW));
    console.log(`  ${f}: ${n} replaced`);
    totalReplaced += n;
  }
}
console.log(`\nTotal replacements: ${totalReplaced}`);

// Sanity: any other Resume-linked dropbox URLs left?
console.log(`\nScanning for any stale resume-like dropbox URLs...`);
let leftovers = 0;
for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes(OLD)) {
    console.log(`  LEFTOVER OLD URL in ${f}`);
    leftovers++;
  }
}
if (leftovers === 0) console.log(`  Clean.`);
