# Weather Monitoring System

A **real-time weather monitoring system** built using the **MERN stack** (MongoDB, Express, React, Node.js) that leverages the **OpenWeatherMap API** to monitor, analyze, and visualize weather conditions across multiple cities. This system provides real-time insights, daily weather summaries, and user-configurable alerts. It is containerized using **Docker** and supports deployment on modern platforms like **Vercel**.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
  - [Docker Setup](#docker-setup)
  - [Manual Setup](#manual-setup)
- [Troubleshooting](#troubleshooting)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Images](#images)

## Introduction

This project is designed to provide users with real-time weather data for several metropolitan cities in India. Users can monitor weather conditions, set alert thresholds, and view daily summaries that include temperature, humidity, and wind speed trends. The system automatically triggers alerts if certain thresholds are breached and can send email notifications.

## Features

- **Real-time Weather Monitoring**: Continuously fetches weather data from OpenWeatherMap API for Indian cities (Delhi, Mumbai, Chennai, Bangalore, Kolkata, Hyderabad).
- **Daily Weather Summaries**: Aggregates daily weather data and provides summaries such as:
  - Average, maximum, and minimum temperatures.
  - Dominant weather condition.
  - Additional parameters such as humidity and wind speed.
- **Configurable Alerts**: Users can define thresholds (e.g., temperature exceeding 35°C), and alerts will trigger when thresholds are violated.
- **Forecast Feature**: Displays 5-day weather forecasts to help users anticipate weather conditions.
- **Visualizations**: Weather data is visualized with charts, making it easy to track trends.
- **Email Notifications**: Sends email alerts when a threshold is breached.
- **Containerized Setup**: Dockerized services for both frontend and backend.

## Technologies Used

### Backend
- **Node.js** with **Express.js** for the REST API.
- **MongoDB** (via **Mongoose**) for data persistence.
- **Nodemailer** for sending email alerts.
- **Jest** for unit testing and integration testing.

### Frontend
- **React** for building the user interface.
- **Axios** for making API requests.
- **Chart.js** for data visualizations.

### DevOps & Deployment
- **Docker** for containerizing both frontend and backend.
- **Docker Compose** for orchestrating services.

---

## System Architecture

The Weather Monitoring System is composed of two main services:
1. **Backend**: A REST API built with Node.js and Express that retrieves data from OpenWeatherMap, processes weather data, and stores it in MongoDB. It also handles user-defined alerts.
2. **Frontend**: A React-based interface that allows users to visualize weather data, view forecasts, and manage alert thresholds.

Both services are containerized using Docker and can be run independently or together using Docker Compose.

---

## Setup Instructions

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
- OpenWeatherMap API key (you can sign up for a free key [here](https://home.openweathermap.org/users/sign_up)).
- MongoDB instance or cluster (you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free-tier cloud database).

### Environment Variables

You need to create `.env` files in both the **frontend** and **backend** directories.

#### Backend `.env`:
```bash
PORT=5000
OPENWEATHER_API_KEY=<your_openweathermap_api_key>
MONGODB_URI=<your_mongodb_uri>
EMAIL_SERVICE=Gmail
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_password>
```

#### Frontend `.env`:
```bash
REACT_APP_API_BASE_URL=http://localhost:5000
```

## Running the Application

### Docker Setup

To run the application using Docker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/mayankpall/weather-monitoring-system
    cd WEATHER-MONITORING-SYSTEM
    ```

2. Ensure that both the **backend** and **frontend** have `.env` files as mentioned in the [Environment Variables](#environment-variables) section.

3. Run the application using Docker Compose:
    ```bash
    docker-compose up --build
    ```

4. The frontend will be available at `http://localhost:3000`, and the backend API will run at `http://localhost:5000`.

---

## Troubleshooting

- If you encounter issues with **port 5000** being in use, you can either:
  - Kill the process using port 5000 with the command:
    ```bash
    sudo lsof -i :5000
    sudo kill -9 <PID>
    ```
  - On **Mac**, you can turn off **AirPlay Receiver**, which may be using port 5000. Go to **System Preferences** > **Sharing** > **AirPlay Receiver** and disable it.

- If you face issues with **module not found** errors, navigate to the `backend` directory and run:
    ```bash
    cd backend
    npm install
    npm install express
    ```

Then, rebuild the Docker containers with:
    ```bash
    docker-compose up --build
    ```

---

### Manual Setup

If you prefer to run the services individually:

#### Backend:
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    npm start
    ```

#### Frontend:
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

4. Access the frontend at `http://localhost:3000`.



## Testing

The backend has unit and integration tests using **Jest**. Tests cover:
- Weather data retrieval.
- Daily summary aggregation.
- Alerts for threshold violations.
- Forecast Test
- Temperature Conversion

Run the tests from the `backend` directory:
```bash
npm test
```

---

## Design Decisions

1. **Modular Architecture**: The project is divided into distinct services (frontend, backend) to ensure maintainability and scalability.
2. **MongoDB for Storage**: MongoDB's flexibility in handling weather data (JSON) and its scalability made it the ideal choice.
3. **Docker for Containerization**: Docker ensures that the application can run consistently across different environments.
4. **Nodemailer for Alerts**: An email notification system alerts users when weather conditions breach their configured thresholds.
5. **Data Visualization**: Weather data is presented visually using **Chart.js** for a better user experience.

---

## Images

Here are a few screenshots of the application:

1. **Dashboard with Weather Data Visualization**  
  <img width="1437" alt="Screenshot 2024-10-19 at 5 08 21 AM" src="https://github.com/user-attachments/assets/1017be43-4fd3-41cb-88c2-83d6dbeb6e25">
  <img width="1440" alt="Screenshot 2024-10-19 at 5 08 30 AM" src="https://github.com/user-attachments/assets/747f1211-198c-42a5-b432-0b6a99b282e8">
  <img width="1440" alt="Screenshot 2024-10-19 at 5 08 51 AM" src="https://github.com/user-attachments/assets/174dc502-15f4-4fcd-8acc-54a68db9a915">
  <img width="1440" alt="Screenshot 2024-10-19 at 5 09 21 AM" src="https://github.com/user-attachments/assets/5f348ed2-abd7-4457-a43c-0df6612a4cce">
  <img width="1440" alt="Screenshot 2024-10-19 at 5 09 27 AM" src="https://github.com/user-attachments/assets/42935a09-08e3-44e9-a8a9-9630b4b4c062">


2. **Weather Alert**  
   <img width="1440" alt="Screenshot 2024-10-19 at 5 09 58 AM" src="https://github.com/user-attachments/assets/0de6fc71-2788-44d0-90e6-ade7ad538dcc">



3. **Update Thresholds**  
    <img width="1440" alt="Screenshot 2024-10-19 at 5 10 03 AM" src="https://github.com/user-attachments/assets/b8e42c4c-a6a2-41f7-be31-7d20f76f0d31">



---

Feel free to clone the repository, follow the setup steps, and explore the project further!
