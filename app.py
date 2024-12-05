from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import mysql.connector
import datetime
import jwt

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)
app.config['SECRET_KEY'] = 'seu_segredo_aqui'

# Tabela de usuários
"""
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);
"""

db_config = {
    'host': 'localhost',
    'user': 'root', 
    'password': '',  
    'database': 'project_management'
}

@app.route('/projects', methods=['GET'])
@token_required
def get_projects():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return jsonify(projects)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    project_id = request.args.get('project_id')
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tasks WHERE project_id = %s", (project_id,))
    tasks = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    
    query = """
        UPDATE tasks 
        SET name = %s, start_date = %s, end_date = %s, status = %s, dependency_ids = %s
        WHERE id = %s
    """
    
    cursor.execute(query, (
        data['name'], 
        data['start_date'], 
        data['end_date'], 
        data['status'], 
        ",".join(map(str, data.get('dependency_ids', []))), 
        task_id
    ))
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'Task updated successfully'})

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    query = "INSERT INTO users (username, password_hash) VALUES (%s, %s)"
    cursor.execute(query, (data['username'], hashed_password))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(query, (data['username'],))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and bcrypt.check_password_hash(user['password_hash'], data['password']):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({'token': token})

    return jsonify({'message': 'Invalid credentials'}), 401

from functools import wraps

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 403
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            
        except:
            return jsonify({'message': 'Token is invalid'}), 403
        
        return f(*args, **kwargs)
    return decorated

@app.route('/dashboard', methods=['GET'])
@token_required
def get_dashboard():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    
    query = """
        SELECT 
            (SELECT COUNT(*) FROM projects) AS total_projects,
            (SELECT COUNT(*) FROM tasks WHERE status = 'Completed') AS completed_tasks,
            (SELECT COUNT(*) FROM tasks WHERE status = 'In Progress') AS in_progress_tasks,
            (SELECT COUNT(*) FROM tasks WHERE status = 'Not Started') AS not_started_tasks
    """
    
    cursor.execute(query)
    stats = cursor.fetchone()
    cursor.close()
    conn.close()
    
    return jsonify(stats)