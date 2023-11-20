document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const messageContainer = document.getElementById('messageContainer'); // メッセージコンテナの要素を取得
    const clearButton = document.getElementById('clearButton'); // クリアボタンの要素を取得

    textInput.addEventListener('keyup', function() {
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
            
            // メッセージをクリアする
            messageContainer.textContent = '';
        })
        .catch(error => console.error('Error:', error));
    });
    
    clearButton.addEventListener('click', function() {
        fetch('/clear-texts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            messageContainer.textContent = 'テーブルはクリアされました！';
        })
        .catch(error => console.error('Error:', error));
    });
});

// document.addEventListener('DOMContentLoaded', function() {
//     const submitButton = document.getElementById('submitButton');
//     const textInput = document.getElementById('textInput');
    
//     submitButton.addEventListener('click', function() {
//         const inputValue = textInput.value;
        
//         // テキストを送信
//         fetch('/save-text', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ text: inputValue })
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
            
//             // テキスト入力のクリア
//             textInput.value = '';
//         })
//         .catch(error => console.error('Error:', error));
//     });
// });
