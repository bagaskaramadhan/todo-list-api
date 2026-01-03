const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "Todo List API with Auth",
    },

    servers: [{ url: "/api/v1" }],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        TaskItem: {
          type: "object",
          properties: {
            task: { type: "string", example: "Buy milk" },
            isDone: { type: "boolean", example: false },
          },
        },

        TodoCreateRequest: {
          type: "object",
          required: ["title", "deadline"],
          properties: {
            title: { type: "string", example: "My Todo" },
            description: { type: "string", example: "Optional description" },
            taskList: {
              type: "array",
              items: { $ref: "#/components/schemas/TaskItem" },
            },
            deadline: {
              type: "string",
              format: "date-time",
              example: "2026-01-10T10:00:00.000Z",
            },
          },
        },

        TodoUpdateRequest: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            taskList: {
              type: "array",
              items: { $ref: "#/components/schemas/TaskItem" },
            },
            deadline: { type: "string", format: "date-time" },
            completed: { type: "boolean" },
          },
        },

        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
