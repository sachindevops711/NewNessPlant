const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Microservice API",
      version: "1.0.0",
      description: "API documentation for your Node.js application",
    },
    servers: [
      {
        url: "https://newnessplant-2.onrender.com",
        description: "Main production server for Admin, User, or Vendor APIs",
      },
      {
        url: "https://newnessplant.onrender.com",
        description: "User API server",
      },
      {
        url: "https://newnessplant-1.onrender.com",
        description: "Admin API server",
      },
      {
        url: "https://newnessplant-3.onrender.com",
        description: "Vendor API server",
      },
    ],
    paths: {
      "/api/v1/user/register": {
        post: {
          summary: "Register a new user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "last_name", "number", "email", "password"],
                  properties: {
                    name: {
                      type: "string",
                    },
                    last_name: {
                      type: "string",
                    },
                    number: {
                      type: "string",
                    },
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "User registered successfully",
            },
            400: {
              description: "Bad request",
            },
          },
        },
      },
      "/api/v1/user/login": {
        post: {
          summary: "Login a user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
    },
  },
  apis: [], // No need to specify route files when defining directly in the Swagger setup
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

module.exports = swaggerDocs;
