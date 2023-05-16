from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient(  'mongodb+srv://sparta:test@cluster0.bkvgtmw.mongodb.net/retryWrites=true&w=majority')

db = client.dbsparta

@app.route('/')
def home():
   return render_template('index.html')


@app.route("/hithere", methods=["POST"])
def hi_post():
    name_receive = request.form['name_give']
    password_receive = request.form['password_give']
    message_receive = request.form['message_give']
   
    doc = {
      'name': name_receive,
     'password': password_receive,
     'message': message_receive
    }
     
    db.hi.insert_one(doc)

    return jsonify({'msg': '저장 완료!'})

@app.route("/hi", methods=["GET"])
def hi_get():
    all_comments= list(db.hi.find({},{'_id':False}))
    return jsonify({'result': all_comments})

@app.route("/hi", methods=["PUT"])
def hi_PUT():
    commentId_reveive = request.form['commentId_give']
    password_receive = request.form['password_give']
    modified_comment = request.form['modified_comment']
    query = {'_id':commentId_reveive}
    newValue = {"$set" : {"message": modified_comment}}
    db.hi.update_one({query,})
    return jsonify({'result': 'success'})


if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)