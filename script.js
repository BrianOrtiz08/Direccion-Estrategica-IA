document.addEventListener("DOMContentLoaded", function() {
  const apiUrl = "https://api.stack-ai.com/inference/v0/run/029152c4-d242-47f0-9b12-9f6a140dab3e/665687045288e20f9c95c6e8";
  const apiKey = "aa26e6e6-e1c4-4461-8a17-c72b34a28b46";

  async function query(data) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error querying server:", error);
      return { outputs: { "out-0": "Error: No se pudo conectar con el servidor" } };
    }
  }

  function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender === "user" ? "user" : "bot");
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();
    if (message !== "") {
      appendMessage(message, "user");
      userInput.value = "";
      query({ "in-0": message, "user_id": "test_user" }).then((response) => {
        appendMessage(response.outputs["out-0"], "bot");
      }).catch(error => {
        console.error("Error sending message:", error);
        appendMessage("Error: No se pudo obtener respuesta del servidor", "bot");
      });
    }
  }

  document.getElementById("send-button").addEventListener("click", sendMessage);
});
