const mongoose = require("mongoose");
const Choice = mongoose.model("Choice");
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
 * /choice:
 *   get:
 *     summary: Get choices.
 *     description: Get restaurant choices for all people on a specific date or specific time
 *     tags: [Choice]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: "2023-11-17"
 *         description: Date of choice
 *       - in: query
 *         name: lunch_time
 *         required: false
 *         schema:
 *           type: string
 *           example: "11:00"
 *         description: Time of choice
 *     responses:
 *       '200':
 *         description: OK, with choices.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "635a62f5dc5d7968e68467e3"
 *                   username:
 *                     type: string
 *                     example: User1
 *                   restaurant:
 *                     type: string
 *                     example: Restaurant A
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-10-22T12:30:00.000Z"
 *                   lunch_time:
 *                     type: string
 *                     example: "12:30"
 *             example:
 *               - _id: "635a62f5dc5d7968e68467e3"
 *                 username: User1
 *                 restaurant: Restaurant A
 *                 date: "2023-10-22T12:30:00.000Z"
 *                 lunch_time: "12:30"
 *               - _id: "6534d95c45c9105224decda3"
 *                 username: User2
 *                 restaurant: Restaurant B
 *                 date: "2023-10-23T13:15:00.000Z"
 *                 lunch_time: "13:00"
 *               - _id: "6534d95c45c9105224decda4"
 *                 username: User3
 *                 restaurant: Restaurant C
 *                 date: "2023-10-24T12:45:00.000Z"
 *                 lunch_time: "13:00"
 *       '404':
 *         description: Not Found, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No choices found for the specified date
 *       '500':
 *         description: Internal Server Error, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Server error
 */


var list = async (req, res) => {
    var queryDate = req.query.date;
    var queryLunchTime = req.query.lunch_time;

    try {
        let allChoices = await Choice.find({}).exec();

        // Filter choices based on date and lunch_time if provided
        const filteredChoices = allChoices.filter(choice => {
            const choiceDate = choice.date.toISOString().split('T')[0];
            return (!queryDate || choiceDate === queryDate) &&
                   (!queryLunchTime || choice.lunch_time === queryLunchTime);
        });

        if (filteredChoices.length === 0) {
            res.status(404).json({
                "message": `No choices found${queryDate ? ` for the specified date` : ''}${queryLunchTime ? ` and lunch_time` : ''}`
            });
        } else {
            res.status(200).json(filteredChoices);
        }
    } catch (err) {
        res.status(500).json({"message": "Server error"});
    }
}

/**
 * @openapi
 * /choice:
 *  post:
 *   summary: Select your choice for today
 *   description: Select your restaurant choice for today.
 *   tags: [Choice]
 *   security:
 *    - jwt: []
 *   requestBody:
 *    description: Restaurant and time of choice
 *    required: true
 *    content:
 *     application/x-www-form-urlencoded:
 *      schema:
 *       type: object
 *       required:
 *        - restaurant
 *        - lunch_time
 *       properties:
 *        restaurant:
 *         type: string
 *         description: restaurant choice
 *         example: Restaurant F
 *        lunch_time:
 *         type: string
 *         description: time choice
 *         example: "12:30"
 *   responses:
 *    '201':
 *     description: Choice submitted.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Choice'
 *       example:
 *         - _id: "6535257f45c9105224decdb5"
 *           username: User1
 *           restaurant: Restaurant A
 *           lunch_time: "12:30"
 *           date: "2023-10-22T12:30:00.000Z"
 *           __v: 0
 *    '400':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Restaurant and time required
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

var newChoice = async (req, res) => {
    getAuthor(req, res, async (req, res, author) => {
        try {
            if (!req.body.restaurant || !req.body.lunch_time)
                res.status(400).json({"message": "Restaurant and time required"});
            else {
                var newChoice = {
                    username: author.username,
                    restaurant: req.body.restaurant,
                    lunch_time: req.body.lunch_time
                };

                let choice = await Choice.create(newChoice);
                res.status(201).json(choice);
            }
        } catch (err) {
            res.status(500).json({"message": "Server error: "});
        }
    });
};




module.exports = {
    list,
    newChoice
};

