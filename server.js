const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const { Client } = require('@notionhq/client');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

app.get('/api/takes', async (req, res) => {
  try {
    const data = await notion.databases.query({ 
      database_id: databaseId,
      filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
      });
    res.json(data);
  } catch (error) {
    console.error('Error fetching Notion data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const { Octokit } = require('@octokit/core');
const octokit = new Octokit({auth: process.env.GITHUB_KEY});
const { DateTime } = require("luxon");

app.get('/api/lastUpdate', async (req, res) => {
  try {
    const data = await octokit.request('GET /repos/infinit1ve/PortfolioWebsite', {
      owner: 'infinit1ve',
      repo: 'PortfolioWebsite',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    const lastPush = DateTime.fromISO(data.data.pushed_at);
    res.json(lastPush);
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }
});