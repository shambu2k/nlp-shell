import express from "express";
import { WebSocketServer } from "ws";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getCommand } from "./llm/convert.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const wss = new WebSocketServer({ noServer: true });


// Function to convert Markdown code formatted code to just code;
// Example ```
// ls
// ``` -> ls
const convertCodeBlockToCode = (code) => {
  return code.replace(/```/g, "").trim();
}


// Serve the static HTML and JS files
app.use(express.static(path.join(__dirname, "src/frontend")));

// Handle WebSocket connections
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // Ensure the message is a string
    const nlpCommand = message.toString(); // Convert Buffer to string

    // Log the received command
    console.log(`Received command: ${nlpCommand}`);

    getCommand(nlpCommand).then((command) => {
        
        console.log(`LLM output: ${command}`);

        const code = convertCodeBlockToCode(command);
        console.log(`Code: ${code}`);
      // Execute the shell command
      exec(code, (error, stdout, stderr) => {
        if (error) {
          ws.send(`Error: ${stderr || error.message}`);
        } else {
          ws.send(stdout);
        }
      });
    }).catch((error) => {
      ws.send(`Error: ${error.message}`);
    });
  });
});

// Upgrade HTTP server to WebSocket
app.server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
