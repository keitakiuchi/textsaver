document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function() {
        const textInput = document.getElementById('textInput').value;
        fetch('/save-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    });
});
