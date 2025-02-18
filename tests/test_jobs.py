import pytest
from api.routes.jobs import jobs_bp
from flask import Flask
from flask.testing import FlaskClient

# Test setup: Initialize Flask app with Blueprint
@pytest.fixture
def app():
    app = Flask(__name__)
    app.register_blueprint(jobs_bp, url_prefix="/api")
    return app

@pytest.fixture
def client(app: Flask):
    return app.test_client()

@pytest.fixture
def jobs_data():
    # Mock job data
    return [
        {
            "postings": [
                {"id": 132423, "sitename": "Monster.com", "duration": 30},
                {"id": 132424, "sitename": "Career Builder", "duration": 30},
                {"id": 132425, "sitename": "USA Jobs", "duration": 30},
            ],
            "id": 123457,
            "req_name": "Software Engineer",
            "location": {"city": "Philadelphia", "state": "Pennsylvania", "country": "United States"},
            "description": "Lorem ipsum dolor sit amet...",
            "status": "Active"
        },
        {
            "postings": [
                {"id": 132426, "sitename": "Healthjobs.com", "duration": 30},
                {"id": 132427, "sitename": "Nursing Jobs", "duration": 30},
                {"id": 132428, "sitename": "USA Jobs", "duration": 30},
            ],
            "id": 123456,
            "req_name": "Nurse Practitioner",
            "location": {"city": "San Diego", "state": "California", "country": "United States"},
            "description": "Lorem ipsum dolor sit amet...",
            "status": "Inactive"
        },
        # Other jobs
    ]

@pytest.fixture(autouse=True)
def mock_load_jobs(monkeypatch, jobs_data):
    # Automatically mock load_jobs function for all tests
    monkeypatch.setattr('api.routes.jobs.load_jobs', lambda: jobs_data)

# Test: Get all jobs
def test_get_all_jobs(client: FlaskClient):
        
    # Perform the GET request
    response = client.get('/api/jobs')
    
    assert response.status_code == 200
    response_json = response.get_json()
    
    # Validate response structure
    assert isinstance(response_json, list)
    assert len(response_json) > 0
    assert all(key in response_json[0] for key in ["id", "req_name", "location", "status", "postings"])

# Parameterized Test: Get a specific job by ID (valid & invalid cases)
@pytest.mark.parametrize("job_id, expected_status, expected_error", [
    (123457, 200, None),  # Valid job ID
    (999999, 404, "Job not found"),  # Invalid job ID
])

# Test: Get a specific job by ID
def test_get_job_by_id(client: FlaskClient, job_id, expected_status, expected_error):
 
    response = client.get(f'/api/jobs/{job_id}')
    
    assert response.status_code == expected_status
    response_json = response.get_json()

    if expected_status == 200:
        assert response_json['id'] == job_id
        assert all(key in response_json for key in ["req_name", "location", "status", "postings"])
    else:
        assert response_json["error"] == expected_error