const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
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
 *  /restaurants:
 *   get:
 *    summary: Retrieve all restaurants
 *    description: Retrieve all restaurants from the website.
 *    tags: [Restaurants]
 *    responses:
 *     '200':
 *      description: OK, with a list of restaurants.
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Restaurant'
 *        example:
 *          - _id: "1"
 *            name: "Restaurant A"
 *            address: "123 Main St"
 *            coordinates: [40.7128, -74.006]
 *            phone_number: "123-456-7890"
 *            rating: 4.5
 *            website: "http://www.restaurant-a.com"
 *            comments:
 *              - _id: "1-1"
 *                username: "User1"
 *                comment: "Great food!"
 *                date: "2023-10-22T12:30:00.000Z"
 *              - _id: "1-2"
 *                username: "User2"
 *                comment: "Excellent service!"
 *                date: "2023-10-22T12:45:00.000Z"
 *              - _id: "1-3"
 *                username: "User3"
 *                comment: "Lovely ambiance!"
 *                date: "2023-10-22T13:00:00.000Z"
 *          - _id: "2"
 *            name: "Restaurant D"
 *            address: "101 Pine St"
 *            coordinates: [41.8781, -87.6298]
 *            phone_number: "222-333-4444"
 *            rating: 4.7
 *            website: "http://www.restaurant-d.com"
 *            comments:
 *              - _id: "2-1"
 *                username: "User10"
 *                comment: "Outstanding food!"
 *                date: "2023-10-25T11:30:00.000Z"
 *              - _id: "2-2"
 *                username: "User11"
 *                comment: "Attentive service!"
 *                date: "2023-10-25T11:45:00.000Z"
 *              - _id: "2-3"
 *                username: "User12"
 *                comment: "Elegant setting!"
 *                date: "2023-10-25T12:00:00.000Z"
 *     '404':
 *      description: <b>Not Found</b>, with an error message.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ErrorMessage'
 *        example:
 *         message: "Restaurants not found"
 *     '500':
 *      description: <b>Internal Server Error</b>, with an error message.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ErrorMessage'
 *        example:
 *         message: "Server error"
 */
var list = async (req, res) => {
    try {
        let restaurantList = await Restaurant.find().exec();

        if (restaurantList)
            res.status(200).json(restaurantList);
        else
            res.status(404).json({"message": "Restaurants not found"});
    } catch (err) {
        res.status(500).json({"message": "Server error"});
    }
}

/**
 * @openapi
 * /restaurants/{restaurantId}:
 *   get:
 *     summary: Retrieve restaurant
 *     description: Retrieve detailed information about restaurant by its ID.
 *     tags: [Restaurants]
 *     parameters:
 *       - name: restaurantId
 *         in: path
 *         required: true
 *         description: ID of the restaurant.
 *         schema:
 *           type: string
 *         example: "5f490db57669a86b80b0ae7e"
 *     responses:
 *       '200':
 *         description: OK, with restaurant.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *             example:
 *               _id: "1"
 *               name: "Restaurant A"
 *               address: "123 Main St"
 *               coordinates: [40.7128, -74.006]
 *               phone_number: "123-456-7890"
 *               rating: 4.5
 *               website: "http://www.restaurant-a.com"
 *               comments:
 *                 - _id: "1-1"
 *                   username: "User1"
 *                   comment: "Great food!"
 *                   date: "2023-10-22T12:30:00.000Z"
 *                 - _id: "1-2"
 *                   username: "User2"
 *                   comment: "Excellent service!"
 *                   date: "2023-10-22T12:45:00.000Z"
 *                 - _id: "1-3"
 *                   username: "User3"
 *                   comment: "Lovely ambiance!"
 *                   date: "2023-10-22T13:00:00.000Z"
 *       '404':
 *         description: Bad Request, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: No restaurant with this ID
 *       '500':
 *         description: Internal Server Error, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Server error
 */
var restaurantDetails = async (req, res) => {
    var restaurantId = req.params.restaurantId;

    try {
        let restaurant = await Restaurant.findById(restaurantId).exec();

        if (!restaurant) {
            res.status(404).json({
                "message": "No restaurant with this ID"
            });
        } else {
            var isItObject = typeof restaurant.id == "object";

            res.status(200).json(isItObject ? {
                name: restaurant.name,
                address: restaurant.address,
                coordinates: restaurant.coordinates,
                phone_number: restaurant.phone_number,
                rating: restaurant.rating,
                website: restaurant.website,
                comments: restaurant.comments
            } : restaurant);
        }
    } catch (err) {
        res.status(500).json({"message": "Server error"});
    }
}



