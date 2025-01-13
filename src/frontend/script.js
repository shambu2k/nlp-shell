document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const inputField = document.getElementById('user-input');
    const prompt = document.getElementById('prompt');

    const socket = new WebSocket('ws://localhost:3000');

    // Open WebSocket connection
    socket.onopen = () => {
        console.log('Connected to WebSocket server');
    };

    // When receiving output from the server
    socket.onmessage = (event) => {
        const result = event.data;
        output.innerHTML += `<div>${prompt.textContent} ${inputField.value}</div>`;
        output.innerHTML += `<div>${result}</div>`;
        output.scrollTop = output.scrollHeight;
        inputField.value = '';  // Clear the input field
    };

    // Send the command when Enter is pressed
    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = inputField.value.trim();
            if (command) {
                socket.send(command);  // Send the command to the server
            }
        }
    });
});
