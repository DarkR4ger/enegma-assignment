from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import datetime
from dotenv import load_dotenv
import os


load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)

class APIHit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    endpoint = db.Column(db.String(100), nullable=False)
    request_type = db.Column(db.String(10), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.datetime.now(datetime.UTC))
    request_body = db.Column(db.Text, nullable=True)
    content_type = db.Column(db.String(50), nullable=True)
    ip_address = db.Column(db.String(45), nullable=False)
    os = db.Column(db.String(100), nullable=False)
    user_agent = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(10), nullable=False)

def log_api_hit():
    status = 'Failure'
    message = 'Something wrong happened'
    try: 
        if request.path == '/favicon.ico':
            return
        status = 'Success'
        message = 'Added Entry'


    except Exception as e:
        status = 'Failure'
        message = str(e)


    finally:
        user_agent = request.headers.get('User-Agent')
        ip_address = request.remote_addr
        os = get_os_from_user_agent(user_agent)
        content_type = request.content_type
        timestamp = datetime.datetime.now(datetime.UTC)
        request_body = None
        endpoint = request.path

        if request.method in ['POST', 'PUT', 'DELETE']:
            request_body = request.data.decode('utf-8')

        new_hit = APIHit(
            endpoint=endpoint,
            request_type = request.method,
            timestamp = timestamp,
            request_body = request_body,
            content_type = content_type,
            ip_address = ip_address,
            os = os,
            user_agent = user_agent,
            status = status
        )
        db.session.add(new_hit)
        db.session.commit()

        return {'message': message, 'status': status}

@app.route('/api/get-items', methods=['GET'])
def get_items():
    return jsonify(log_api_hit())

@app.route('/api/update-items', methods=['POST'])
def update_items():
    return jsonify(log_api_hit())

@app.route('/api/delete-items', methods=['DELETE'])
def delete_items():
    return jsonify(log_api_hit())

@app.route('/api/put-items', methods=['PUT'])
def put_items():
    return jsonify(log_api_hit())

@app.route('/api/hits', methods=['GET'])
def get_api_hits():
    hits = APIHit.query.all();
    hits_list = [{'id': hit.id,  'endpoint': hit.endpoint,
                  'request_type': hit.request_type, 'timestamp': hit.timestamp,
                  'request_body': hit.request_body, 'content_type': hit.content_type,
                  'ip_address': hit.ip_address, 'os': hit.os, 'user_agent': hit.user_agent} for hit in hits]
    return jsonify(hits_list)

def get_os_from_user_agent(user_agent):
    if 'Windows' in user_agent:
        return 'Windows'
    elif 'Mac' in user_agent:
        return 'Mac'
    elif 'Linux' in user_agent:
        return 'Linux'
    elif 'Postman' in user_agent:
        return 'Postman'
    else:
        return 'Other'

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug = True)
