const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *  schemas:
 *   Chat:
 *    type: object
 *    description: Messages from chat.
 *    properties:
 *     _id:
 *      type: string
 *      description: unique identifier
 *     username:
 *      type: string
 *      description: username of the person who submitted the comment
 *     comment:
 *      type: string
 *      description: body of the comment
 *     date:
 *      type: string
 *      description: date and time of the comment
 *    required:
 *     - _id
 *     - username
 *     - comment
 */

const chatShema = new mongoose.Schema({
    username: { type: String, required: [true, "Username is required!"] },
    comment: { type: String, required: [true, "Comment is required!"] },
    date: { type: Date, "default": Date.now }
});

mongoose.model('Chat', chatShema, 'Chats');