/**
 * @openapi
 * /restaurants:
 *   post:
 *     summary: Add new restaurant.
 *     description: Add new restaurant to the website.
 *     tags:
 *       - Restaurants
 *     security:
 *       - jwt: []
 *     requestBody:
 *       description: ID, name, address, coordinates, phone_number, rating, website
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: id of Restaurant
 *                 example: "8"
 *               name:
 *                 type: string
 *                 description: name of Restaurant
 *                 example: Restaurant A
 *               address:
 *                 type: string
 *                 description: address of Restaurant
 *                 example: 123 Main St
 *               coordinates:
 *                 type: array
 *                 description: coordinates of Restaurant
 *                 example: [40.7128, -74.0060]
 *               phone_number:
 *                 type: string
 *                 description: phone number of Restaurant
 *                 example: "123-456-7890"
 *               rating:
 *                 type: number
 *                 description: rating of Restaurant
 *                 example: 4.5
 *               website:
 *                 type: string
 *                 description: website of Restaurant
 *                 example: http://www.restaurant-a.com
 *             required:
 *               - _id
 *               - name
 *               - address
 *               - coordinates
 *               - phone_number
 *               - rating
 *               - website
 *     responses:
 *       '201':
 *         description: Restaurant successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *             example:
 *               _id: "8"
 *               name: "Restaurant A"
 *               address: "123 Main St"
 *               coordinates: [40.7128, -74.006]
 *               phone_number: "123-456-7890"
 *               rating: 4.5
 *               website: "http://www.restaurant-a.com"
 *               comments: []
 *               __v: 0
 *       '400':
 *         description: Bad Request, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Required parameters missing
 *       '401':
 *         description: <b>Unauthorized</b>, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             examples:
 *               no token provided:
 *                 value:
 *                   message: No authorization token was found.
 *               user not found:
 *                 value:
 *                   message: User not found.
 *       '500':
 *         description: Internal Server Error, with error message.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorMessage'
 *             example:
 *               message: Server error
 */
var newRestaurant = async (req, res) => {
    try {
        if (!req.body._id ||
            !req.body.name ||
            !req.body.address ||
            !req.body.coordinates ||
            !req.body.phone_number ||
            !req.body.rating ||
            !req.body.website
        ) {
            res.status(400).json({ "message": "Required parameters missing" });
        } else {
            const coordinates = req.body.coordinates.split(',').map(coord => parseFloat(coord));

            var newRestaurant = {
                _id: req.body._id,
                name: req.body.name,
                address: req.body.address,
                coordinates: coordinates,
                phone_number: req.body.phone_number,
                rating: req.body.rating,
                website: req.body.website
            };

            let restaurant = await Restaurant.create(newRestaurant);
            res.status(201).json(restaurant);
        }
    } catch (err) {
        res.status(500).json({ "message": "Server error " + err });
    }
};

/**
 * @openapi
 * /restaurants/{restaurantId}:
 *  delete:
 *   summary: Delete a restaurant
 *   description: Delete a restaurant by its ID.
 *   tags: [Restaurants]
 *   security:
 *    - jwt: []
 *   parameters:
 *    - name: restaurantId
 *      in: path
 *      required: true
 *      description: ID of the restaurant.
 *      schema:
 *        type: string
 *      example: "5f490db57669a86b80b0ae7e"
 *   responses:
 *    '204':
 *     description: OK, restaurant deleted.
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
 *        message: Not authorized to delete this restaurant.
 *    '404':
 *     description: Bad Request, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: No restaurant with this ID
 *    '500':
 *     description: Internal Server Error, with error message.
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ErrorMessage'
 *       example:
 *        message: Server error
 */
const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    try {
        if (!restaurantId) {
            return res.status(400).json({"message": "ID required"});
        }
        getAuthor(req, res, async (req, res, author) => {
            if (author.role !== "admin") {
                return res.status(403).json({
                    message: "Not authorized to delete restaurant.",
                });
            }
            const result = await Restaurant.findByIdAndRemove(restaurantId);

            if (!result) {
                return res.status(404).json({ "message": "No restaurant with this ID" });
            }
            return res.status(204).send();
        });
    } catch (err) {
        return res.status(500).json({ "message": "Server error" });
    }
};

