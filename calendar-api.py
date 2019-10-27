import requests
from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo
import json
from bson import json_util
import base64
import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'calendar'
app.config['MONGO_URI'] = "mongodb://localhost/calendar"
CORS(app)
mongo = PyMongo(app)


@app.route('/show/<date>/<month>/<year>', methods=['GET'])
def show(date, month, year):
    calendar = mongo.db.calendar
    print(date, month, year)
    docs_list = list(calendar.find({"D": int(date), "M": month, "Y": int(year)}))
    output = []
    for i in docs_list:
        # output.append({'day': i['day'], 'D': i['D'], 'M': i['M'], "Y": i['Y'], "type": i['event.type'],
        #                "course": i['event.course'], "section": i['event.section'], "team": i['event.team'],
        #                "description": i['event.description']})
        output.append({'D': i['D'], 'M': i['M'], "Y": i['Y'], "event": i['event']})
        print(i)
    print(output)
    return jsonify({"output": output})


@app.route('/add', methods=['GET', 'POST'])
def add():
    calendar = mongo.db.calendar
    req = request.json
    # print('in post ',req)
    event_dict = {'type': req['title'], 'course': req['course'],
                  'section': req['section'], 'team': req['team'],
                  'description': req['description']}
    uid = calendar.insert({'D': int(req['d']), 'M': req['m'], 'Y': int(req['y']),'event':event_dict })
    print(uid)
    # op = list(calendar.find({"_id":uid}))
    return jsonify({"output": 'insert done'})


if __name__ == "__main__":
    app.run(debug=True)
