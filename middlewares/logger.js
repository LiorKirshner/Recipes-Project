const morgan = require("morgan");

// Custom format: adds Israel timezone timestamp to each log line
morgan.token("timestamp", () => {
  const date = new Date();
  return date.toLocaleString("en-IL", {
    timeZone: "Asia/Jerusalem",
    hour12: false,
  });
});
const loggerMiddleware = morgan(
  ":timestamp :method :url :status :response-time ms"
);

module.exports = loggerMiddleware;
