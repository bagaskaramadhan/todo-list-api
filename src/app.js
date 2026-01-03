const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./src/docs/openapi.yaml");

const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// Helmet for security
app.use(helmet());
app.use(cors());

// Middleware
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/v1", todoRoutes);
app.use("/api/v1", userRoutes);

module.exports = app;