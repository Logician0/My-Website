const https = require('https');

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "https://logo.clearbit.com/anthropic.com",
  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  "https://logo.clearbit.com/heygen.com",
  "https://logo.clearbit.com/elevenlabs.io",
  "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png",
  "https://logo.clearbit.com/x.ai"
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(`${res.statusCode} - ${url}`);
  }).on('error', (e) => {
    console.error(`ERROR ${url}: ${e.message}`);
  });
});
