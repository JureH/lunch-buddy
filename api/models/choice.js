const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *   Choice:
 *    type: object
 *    description: Restaurant and time choice of user for lunch for a specific day
 *    properties:
 *     _id:
 *      type: string
 *      description: unique identifier
 *     username:
 *      type: string
 *      description: username of the person
 *     restaurant:
 *      type: string
 *      description: restaurant choice
 *     date:
 *      type: date
 *      description: date of restaurant choice
 *     lunch_time:
 *      type: string
 *      description: lunch time choice
 *    required:
 *     - _id
 *     - username
 *     - restaurant
 *     - date
 *     - lunch_time
 */

const choiceSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required!"] },
    restaurant: { type: String, required: [true, "Restaurant is required!"] },
    date: { type: Date, default: Date.now },
    lunch_time: { type: String, required: [true, "Lunch time is required!"] }
});

mongoose.model('Choice', choiceSchema, 'Choices');