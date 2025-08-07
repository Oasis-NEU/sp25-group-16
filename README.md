# Flatter Me

## Overview

**Flatter Me** is a web application built using Flask (backend) and React (frontend) that generates personalized compliments. It leverages AI integration to tailor compliments based on the user’s preferences and personality, offering a fun, uplifting experience.

This project was developed as part of the **Oasis Developer Series** to showcase full-stack development skills combined with AI personalization.

---

## Features

* **Personalized Compliments:** Users receive compliments customized to their personality and preferences.
* **AI Integration:** Uses AI to generate unique and meaningful compliments dynamically.
* **User Input:** Users can specify the type or style of compliment they want.
* **Responsive UI:** Clean and interactive React frontend providing a smooth user experience.
* **REST API:** Flask backend handles requests, processes input, and integrates with the AI model/service.

---

## Tech Stack

* **Backend:** Flask (Python) — REST API server
* **Frontend:** React.js — interactive user interface
* **AI Integration:** \[Specify AI API or model, e.g., OpenAI GPT-4, or custom model]
* **Communication:** Frontend interacts with backend via RESTful endpoints

---

## Architecture

1. **React Frontend** collects user input (personality traits, compliment type).
2. Sends data to **Flask API** backend.
3. Backend processes input, calls the AI service to generate a personalized compliment.
4. Sends the compliment back to the frontend for display.

---

## Setup Instructions

### Backend (Flask)

1. Clone the repo:

   ```
   git clone [repository-url]
   cd flatter-me/backend
   ```

2. Create and activate a virtual environment:

   ```
   python3 -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```
   pip install -r requirements.txt
   ```

4. Set environment variables for AI API keys and any config needed (e.g., `.env` file).

5. Run the Flask server:

   ```
   flask run
   ```

### Frontend (React)

1. Navigate to frontend folder:

   ```
   cd ../frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the React development server:

   ```
   npm start
   ```

4. Open your browser at `http://localhost:3000`

---

## Usage

* Visit the web app.
* Enter your personality traits or select the type of compliment you want.
* Submit to receive a unique, AI-generated compliment tailored just for you.

---

## Future Improvements

* Add user authentication to save favorite compliments.
* Enhance AI model with more personality dimensions.
* Add multi-language support for compliments.
* Deploy with Docker for easier scalability.

---

## Credits

Developed by: Ripandeep Kaur
Project: Flatter Me
Oasis Developer Series
