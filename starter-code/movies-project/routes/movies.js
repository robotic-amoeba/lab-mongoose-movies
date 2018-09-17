const mongoose = require('mongoose');
const Movie = require('../models/movie.js');
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  Movie.find({})
    .then(movies => {
      res.render('movies/index', { movies })
    })
    .catch(e => console.log(e))
})

router.get('/new', (req, res, next) => {
  res.render('./movies/new')
})

router.get('/:id', (req, res, next) => {  //DETAILS menu
  let id = req.params.id;
  Movie.findById({ _id: id })
    .then(movie => {
      //console.log(movie)
      res.render('./movies/show', { movie })
        .catch(e => console.log(e))
    })
})

router.post('/', (req, res, next) => {
  let data = req.body;
  let movie = new Movie({ title: data.title, genre: data.genre, plot: data.plot })
  movie.save()
    .then(() => res.redirect('/'))
    .catch(() => res.render('/movies/new'))
})


module.exports = router;