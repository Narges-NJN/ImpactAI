# 🥗 Diet Chatbot Backend

Welcome to the **Diet Chatbot Backend**! This project powers a chatbot designed to assist diabetes patients with dietary advice. Built using **NestJS**, this backend leverages MongoDB for storing user memory phrases and connects seamlessly to the AI model for generating responses. 🚀

---

## 🛠️ Features

- 🌐 **AI-Powered Chat**: Provides tailored dietary recommendations using a connected AI model.
- 🧠 **Memory Phrases**: Stores user-specific phrases for context-aware responses.
- 🗂️ **MongoDB Integration**: Efficient storage of chat-related data.
- 🔒 **Environment Variable Support**: Securely handle sensitive configuration like database connections.

---

## 🚀 Getting Started

Follow these steps to set up and run the backend locally or deploy it to your preferred platform.

---

### 🖥️ Prerequisites

Ensure the following tools are installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (for local database management)
- [Git](https://git-scm.com/)
- [Render](https://render.com/) (optional for deployment)

---

### ⚙️ Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/khalmatay/ImpactAI.git
   cd ImpactAI/diet-chatbot

2.  **Install Dependencies**:
npm install
3. **Set Up MongoDB**:

Create a MongoDB database (e.g., dietchatbot).
Obtain the connection string from your MongoDB instance (e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/dietchatbot?retryWrites=true&w=majority).

4. **Configure Environment Variables**:

Create a .env file in the root directory:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dietchatbot?retryWrites=true&w=majority
PORT=3000Set Up MongoDB:

Create a MongoDB database (e.g., dietchatbot).
Obtain the connection string from your MongoDB instance (e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/dietchatbot?retryWrites=true&w=majority).
5. **Configure Environment Variables**:


Create a .env file in the root directory:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dietchatbot?retryWrites=true&w=majority
PORT=3000

🏃 Running the Backend
## Start the Development Server:


npm run start:dev

## 🌐 Deployment
deployed this backend to platforms like Render 

## 🤝 Contributing
We welcome contributions to make this project even better! Fork the repository, make your changes, and submit a pull request. 🎉

## 📧 Contact
For any questions or feedback, feel free to reach out! ✉️