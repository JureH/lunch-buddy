const mongoose = require('mongoose');
const db = require('../models/db');
const Chat = mongoose.model("Chat");
const Restaurant = mongoose.model("Restaurant");
const User = mongoose.model("User");
const Choice = mongoose.model("Choice");
const chatsData = require('../../data/chats.json');
const choicesData = require('../../data/choices.json');
const restaurantsData = require('../../data/restaurants.json');
const userData = require('../../data/users.json');

const dodajZacetnoVsebino = async (req, res) => {
    var sporocilo = "";

    for (var user of userData) {
        const found = await User.findById(user._id);
        if (!found) {
            const tempUser = new User();
            tempUser._id = user._id;
            tempUser.role = user.role;
            tempUser.username = user.username;
            tempUser.email = user.email;
            tempUser.setPassword(user.password);
            await tempUser.save();

            console.log("Shranjen uporabnik: " + tempUser.name);
        }
    }

    for (var item of chatsData) {
        const found = await Chat.findById(item._id);
        if (!found) {
            const object = new Chat();
            object._id = item._id;
            object.username = item.username;
            object.comment = item.comment;
            object.date = item.date;
            await object.save();

            console.log("Shranjen chat: " + object.comment);
        }
    }

    for (var item of choicesData) {
        const found = await Choice.findById(item._id);
        if (!found) {
            const object = new Choice();
            object._id = item._id;
            object.username = item.username;
            object.restaurant = item.restaurant;
            object.date = item.date;
            object.lunch_time = item.lunch_time;
            await object.save();

            console.log("Shranjen choice: " + object.name);
        }
    }

    for (var item of restaurantsData) {
        const found = await Restaurant.findById(item._id);
        if (!found) {
            const object = new Restaurant();
            object._id = item._id;
            object.name = item.name;
            object.address = item.address;
            object.coordinates = item.coordinates;
            object.phone_number = item.phone_number;
            object.rating = item.rating;
            object.website = item.website;
            object.comments = item.comments;
            await object.save();

            console.log("Shranjen restaurant: " + object.name);
        }
    }

    if (sporocilo.length == 0)
        sporocilo = "Vsebina podatkovne baze je bila uspešno dodana.";

    res.status(200).json({"sporočilo": sporocilo});
};

const izbrisiVsebino = async (req, res) => {
    var sporocilo = "";

    let users = await User.find().exec();

    if (users.length > 0) {
        User.collection.drop();
        sporocilo += "Dokument 'User' je bil uspešno izbrisan.\n";
    }

    let choices = await Choice.find().exec();

    if (choices.length > 0) {
        Choice.collection.drop();
        sporocilo += "Dokument 'Choice' je bil uspešno izbrisan.\n";
    }

    let restaurants = await Restaurant.find().exec();

    if (restaurants.length > 0) {
        Restaurant.collection.drop();
        sporocilo += "Dokument 'Restaurant' je bil uspešno izbrisan.\n";
    }

    let chat = await Chat.find().exec();

    if (chat.length > 0) {
        Chat.collection.drop();
        sporocilo += "Dokument 'Chat' je bil uspešno izbrisan.\n";
    }


    if (sporocilo.length == 0)
        sporocilo = "Vsebina podatkovne baze je bila prazna";

    res.status(200).json({"sporočilo": sporocilo});
};

module.exports = {
    dodajZacetnoVsebino,
    izbrisiVsebino
}
