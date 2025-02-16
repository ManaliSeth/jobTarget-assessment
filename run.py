from flask import Flask
from flask_cors import CORS
from api.routes.jobs import jobs_bp

app = Flask(__name__)
CORS(app) # Enables CORS for all routes

# Register Blueprints
app.register_blueprint(jobs_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True)