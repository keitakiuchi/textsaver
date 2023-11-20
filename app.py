from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# データベース設定
app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql+psycopg2://{os.environ['DB_USER']}:{os.environ['DB_PASS']}@{os.environ['DB_HOST']}/{os.environ['DB_NAME']}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# モデルの定義（テキストの保存用）
class Texts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)

def get_connection():
    dsn = f"host={os.environ['DB_HOST']} " \
          f"port=5432 " \
          f"dbname={os.environ['DB_NAME']} " \
          f"user={os.environ['DB_USER']} " \
          f"password={os.environ['DB_PASS']}"
    return psycopg2.connect(dsn)

# ルートエンドポイント
@app.route('/')
def home():
    return render_template('index.html')

# テキストの保存
@app.route('/save-text', methods=['POST'])
def save_text():
    data = request.json
    text_content = data['text']

    if not text_content or text_content.strip() == "EMPTY":
        return jsonify({'status': 'error', 'message': '空のテキストは保存されません'})

    new_text = Text(content=text_content)
    db.session.add(new_text)
    db.session.commit()

    return jsonify({'status': 'success', 'text': text_content})

# テキストのクリア
@app.route('/clear-texts', methods=['POST'])
def clear_texts():
    db.session.query(Texts).delete()
    db.session.commit()

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)

### つまる ###
# from flask import Flask, request, jsonify, render_template
# import os
# import psycopg2

# app = Flask(__name__)

# def get_connection():
#     dsn = f"host={os.environ['DB_HOST']} " \
#           f"port=5432 " \
#           f"dbname={os.environ['DB_NAME']} " \
#           f"user={os.environ['DB_USER']} " \
#           f"password={os.environ['DB_PASS']}"
#     return psycopg2.connect(dsn)

# # ルートエンドポイント
# @app.route('/')
# def home():
#     return render_template('index.html')

# # テキストの保存
# @app.route('/save-text', methods=['POST'])
# def save_text():
#     data = request.json
#     text_content = data['text']

#     if not text_content or text_content.strip() == "EMPTY":
#         return jsonify({'status': 'error', 'message': '空のテキストは保存されません'})

#     new_text = Text(content=text_content)
#     db.session.add(new_text)
#     db.session.commit()

#     return jsonify({'status': 'success', 'text': text_content})

# # テキストのクリア
# @app.route('/clear-texts', methods=['POST'])
# def clear_texts():
#     db.session.query(Text).delete()
#     db.session.commit()

#     return jsonify({'status': 'success'})

# if __name__ == '__main__':
#     app.run(debug=True)
