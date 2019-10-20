from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo
import json
from bson import json_util
import base64
import datetime

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'calendar'
app.config['MONGO_URI'] = "mongodb://localhost/calendar"

mongo = PyMongo(app)

@app.route('/calendar/show', methods=['GET'])
def show():
    calendar = mongo.db.calendar
    uid = calendar.insert({"day": 'MON', "date": '1-1-2020'})
    print(uid)
    docs_list = list(calendar.find({'day':'MON'}))
    output = []
    for i in docs_list:
        output.append({'day': i['day']})
        print(i)
    print(output)
    return jsonify({"output": output})

if __name__ == "__main__":
    app.run(debug=True)