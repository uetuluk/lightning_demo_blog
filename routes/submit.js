var express = require('express');
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

var dotenv = require('dotenv-safe')

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/* GET users listing. */
router.post('/', async function(req, res, next) {

  console.log(req.body.title);

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{'role': 'user', 'content':`You are a blog writer. You will be writing a beautiful blog post with the following title: ${req.body.title}.`}],
    temperature: 0,
  });
  console.log(completion.data.choices[0].message);
  res.render('index', { title: 'Express', content: completion.data.choices[0].message.content});
});

module.exports = router;
