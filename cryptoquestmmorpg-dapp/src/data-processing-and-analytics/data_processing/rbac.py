from flask import Flask, request, jsonify
from functools import wraps

app = Flask(__name__)

# Simulated user roles
users = {
    'admin': 'admin_role',
    'user': 'user_role'
}

# Simulated access control list
acl = {
    'admin_role': ['read', 'write', 'delete'],
    'user_role': ['read']
}

def check_access(role, action):
    def wrapper(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if role in acl and action in acl[role]:
                return f(*args, **kwargs)
            else:
                return jsonify({'error': 'Access denied'}), 403
        return decorated_function
    return wrapper

@app.route('/data', methods=['GET'])
@check_access(users['user'], 'read')
def get_data():
    return jsonify({'data': 'This is some data'})

@app.route('/data', methods=['POST'])
@check_access(users['admin'], 'write')
def post_data():
    return jsonify({'data': 'Data has been written'})

if __name__ == '__main__':
    app.run()
