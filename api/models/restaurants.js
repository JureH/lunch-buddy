const mongoose = require('mongoose');


/**
 * @openapi
 * components:
 *  schemas:
 *   Comment:
 *    type: object
 *    description: Comment about cultural heritage location.
 *    properties:
 *     _id:
 *      type: string
 *      description: unique identifier of comment
 *      example: 635a62f5dc5d7968e68464be
 *     username:
 *      type: string
 *      description: Username of author of the comment
 *      example: User3
 *     comment:
 *      type: string
 *      description: comment about the restaurant
 *      example: Interesting location with only few tourists.
 *     date:
 *      type: string
 *      description: time of the comment creation
 *      format: date-time
 *      example: 2020-12-25T17:43:00.000Z
 *    required:
 *     - _id
 *     - username
 *     - comment
 *     - date
 */

const commentsShema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required!"] },
    comment: { type: String, required: [true, "Comment is required!"] },
    date: { type: Date, "default": Date.now }
});

/**
 * @openapi
 * components:
 *  schemas:
 *   Restaurant:
 *    type: object
 *    description: Restaurant information.
 *    properties:
 *     _id:
 *      type: string
 *      description: unique identifier
 *     name:
 *      type: string
 *      description: name of the restaurant
 *     address:
 *      type: string
 *      description: address of the restaurant
 *     coordinates:
 *      type: array
 *      items:
 *       type: number
 *      minItems: 2
 *      maxItems: 2
 *      description: GPS coordinates of the restaurant
 *     phone_number:
 *      type: string
 *      description: phone number of the restaurant
 *     rating:
 *      type: number
 *      description: average rating of the restaurant
 *      minimum: 0
 *      maximum: 5
 *     website:
 *      type: string
 *      description: average website of the restaurant
 *     comments:
 *      type: array
 *      items:
 *       $ref: '#/components/schemas/Comment'
 *    required:
 *     - _id
 *     - name
 *     - address
 *     - coordinates
 *     - phone_number
 *     - rating
 *     - website
 */

const restaurantsShema = new mongoose.Schema({
    _id: { type: String, required: [true, "_id is required!"] },
    name: { type: String, required: [true, "Name is required!"] },
    address: { type: String, required: [true, "Address is required!"] },
    coordinates: {
        type: [Number],
        validate: {
            validator: (v) => Array.isArray(v) && v.length == 2,
            message: "Coordinates must be an array of two numbers!",
        },
        index: "2dsphere",
    },
    phone_number: { type: String, required: [true, "Phone number is required!"] },
    rating: { type: Number, required: [true, "Rating is required!"] },
    website: { type: String, required: [true, "Website is required!"] },
    comments: [commentsShema],
    coordinates: {
        type: [Number],
        validate: {
            validator: (v) => Array.isArray(v) && v.length == 2,
            message: "Coordinates must be an array of two numbers!",
        },
        index: "2dsphere",
    },
    phone_number: { type: String, required: [true, "Phone number is required!"] },
    rating: { type: Number, required: [true, "Rating is required!"] },
    website: { type: String, required: [true, "Website is required!"] },
    comments: [commentsShema]
});

mongoose.model('Restaurant', restaurantsShema, 'Restaurants');