/**
 * @openapi
 * /restaurants/{restaurantId}/comments:
 *  post:
 *   summary: Add a new comment to a restaurant.
 *   description: Add a new comment to the comments of a restaurant by restaurantId.
 *   tags: [Restaurants]
 *   security:
 *    - jwt: []
 *   parameters:
 *     - name: restaurantId
 *       in: path
 *       required: true
 *       description: ID of the restaurant.
 *       schema:
 *         type: string
 *       example:
 *         "5f490db67669a86b80b0ae7f"
 *   requestBody:
 *     description: Comment data
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             comment:
 *               type: string
 *               description: Comment text.
 *               example: Best restaurant ever.
 *           required:
 *             - comment
 *   responses:
 *     '201':
 *       description: Comment added successfully.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *           example:
 *             username: "User10"
 *             comment: "Outstanding food!"
 *             date: "2023-10-25T11:30:00.000Z"
 *     '400':
 *       description: Bad Request, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: "Required parameters missing"
 *     '401':
 *      description: <b>Unauthorized</b>, with error message.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/ErrorMessage'
 *        examples:
 *         no token provided:
 *          value:
 *           message: No authorization token was found.
 *         user not found:
 *          value:
 *           message: User not found.
 *     '404':
 *       description: Not Found, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: "Restaurant not found"
 *     '500':
 *       description: Internal Server Error, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: "Server error"
 */
const newComment = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const {comment} = req.body;

    try {
        const restaurant = await Restaurant.findById(restaurantId).exec();

        if (!restaurant) {
            return res.status(404).json({ "message": "Restaurant not found" });
        }

        getAuthor(req, res, async (req, res, author) => {
            try {
                const newComment = {
                    username: author.username,
                    comment,
                    date: new Date().toISOString()
                };

                restaurant.comments.push(newComment);

                await restaurant.save();

                return res.status(201).json(newComment);
            } catch (err) {
                return res.status(500).json({ "message": "Server error " + err });
            }
        });
    } catch (err) {
        return res.status(500).json({ "message": "Server error " + err });
    }
};

/**
 * @openapi
 * /restaurants/{restaurantId}/comments/{commentId}:
 *  delete:
 *   summary: Delete a comment from a restaurant.
 *   description: Delete a specific comment from a restaurant's comments by restaurantId and commentId.
 *   tags: [Restaurants]
 *   security:
 *    - jwt: []
 *   parameters:
 *     - name: restaurantId
 *       in: path
 *       required: true
 *       description: ID of the restaurant.
 *       schema:
 *         type: string
 *       example: "5f490db67669a86b80b0ae7f"
 *     - name: commentId
 *       in: path
 *       required: true
 *       description: ID of the comment to delete.
 *       schema:
 *         type: string
 *       example: "5f490db67669a86b80b0ae81"
 *   responses:
 *     '204':
 *       description: Comment deleted successfully.
 *     '400':
 *       description: Bad Request, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *            message: Restaurant and comment ID required
 *     '401':
 *       description: <b>Unauthorized</b>, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           examples:
 *             no token provided:
 *               value:
 *                 message: No authorization token was found.
 *             user not found:
 *               value:
 *                 message: User not found.
 *             malformed token:
 *               value:
 *                 message: jwt malformed
 *             invalid token signature:
 *               value:
 *                 message: invalid signature
 *     '403':
 *       description: <b>Forbidden</b>, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: Not authorized to delete this comment.
 *     '404':
 *       description: Not Found, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: "Comment not found"
 *     '500':
 *       description: Internal Server Error, with error message.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorMessage'
 *           example:
 *             message: "Server error"
 */
const deleteComment = async (req, res) => {
    const restaurantId = req.params.restaurantId;
    const commentId = req.params.commentId;
    if (!restaurantId || !commentId) 
        return res.status(400).json({
     "message": "Restaurant and comment ID required" 
    });
    
    else {
        try {
          let restaurant = await Restaurant.findById(restaurantId)
            .select("comments")
            .exec();
          if (!restaurant)
            res.status(404).json({
              message: `Restaurant with id '${restaurantId}' not found.`,
            });
          else if (restaurant.comments && restaurant.comments.length > 0) {
            const comment = restaurant.comments.id(commentId);
            if (!comment)
              res.status(404).json({
                message: `Comment with id '${commentId}' not found.`,
              });
            else {
              getAuthor(req, res, async (req, res, author) => {
                if (comment.author != author.name && author.role != "admin") {
                  res.status(403).json({
                    message: "Not authorized to delete this comment.",
                  });
                } else {
                  comment.deleteOne();
                  await restaurant.save();
                  res.status(204).send();
                }
              });
            }
          } else res.status(404).json({ message: "No comments found." });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
    };

module.exports = {
    list,
    restaurantDetails,
    newRestaurant,
    newComment,
    deleteRestaurant,
    deleteComment
};