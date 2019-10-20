from flask import Flask, jsonify, request, render_template
from flask_pymongo import PyMongo
import json
from bson import json_util
import base64
import datetime

app = Flask(__name__)
# app.config['PROPAGATE_EXCEPTIONS'] = True
# app.config['MONGO_DBNAME'] = 'cc_2019'
# app.config['MONGO_URI'] = 'mongodb://admin:password123@ds123645.mlab.com:23645/cc_2019'


app.config['MONGO_DBNAME'] = 'database'
app.config['MONGO_URI'] = "mongodb://localhost/database"

mongo = PyMongo(app)


# utils
# @app.route("/")
# def home():
#    return render_template("cc/index.html")

# 1
@app.route('/api/v1/users', methods=['POST'])
def add_user():
    user = mongo.db.users
    username = request.json['username']
    password = request.json['password']
    old_user = user.find_one({'username': username})
    response = jsonify({})
    if (old_user):
        response.status_code = 400
        return response
    if len(password) != 40:
        response.status_code = 405
        return response
    for a in password:
        if a not in "1234567890abcdef":
            response.status_code = 405
            return response
    user_id = user.insert({'username': username, 'password': password})
    new_user = user.find_one({'_id': user_id})

    output = {'username': new_user['username'], 'password': new_user['password']}
    return jsonify({'result': output})


# 2
@app.route('/api/v1/users/<name>', methods=['DELETE'])
def delete_user(name):
    user = mongo.db.users
    old_user = user.find_one({'username': name})
    response = jsonify({})
    if (old_user):
        user.remove({"username": name})
        status_msg = "Deleted user " + name
        return jsonify({"result": status_msg})
    else:
        response.status_code = 400
        return response


# 3
@app.route('/api/v1/categories', methods=['GET'])
def get_categories():
    categories = mongo.db.categories
    docs_list = list(categories.find())
    output = []
    for i in docs_list:
        output.append({i['id']: i['name']})
    return jsonify({"categories": output})


# 4
@app.route('/api/v1/categories', methods=['POST'])
def add_category():
    categories = mongo.db.categories
    id = request.json['id']
    name = request.json['name']
    old_user = categories.find_one({'name': name})
    response = jsonify({})
    if (old_user):
        response.status_code = 400
        return response
    uid = categories.insert({"id": id, "name": name})
    new_cat = categories.find_one({"_id": uid})
    output = {"id": new_cat['id'], "name": new_cat['name']}
    return jsonify({"new category added": output}), 201


# 5
@app.route('/api/v1/categories/<name>', methods=['DELETE'])
def delete_category(name):
    categories = mongo.db.categories
    old_cat = categories.find_one({'name': name})
    if (old_cat):
        categories.remove({"name": name})
        status_msg = "Deleted category " + name
        return jsonify({"result": status_msg})
    else:
        return jsonify({"result": "Duplicate Catgory"}), 400


# 6 and #8
@app.route('/api/v1/categories/<category>/acts', methods=['GET'])
def get_acts(category):
    acts = mongo.db.acts
    categories = mongo.db.categories
    startRange = request.args.get('start', '')
    endRange = request.args.get('end', '')
    old_cat = categories.find_one({'name': category})
    act_list = []
    if (old_cat):
        a = list(acts.find({"category": category}))
        len_a = len(a)
        if ((startRange != '') or (endRange != '')):
            s = int(startRange) - 1
            l = int(endRange)
            if ((s >= 0) and (l <= len_a) and ((l - s) <= 100)):
                act_list = list(acts.find({"category": category}).sort([("_id", -1)]).limit(l - s).skip(s))
            else:
                return jsonify({"Result": "This range is illegal. startRange > 0 and endRange < NumberOfActs"}), 405
        else:
            if (len_a > 100):
                jsonify({"Result": "Too many acts to process. Maybe try giving a range?"}), 405
            act_list = a
    else:
        return jsonify({"Result": "Not a valid category"}), 405

    output = []
    for i in act_list:
        output.append({
            "actId": i['actId'],
            "username": i['username'],
            "timestamp": i['timestamp'],
            "caption": i['caption'],
            "upvotes": i['upvotes'],
            "imgB64": i['imgB64'],
            "category": i['category']
        })
    return jsonify({"acts": output})


# 7
@app.route('/api/v1/categories/<category>/acts/size', methods=['GET'])
def get_acts_count(category):
    categories = mongo.db.categories
    old_cat = categories.find_one({'name': category})
    if (old_cat):
        acts = mongo.db.acts
        act_list = list(acts.find({"category": category}))
        l = len(act_list)
        return jsonify({"Number of Acts": l})
    else:
        return jsonify({"Result": "Not a valid category"}), 405


# 9
@app.route('/api/v1/acts/upvote', methods=['POST'])
def upvote_act():
    count = 0
    acts = mongo.db.acts
    id = request.json['actId']
    the_act = acts.find_one({'actId': id})
    count = the_act['upvotes'] + 1
    aid = acts.update({'actId': id}, {'$set': {'upvotes': count}})
    new_vote = acts.find_one({"actId": id})
    output = {"upvote": new_vote['upvotes']}
    return jsonify({"Upvotes": output})


# 10
@app.route('/api/v1/acts/<id>', methods=['DELETE'])
def remove_acts(id):
    act = mongo.db.acts
    new_act = act.find_one({"actId": id})
    if (new_act):
        x = act.remove({"actId": id})
        status_msg = "Deleted act " + id
        return jsonify({"result": status_msg})
    else:
        response = jsonify({})
        response.status_code = 400
        return response


# 11
@app.route('/api/v1/acts', methods=['POST'])
def upload_acts():
    act = mongo.db.acts
    users = mongo.db.users
    id = request.json['actId']
    name = request.json['username']
    imgB64 = base64.encodestring(str.encode(request.json['imgB64']))
    caption = request.json['caption']
    cat = request.json['category']
    time = datetime.datetime.now().strftime("%d-%B-%Y:%S-%M-%I")
    # upvotes = request.json['upvotes']
    # Validate actid
    a = act.find_one({'actId': id})
    response = jsonify({})
    if (a):
        response.status_code = 400
        return response
    # Validate username
    b = users.find_one({'username': name})
    if (b):
        uid = act.insert(
            {'username': name, 'upvotes': 0, 'actId': id, 'imgB64': str(imgB64), 'caption': caption, 'category': cat,
             'timestamp': time})
        new_act = act.find_one({"_id": uid})
        output = {"Caption": new_act['caption'], "Image": new_act['imgB64']}
        return jsonify({"result": output}), 201
    else:
        response.status_code = 400
        return response


if __name__ == "__main__":
    app.run(debug=True)
