from flask import Flask, request
import pandas as pd
import os
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests for local testing

EXCEL_FILE = 'contact_messages.xlsx'

@app.route('/submit', methods=['POST'])
def submit():
    user_email = request.form.get('userEmail')
    user_message = request.form.get('userMessage')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    new_row = {'Timestamp': timestamp, 'Email': user_email, 'Message': user_message}

    if os.path.exists(EXCEL_FILE):
        df = pd.read_excel(EXCEL_FILE)
        df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    else:
        df = pd.DataFrame([new_row])
    df.to_excel(EXCEL_FILE, index=False)
    return 'Message received!'

if __name__ == '__main__':
    app.run(debug=True)
