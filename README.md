 Website Downtime Alert System (AI-Assisted)

An AI-assisted website monitoring and alert system that predicts potential website downtime, identifies root causes, and sends proactive email alerts with safe remediation suggestions.

This project is designed for DevOps learning, real-world monitoring scenarios, and portfolio showcase.

🚀 Features

✅ Monitor website availability (UP / DOWN)

🤖 AI-based analysis for:

Downtime prediction

Root cause explanation

Safe remediation suggestions

📧 Automatic email alerts on high-risk conditions

🧪 Dummy website included for testing

🔐 Secure environment variable handling (.env ignored, .env.example provided)

🏗️ Project Structure
website-downtime-alert/
│
├── ai-engine/          # AI analysis service (Node.js + OpenAI)
│   ├── index.mjs
│   ├── metrics-to-ai.js
│   ├── package.json
│   └── .env.example
│
├── email-service/      # Email alert service (Nodemailer)
│   ├── mailer.mjs
│   ├── package.json
│   └── .env.example
│
├── dummy-website/      # Test website (simulates a real site)
│   ├── index.js
│   └── package.json
│
├── monitoring/         # Monitoring configs (future: Prometheus)
│
├── .gitignore
└── README.md

⚙️ Tech Stack

Node.js

Express.js

OpenAI API

Nodemailer (SMTP / Gmail)

GitHub (Version Control & Security)

(Planned) Prometheus & Grafana

🔐 Environment Variables (IMPORTANT)

Secrets are never committed to GitHub.

AI Engine (ai-engine/.env)
OPENAI_API_KEY=your_openai_api_key_here

Email Service (email-service/.env)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Website Alert System <your_email@gmail.com>"


1️⃣ Clone the Repository
git clone https://github.com/Satyam039/website-downtime-alert.git
cd website-downtime-alert

2️⃣ Start Dummy Website
cd dummy-website
npm install
node index.js


Runs at:

http://localhost:8080

3️⃣ Start AI Engine
cd ai-engine
npm install
node index.mjs


Runs at:

http://localhost:4000

4️⃣ Start Email Service
cd email-service
npm install
node mailer.mjs

🧪 Test the System

Send test data to AI engine:

curl -X POST http://localhost:4000/analyze \
-H "Content-Type: application/json" \
-d '{"website":"dummy-site","cpu":95,"memory":90,"disk":96}'

Expected Result:

AI analyzes risk

If risk = HIGH, email alert is sent

Console confirms email delivery

📧 Email Alert Example

Subject:

⚠️ Website Down Warning – dummy-site


Body:

Risk Level: HIGH
Reason: Disk usage critically high
Prediction: Possible downtime in next few hours

Suggested Safe Actions:
- df -h
- du -sh /var/log/*
- Enable log rotation



📈 Future Improvements

Prometheus integration for real metrics

Grafana dashboards

Slack / Teams alerts

Docker Compose for one-command setup

Kubernetes deployment

👨‍💻 Author

Satyam Pandey
GitHub: Satyam039


This project demonstrates real-world DevOps practices, including monitoring, AI-assisted decision making, alerting, and secure secret management.

