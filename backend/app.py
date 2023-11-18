from flask import Flask, request, jsonify
import os
import psycopg2

app = Flask(__name__)

# データベース接続設定
DATABASE_URL = os.environ['DATABASE_URL']

@app.route('/save-text', methods=['POST'])
def save_text():
    data = request.json
    text = data['text']

    # データベースに接続
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = conn.cursor()
    
    # テキストをデータベースに保存
    cursor.execute('INSERT INTO texts (content) VALUES (%s)', (text,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'status': 'success', 'text': text})

if __name__ == '__main__':
    app.run(debug=True)
