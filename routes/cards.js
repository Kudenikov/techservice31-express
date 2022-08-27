const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const {
    getCards,
    createCard,
    deleteCard,
  } = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
    body: Joi.object().keys({
      text: Joi.string().required().min(2).max(2000),
      link: Joi.string().required()/*.custom((value, helper) => {
        if (!isURL(value, { require_protocol: true })) {
          return helper.error('string.notURL');
        }
        return value;
      }).messages({
        'string.notURL': 'Адрес некорректный',
        'any.required': 'Ссылка не указана',
      })*/,
      createdAt: Joi.string()
    }),
  }), createCard);

  router.delete('/:cardId', celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().hex().length(24),
    }),
  }), deleteCard);

  module.exports = router;