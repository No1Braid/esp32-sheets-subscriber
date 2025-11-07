const mqtt = require("mqtt");
const axios = require("axios");

// HiveMQ Cloud connection
const options = {
  host: "YOUR_HIVEMQ_HOST",
  port: 8883,
  protocol: "mqtts",
  username: "YOUR_USERNAME",
  password: "YOUR_PASSWORD"
};

const client = mqtt.connect(options);

client.on("connect", () => {
  console.log("Connected to HiveMQ Cloud");
  client.subscribe("esp32/dht11");
});

client.on("message", async (topic, message) => {
  const data = message.toString();
  console.log("Received:", data);

  // Forward to Google Sheets via Apps Script Webhook
  try {
    await axios.post("YOUR_GOOGLE_SCRIPT_WEBHOOK_URL", { value: data });
    console.log("Forwarded to Google Sheets");
  } catch (err) {
    console.error("Error forwarding:", err.message);
  }
});
