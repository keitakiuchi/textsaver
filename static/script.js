document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const messageContainer = document.getElementById('messageContainer');
    const clearButton = document.getElementById('clearButton');

    // テキストを送信する関数
    function sendText(inputValue) {
        // テキストが空でない場合のみ送信
        if (inputValue.trim() !== '') {
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
                textInput.value = ''; // テキスト入力のクリア
                messageContainer.textContent = ''; // メッセージをクリアする
            })
            .catch(error => console.error('Error:', error));
        }
    }

    textInput.addEventListener('keyup', function(event) {
        // キーボードから手を離した時に送信
        sendText(textInput.value);
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

// 遅いけど何とかなる //
// document.addEventListener('DOMContentLoaded', function() {
//     const textInput = document.getElementById('textInput');
//     const messageContainer = document.getElementById('messageContainer'); // メッセージコンテナの要素を取得
//     const clearButton = document.getElementById('clearButton'); // クリアボタンの要素を取得

//     textInput.addEventListener('keyup', function() {
//         const inputValue = textInput.value;

//         // エンターキーが押された時に入力が空であれば何もしない
//         if (event.key === 'Enter' && !inputValue) {
//             console.log('空の入力では送信されません');
//             return;
//         }

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
            
//             // メッセージをクリアする
//             messageContainer.textContent = '';
//         })
//         .catch(error => console.error('Error:', error));
//     });
    
//     clearButton.addEventListener('click', function() {
//         fetch('/clear-texts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then(response => response.json())
//         .then(data => {
//             messageContainer.textContent = 'テーブルはクリアされました！';
//         })
//         .catch(error => console.error('Error:', error));
//     });
// });
