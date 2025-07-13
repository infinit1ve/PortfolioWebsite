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

const postgress = require('postgres');
const { title } = require('process');
const sql = postgress(process.env.SQL_KEY);

app.get('/api/syncDB', async (req, res) => {
  try {
    const articles = await sql`SELECT * FROM article`;
    articles.forEach(element => {
      var showdown  = require('showdown'),
      converter = new showdown.Converter()
      const convertedLead = converter.makeHtml(element.lead);
      const convertedTitle = converter.makeHtml(element.title);
      const convertedContent = converter.makeHtml(element.content);
      const convertedDate = DateTime.fromJSDate(element.date).toFormat('dd.LL.yyyy')
      element.lead = convertedLead;
      element.title = convertedTitle;
      element.content = convertedContent;
      element.date = convertedDate
    });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles data:', error);
  }
});

app.set('view engine', 'pug')
app.set('views', './')
app.get('/en/blog/:slug', async (req, res) => {
  const slug = req.params.slug;
  try {
    const result = await sql`SELECT * FROM article WHERE slug = ${slug}`;
    const article = result[0];
    var showdown  = require('showdown'),
      converter = new showdown.Converter()
    const date = DateTime.fromJSDate(article.date).toFormat('dd.LL.yyyy');
    const computerDate = DateTime.fromJSDate(article.date).toFormat('yyyy-LL-dd');
    const convertedContent = converter.makeHtml(article.content);
    res.render('index', { title: `${article.title}`, date: `${date}`, computerDate: `${computerDate}`, content: `${convertedContent}` });
  } catch (err) {
    res.redirect('/en/blog');
  }
});
