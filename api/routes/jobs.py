from flask import Blueprint, jsonify
import json
import os

jobs_bp = Blueprint('jobs', __name__)

JOBS_FILE = os.path.join(os.path.dirname(__file__), '../../data/jobs.json')

def load_jobs():
    """Loads jobs from the JSON file."""
    try:
        with open(JOBS_FILE, 'r') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

# Get all jobs (GET /jobs)
@jobs_bp.route('/jobs', methods=['GET'])
def get_jobs():
    """Returns all jobs."""
    jobs = load_jobs()
    return jsonify(jobs), 200

# Get a specific job by ID (GET /jobs/<int:job_id>)
@jobs_bp.route('/jobs/<int:job_id>', methods=['GET'])
def get_job_by_id(job_id):
    """Returns a job based on job_id."""
    jobs = load_jobs()
    job = next((job for job in jobs if job.get("id") == job_id), None)

    if job:
        return jsonify(job), 200
    return jsonify({"error": "Job not found"}), 404
