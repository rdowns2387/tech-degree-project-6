const express = require('express');
const project = require('./data.json').projects;


const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));



//Home page
app.get('/', (req, res)=>{
  res.render('index', { projects: project });
});

//About page
app.get('/about', (req, res)=>{
  res.render('about');
});

//Project page
app.get('/project/:id', (req, res)=>{
    res.render('project', {
    project_name: project[req.params.id].project_name,
    description: project[req.params.id].description,
    technologies: project[req.params.id].technologies,
    github_link: project[req.params.id].github_link,
    live_link: project[req.params.id].live_link,
    image_urls: project[req.params.id].image_urls,
  });
});

//Error handling
app.use((req, res, next) => {
  const err = new Error('It looks like the page you were looking for was not found...');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) =>{
  res.locals.error = err;
  res.status(err.status);
  res.render('error')
});


app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
