from flask import Flask, request, jsonify
import json
import os
from datetime import datetime

app = Flask(__name__)
JSON_FILE = 'messages.json'

@app.route('/save_message', methods=['POST'])
def save_message():
    data = request.get_json()
    user_email = data.get('email')
    user_message = data.get('message')
    timestamp = datetime.now().isoformat()

    entry = {
        'timestamp': timestamp,
        'email': user_email,
        'message': user_message
    }

    if os.path.exists(JSON_FILE):
        with open(JSON_FILE, 'r', encoding='utf-8') as f:
            try:
                messages = json.load(f)
            except Exception:
                messages = []
    else:
        messages = []

    messages.append(entry)

    with open(JSON_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, indent=2)

    return jsonify({'status': 'success', 'message': 'Message saved!'})

if __name__ == '__main__':
    app.run(debug=True)
