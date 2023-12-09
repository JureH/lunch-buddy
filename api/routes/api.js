const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["HS256"],
});

const ctrlChat = require('../controllers/chat');
const ctrlChoice = require('../controllers/choice');
const ctrlRestaurants = require('../controllers/restaurants');
const ctrlAuthentication = require("../controllers/authentication");
const ctrlBaza = require('../controllers/baza');

/**
 * Chat
 */


router.get('/chat', ctrlChat.list);
router.get("/chat/:chatId", ctrlChat.chatDetails);
router.post('/chat',auth, ctrlChat.newChat);
router.delete('/chat/:chatId',auth, ctrlChat.deleteChat);

/**
 * Choice
 */
router.get('/choice', ctrlChoice.list);
router.post('/choice',auth, ctrlChoice.newChoice);

/**
 * Restaurants
 */
router.get('/restaurants', ctrlRestaurants.list);
router.get('/restaurants/:restaurantId', ctrlRestaurants.restaurantDetails);
router.post('/restaurants', auth, ctrlRestaurants.newRestaurant);
router.delete('/restaurants/:restaurantId', auth, ctrlRestaurants.deleteRestaurant);
router.post('/restaurants/:restaurantId/comments', auth, ctrlRestaurants.newComment);
router.delete('/restaurants/:restaurantId/comments/:commentId', auth, ctrlRestaurants.deleteComment);

/**
 * Authentication
 */
router.post("/register", ctrlAuthentication.register);
router.post("/login", ctrlAuthentication.login);

/**
 * Dodajanje in brisanje vsebine podatkovne baze
 */
router.route("/baza")
    .post(ctrlBaza.dodajZacetnoVsebino)
    .delete(ctrlBaza.izbrisiVsebino);


module.exports = router;