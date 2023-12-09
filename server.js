/**
 * Load environment variables
 */
require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("passport");
const cors = require("cors");


/**
 * Swagger and OpenAPI
 */
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = swaggerJsDoc({
    definition: {
        openapi: "3.0.3",
        info: {
            title: "LunchBuddy",
            version: "0.0.1",
            description:
                "An application for scheduling where and when to have lunch!"
        },
        tags: [
            {
                name: "Chat",
                description: "Chat comments",
            },
            {
                name: "Choice",
                description:
                    "Restaurant choices for users",
            },
            {
                name: "Authentication",
                description: "User management and authentication.",
            },
            {
                name: "Restaurants",
                description: "Restaurant information",
            },
        ],
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Development server for testing",
            },
            {
                url: "https://test-xzc6.onrender.com/api",
                description: "Production server",
            },

        ],
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                ErrorMessage: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            description: "Message describing the error.",
                        },
                    },
                    required: ["message"],
                },
            },
        },
    },
    apis: ["./api/models/*.js", "./api/controllers/*.js"],
});

/**
 * Database connection
 */
require("./api/models/db.js");
require("./api/config/passport");

var apiRouter = require('./api/routes/api');


var app = express();

/**
 * CORS
 */
app.use(cors());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, "angular", "build")));
/**
 * Swagger file and explorer
 */
apiRouter.get("/swagger.json", (req, res) =>
    res.status(200).json(swaggerDocument)
);
apiRouter.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        customCss: ".swagger-ui .topbar { display: none }",
    })
);

/**
 * Passport
 */
app.use(passport.initialize());

/**
 * Authorization error handler
 */
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError")
        res.status(401).json({ message: err.message });
});

/**
 * Angular routing
 */
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "angular", "build", "index.html"));
  });

module.exports = app;
