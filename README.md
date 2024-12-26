# Anonymous Grievance System

## Overview
The Anonymous Grievance System is a web application designed to facilitate confidential communication between students and faculty for grievance resolution. The system ensures that only verified college students can register while maintaining strict anonymity. It implements content moderation to maintain a professional environment and features a comprehensive architecture including frontend, backend, and database components.
This was build as our project idea for Mini-project.

## Demo
https://youtu.be/xXOHnJW8uvg

## Key Features
- Secure anonymous authentication for students and faculty
- JWT-based authorization for protected routes (create, read, update complaints)
- College email verification through SMTP-based OTP system
- AI-powered NSFW content detection for maintaining professional standards
- Robust backend with comprehensive validation and privacy controls
- Cloud-hosted MongoDB Atlas database for reliable data management

## Technology Stack
### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Database
- MongoDB (NoSQL)
- MongoDB Atlas (Cloud hosting)

### Security
- JWT (JSON Web Tokens)
- SMTP email verification
- AI content moderation

## Installation Guide

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)
- Git

### Setup Instructions

1. Clone the repository
```bash
git clone https://github.com/Nikhil-NP/Anonymous-Grievance-System
cd Anonymous-Grievance-System
```

2. Install dependencies
```bash
# Root directory
npm install

# Client directory
cd client
npm install

# Server directory
cd ../server
npm install
```

3. Environment Configuration
Create a `.env` file in the server directory with the following variables:
```
GEMINI=your-gemini-api-key
ATLAS_URI=your-mongodb-atlas-uri
mygmail=your-gmail-for-smtp
PORT=5000
appPasswordGoogle=your-google-app-password
ACCESS_TOKEN_SECRET=your-jwt-secret{Any secret key that is used for authorisation purposes eg.., 1234}
```

4. Running the Application
```bash
# Development mode (from root directory)
npm run start

# Alternatively, run server and client separately:
# Server (in server directory)
npm run dev

# Client (in client directory)
npm start
```

## Roadmap
- Administrator dashboard for grievance oversight
- Advanced appeal system for unresolved complaints
- Multi-format evidence upload support (images, videos, documents)
- Production deployment and hosting
- Performance optimization and scaling

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## Team
- Lead Developer: Nikhil: https://github.com/Nikhil-NP
- Contributors:
  - Naveen L D : https://github.com/naveen-dinesh
  - Shivanaga: https://github.com/Shivanaga7sheelavantar
  - Veeresh: [GitHub Profile]

## Acknowledgments

- Special thanks to the MongoDB Atlas team for their excellent database service
- Node.js ,React.js,Express communities for their extensive documentation
- Google Cloud Platform for their API services
- All contributors who helped test and improve this system
