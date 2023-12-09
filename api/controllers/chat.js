const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const User = mongoose.model("User");


const getAuthor = async (req, res, cbResult) => {
    if (req.auth?.email) {
        try {
            let user = await User.findOne({ email: req.auth.email }).exec();
            if (!user) res.status(401).json({ message: "User not found." });
            else cbResult(req, res, user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};


/**
 * @openapi
 *  /chat:
 *   get:
 *    summary: Retrieve all comments from chat
 *    description: Retrieve all comments from chat
 *    tags: [Chat]
 *    responses:
 *     '200':
 *      description: OK, with list of comments.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Chat'
 *        example:
 *         - _id: "635a62f5dc5d7968e68467e3"
 *           username: User1
 *           comment: They have a great lunch menu here.
 *           date: "2023-10-22T12:30:00.000Z"
 *         - _id: "6534d95c45c9105224decda3"
 *           username: User2
 *           comment: I'm thinking of trying the new Mexican place for lunch today.
 *           date: "2023-10-23T13:15:00.000Z"
 *         - _id: "6534d95c45c9105224decda4"
 *           username: User3
 *           comment: I had a fantastic sandwich for lunch at the cafe down the street.
 *           date: "2023-10-24T12:45:00.000Z"
 *     '404':
 *      description: <b>Not Found</b>, with error message.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ErrorMessage'
 *        example:
 *         message: "Chat not found"
 *     '500':
 *      description: <b>Internal Server Error</b>, with error message.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ErrorMessage'
 *        example:
 *         message: "Server error"
 */
var list = async (req, res) => {
    try {
        let chatList = await Chat.find().exec();

        if (chatList)
            res.status(200).json(chatList);
        else
            res.status(404).json({"message": "Chat not found"});
    } catch (err) {
        res.status(500).json({"message": "Server error"});
    }
}

/**
 * @openapi
 * /chat/{chatId}:
 *  get:
 *   summary: Retrieve specific comment
 *   description: Retrieve a specific comment by its ID.
 *   tags: [Chat]
 *   parameters:
 *    - name: chatId
 *      in: path
 *      required: true
 *      description: ID of the comment.
 *      schema:
 *        type: string
 *      example: "5f490db57669a86b80b0ae7e"
 *   responses:
 *    '200':
 *     description: OK, with comment.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Chat'
 *       example:
 *         _id: "635a62f5dc5d7968e68467e3"
 *         username: User1
 *         comment: They have a great lunch menu here.
 *         date: "2023-10-22T12:30:00.000Z"
 *    '404':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: No chat message with this ID
 *    '500':
 *     description: Internal Server Error, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Server error
 */
var chatDetails = async (req, res) => {
    var chatId = req.params.chatId;
    try {
        let chat = await Chat.findById(chatId).exec();

        if (!chat) {
            res.status(404).json({
                "message": "No chat message with this ID"
            });
        } else {
            var isItObject = typeof chat.id == "object";

            res.status(200).json(isItObject ? {
                username: chat.username,
                comment: chat.comment,
                date: chat.date
            } : chat);
        }
    } catch (err) {
        res.status(500).json({"message": "Server error"});
    }
}

/**
 * @openapi
 * /chat:
 *  post:
 *   summary: Add new comment.
 *   description: Add new comment to the chat.
 *   tags: [Chat]
 *   security:
 *    - jwt: []
 *   requestBody:
 *    description: Message
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       properties:
 *        comment:
 *         type: string
 *         description: content of the message
 *         example: Let's go early today. I am hungry.
 *       required:
 *        - comment
 *   responses:
 *    '201':
 *     description: Message successfully posted.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Chat'
 *       example:
 *         - _id: "6534d95c45c9105224decda3"
 *           username: User2
 *           comment: I'm thinking of trying the new Mexican place for lunch today.
 *           date: "2023-10-23T13:15:00.000Z"
 *           __v: 0
 *    '400':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Username and comment required
 *    '401':
 *     description: <b>Unauthorized</b>, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       examples:
 *        no token provided:
 *         value:
 *          message: No authorization token was found.
 *        user not found:
 *         value:
 *          message: User not found.
 *    '500':
 *     description: Internal Server Error, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Server error
 */
var newChat = async (req, res) => {
    getAuthor(req, res, async (req, res, author) => {
        try {
            if (!req.body.comment)
                res.status(400).json({"message": "Comment required"});
            else {
                var newChat = {username: author.username, comment: req.body.comment};

                let chat = await Chat.create(newChat);
                res.status(201).json(chat);
            }
        } catch (err) {
            res.status(500).json({"message": "Server error"});
        }
    });
};

/**
 * @openapi
 * /chat/{chatId}:
 *  delete:
 *   summary: Delete specific comment
 *   description: Delete a specific comment by its ID.
 *   tags: [Chat]
 *   security:
 *    - jwt: []
 *   parameters:
 *    - name: chatId
 *      in: path
 *      required: true
 *      description: ID of the comment.
 *      schema:
 *        type: string
 *      example: "5f490db57669a86b80b0ae7e"
 *   responses:
 *    '204':
 *     description: OK, comment deleted.
 *    '400':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: ID required
 *    '401':
 *     description: <b>Unauthorized</b>, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       examples:
 *        no token provided:
 *         value:
 *          message: No authorization token was found.
 *        user not found:
 *         value:
 *          message: User not found.
 *        malformed token:
 *         value:
 *          message: jwt malformed
 *        invalid token signature:
 *         value:
 *          message: invalid signature
 *    '403':
 *     description: <b>Forbidden</b>, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Not authorized to delete this comment.
 *    '404':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: No chat message with this ID
 *    '500':
 *     description: Internal Server Error, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Server error
 */
const deleteChat = async (req, res) => {
    const chatId = req.params.chatId;
    try {
        if (!chatId) {
            return res.status(400).json({ "message": "ID required" });
        }
        getAuthor(req, res, async (req, res, author) => {
            if (author.role !== "admin") {
                return res.status(403).json({
                    message: "Not authorized to delete this chat.",
                });
            }
            const result = await Chat.findByIdAndRemove(chatId);

            if (!result) {
                return res.status(404).json({ "message": "No chat with this ID" });
            }
            return res.status(204).send();
        });
    } catch (err) {
        return res.status(500).json({ "message": "Server error" });
    }
};


module.exports = {
    list,
    chatDetails,
    newChat,
    deleteChat
};