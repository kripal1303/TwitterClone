const express = require('express');
const app = express();
const PORT = 3333;
const hbs = require('hbs');
const path = require('path');

const methodOverride = require('method-override');
const { parse } = require('path');
 
app.use(methodOverride('_method'));

 


app.use(express.static(path.join(__dirname,'static')));
app.set('view engine','hbs');
app.use(express.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');

let num = 1;
let tweets= [];


//get all the tweets
app.get('/', (req, res) => {
  res.render('tweets',{
    tweets:tweets
  });
})


//create a new tweet
app.get('/new',(req,res)=>{
  res.render('newTweet');
})

// Adding a new tweet
app.post('/',(req,res)=>{
  const { tweetContent} = req.body;
  tweets.push({
      id:num,
      tweetContent
  })
  num++;
  res.redirect('/');
})

//to show a single tweet
app.get('/:id',(req,res)=>{
  const {id} = req.params;
  const myTweet = tweets.filter((tweet)=>tweet.id === parseInt(id));
  res.render('singletweet',myTweet[0])
})

//to edit a single tweet
app.get('/:id/edit',(req,res)=>{
  const{id} = req.params;
  const myTweet = tweets.filter((tweet)=>tweet.id ===parseInt(id));
  res.render('edittweet',myTweet[0]);
})

//to update a single tweet
app.put('/:id',(req,res)=>{
  const {id} = req.params;
    let mytweetIndex;
    tweets.map((tweet,indx)=>{
        if(tweet.id == parseInt(id)){
            mytweetIndex = indx;
        }
    })
    const {tweetContent} = req.body;
    
    tweets[mytweetIndex].tweetContent = tweetContent;

    res.redirect('/');

})

//to delete a particular tweet
app.delete('/:id',(req,res)=>{
  const {id} = req.params;
  const updatedTweet = tweets.filter((tweet)=>tweet.id!==parseInt(id));
  tweets =  updatedTweet;
  res.redirect('/');
})






app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})