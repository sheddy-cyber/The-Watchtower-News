// backend/src/server.js
require("dotenv").config();
const app = require("./app");

const DEFAULT_PORT = Number(process.env.PORT) || 4000;
const fallbackPorts = [4001, 4002];
const portsToTry = [DEFAULT_PORT, ...fallbackPorts].filter(
  (value, index, self) => self.indexOf(value) === index,
);

function startServer(portIndex = 0) {
  const port = portsToTry[portIndex];
  const server = app.listen(port, () => {
    console.log(`🗞  Watchtower API running on http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const nextIndex = portIndex + 1;
      if (nextIndex < portsToTry.length) {
        console.warn(
          `Port ${port} is in use. Trying fallback port ${portsToTry[nextIndex]}...`,
        );
        startServer(nextIndex);
        return;
      }
      console.error(
        `All ports are in use: ${portsToTry.join(", ")}. Set a free PORT and try again.`,
      );
      process.exit(1);
    }
    throw err;
  });
}

startServer();
