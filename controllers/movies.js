const BadRequestError = require('../middlewares/errors/bad-request-err');
const Movie = require('../models/movie');
const NotFoundError = require('../middlewares/errors/not-found-err');
const ForbiddenError = require('../middlewares/errors/forbidden-err');

module.exports.createMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRu,
    nameEn,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRu,
    nameEn,
    movieId,
    owner: userId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.findMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(owner)
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с указанным id не найден'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не являетесь владельцем фильма, удаление невозможно'));
      }
      return Movie.findByIdAndDelete(movieId)
        .orFail(() => new NotFoundError('Фильм с указанным id не найден'))
        .then(() => {
          res.send({ message: 'Фильм успешно удалён' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для удаления фильма.'));
      } else {
        next(err);
      }
    });
};
