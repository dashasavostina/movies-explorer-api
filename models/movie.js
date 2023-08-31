const mongoose = require('mongoose');
const validator = require('validator');
const user = require('./user');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" должно быть заполнено'],
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRu" должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEn" должно быть заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
