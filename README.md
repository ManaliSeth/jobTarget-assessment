# Job Listings Web Application

A full-stack web application built with Python (Flask) on the backend and React on the frontend. The application provides job listings and allows users to view job details.

## Features
- **API Layer:**
  - GET all jobs from `jobs.json`
  - GET a specific job by ID
- **Frontend Layer:**
  - Displays a table of jobs with clickable links to details page
  - Job details page with additional information

## Setup Instructions

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. **Create a virtual environment and activate it:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. **Install dependencies:**
   ```bash
   pip3 install -r requirements.txt
   ```
4. **Run the APIs:**
   ```bash
   python3 run.py
   ```
   The backend will run on **port 5000** by default. If port **5000** is in use, Flask will attempt to bind to the next available port. 

### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the React app:**
   ```bash
   npm run dev
   ```
   The frontend runs on **port 5173** by default. If port **5173** is in use, it will use the next available port. 

---
## API Endpoints

### Get all jobs
```http
GET /api/jobs
```
**Description:**
The response contains an array of job objects available in jobs.json file   
**Response:**
```json
[
  {
    "description": "Lorem ipsum dolor sit amet...",
    "id": 123457,
    "location": {
      "city": "Philadelphia",
      "country": "United States",
      "state": "Pennsylvania"
    },
    "postings": [
      {
        "duration": 30,
        "id": 132423,
        "sitename": "Monster.com"
      },
      {
        "duration": 30,
        "id": 132424,
        "sitename": "Career Builder"
      },
      {
        "duration": 30,
        "id": 132425,
        "sitename": "USA Jobs"
      }
    ],
    "req_name": "Software Engineer",
    "status": "Active"
  },
  ...
]
```

### Get job by ID
```http
GET /api/jobs/{job_id}
```
**Description:**
Retrieves detailed information about a specific job identified by its job_id   
**Response:**
```json
{
  "description": "Lorem ipsum dolor sit amet...",
  "id": 123457,
  "location": {
    "city": "Philadelphia",
    "country": "United States",
    "state": "Pennsylvania"
  },
  "postings": [
    {
      "duration": 30,
      "id": 132423,
      "sitename": "Monster.com"
    },
    {
      "duration": 30,
      "id": 132424,
      "sitename": "Career Builder"
    },
    {
      "duration": 30,
      "id": 132425,
      "sitename": "USA Jobs"
    }
  ],
  "req_name": "Software Engineer",
  "status": "Active"
}
```

## Running Tests
### Backend Tests
1. **Run tests with pytest:**
   ```bash
   pytest tests/
   ```

## Making It Production Ready
To make this application production-ready, follow these steps:
1. **Deploy Backend:**
   - Use **Gunicorn** to serve the Flask API.
     ```bash
     gunicorn -w 4 -b 0.0.0.0:5000 run:app
     ```
   - Deploy on **AWS, Heroku, or DigitalOcean**.
   - Use **NGINX** as a reverse proxy.
   - Secure with **SSL/TLS** using Let’s Encrypt.
2. **Deploy Frontend:**
   - Build the React app using:
     ```bash
     npm run build
     ```
   - Serve it with **Vercel, Netlify, or AWS S3**.
3. **Use a Database:**
   - Instead of JSON, use **PostgreSQL or MongoDB**.
4. **Enhance Security:**
   - Enable **CORS restrictions**.
   - Implement **authentication & authorization**.
5. **Optimize Performance:**
   - Use **caching** for frequently accessed data.
   - Enable **lazy loading** in React.
