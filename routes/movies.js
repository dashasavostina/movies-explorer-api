const router = require('express').Router();

const { createMovieValidation, movieValidation } = require('../middlewares/validationJoi');

const { createMovie } = require('../controllers/movies');
const { findMovies } = require('../controllers/movies');
const { deleteMovie } = require('../controllers/movies');

router.post('/movies', createMovieValidation, createMovie);
router.get('/movies', findMovies);
router.delete('/movies/:movieId', movieValidation, deleteMovie);

module.exports = router;
