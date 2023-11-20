from flask import Flask, request, jsonify, render_template
import os
import psycopg2

app = Flask(__name__)  # template_folderの指定は不要です。Flaskはデフォルトで'templates'フォルダを参照します。

def get_connection():
    dsn = f"host={os.environ['DB_HOST']} " \
          f"port=5432 " \
          f"dbname={os.environ['DB_NAME']} " \
          f"user={os.environ['DB_USER']} " \
          f"password={os.environ['DB_PASS']}"
    return psycopg2.connect(dsn)

@app.route('/')
def home():
    # app.send_static_fileは不要です。代わりにrender_templateを使用します。
    return render_template('index.html')

@app.route('/save-text', methods=['POST'])
def save_text():
    data = request.json
    text = data['text']

    # データベースに接続
    conn = get_connection()
    cursor = conn.cursor()
    
    # テキストをデータベースに保存
    cursor.execute('INSERT INTO texts (content) VALUES (%s)', (text,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'status': 'success', 'text': text})

@app.route('/clear-texts', methods=['POST'])
def clear_texts():
    conn = get_connection()
    cursor = conn.cursor()
    
    # テキストをデータベースから削除
    cursor.execute('DELETE FROM texts')
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)
