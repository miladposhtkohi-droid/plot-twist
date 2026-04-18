// Handler for routes that are not found
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Centralized error handler
export const errorHandler = (err, req, res, next) => {
  // Use the status code from the error if it exists
  let statusCode = err.statusCode || err.status || 500;

  let message = err.message || "Internal Server Error";
  // Unauthorized errors (JWT or auth middleware)
  if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Not authorized";
  }

  // MongoDB duplicate key error
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate field value: ${field}`;
    statusCode = 400;
  }

  // CastError for invalid ObjectId
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = `Resource not found with id: ${err.value}`;
    statusCode = 404;
  }

  // Optional: log error in server console
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development
    // stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

