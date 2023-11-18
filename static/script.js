document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submitButton');
    const textInput = document.getElementById('textInput');
    
    submitButton.addEventListener('click', function() {
        const inputValue = textInput.value;
        
        // テキストを送信
        fetch('/save-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            // テキスト入力のクリア
            textInput.value = '';
        })
        .catch(error => console.error('Error:', error));
    });
});


// document.addEventListener('DOMContentLoaded', function() {
//     const submitButton = document.getElementById('submitButton');
        
//     submitButton.addEventListener('click', function() {
//         const textInput = document.getElementById('textInput').value;
        
//         // テキストを送信
//         fetch('/save-text', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text: textInput })
//         })
//         .then(response => response.json())
//         .then(data => console.log(data))
            
//         .catch(error => console.error('Error:', error));
//     });
// });
