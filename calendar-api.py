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
        output.append({'day': i['day'], 'D': i['D'], 'M': i['M'], "Y": i['Y'], "event": i['event']})
        print(i)
    print(output)
    return jsonify({"output": output})

@app.route('/add', methods=['GET','POST'])
def add():
    calendar = mongo.db.calendar
    req = request.json
    print('in post ',req)
    # calendar.insert({'D':req['']})
    return jsonify({"output":req})

@app.route('/<day>/<month>/<year>', methods=['GET'])
def start(day, month, year):
    calendar = mongo.db.calendar
    try:
        print(day, month, year)
        calendar = mongo.db.calendar
        docs_list = list(calendar.find())
        output = []
        for i in docs_list:
            # output.append({'day': i['day'], 'D': i['D'], 'M': i['M'], "Y": i['Y'], "type": i['event.type'],
            #                "course": i['event.course'], "section": i['event.section'], "team": i['event.team']})
            print(i)
        print(output)
        # TODO: comment this line out
        output = [{"day": day, "month": month, "year": year}]
        print(output)
        return jsonify({"output": output})
    except:
        print("error")
    return render_template('test.html')


if __name__ == "__main__":
    app.run(debug=True)
