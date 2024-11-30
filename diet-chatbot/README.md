
    <h1>🦙 LLamaDia - Your Personal Diabetes Assistant 🤖</h1>
    <p>
        LLamaDia is an advanced chatbot designed to assist individuals in managing diabetes effectively. 
        It provides dietary advice, tracks glucose history, suggests exercises, and much more—all powered by AI.
    </p>

    <h2>🚀 Features</h2>
    <ul>
        <li>🍎 <strong>Dietary Recommendations</strong>: Personalized suggestions for managing blood sugar levels.</li>
        <li>📈 <strong>Glucose History Tracking</strong>: Maintain a history of glucose levels for better insights.</li>
        <li>🩺 <strong>General Health Tips</strong>: Access health tips tailored to diabetics.</li>
        <li>🚑 <strong>Emergency Assistance</strong>: Quick links to emergency resources.</li>
        <li>🧠 <strong>AI-Powered Chat</strong>: Engaging, helpful conversations with the power of advanced AI models.</li>
    </ul>

    <h2>🛠️ Installation</h2>

    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js (>= 16.x)</li>
        <li>MongoDB</li>
        <li>Telegram Bot API Token</li>
    </ul>

    <h3>Steps</h3>
    <ol>
        <li>
            Clone the repository:
            <pre><code>git clone https://github.com/your-username/LLamaDia.git
cd LLamaDia</code></pre>
        </li>
        <li>
            Install dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>
            Create a <code>.env</code> file in the root directory and configure the following variables:
            <pre><code>
MONGO_URI=your_mongodb_connection_string
AI_API_KEY=your_ai_api_key
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
ASSISTANT_NAME=LLamaDia
            </code></pre>
        </li>
        <li>
            Start the application:
            <pre><code>npm run start</code></pre>
        </li>
    </ol>

    <h2>📂 Project Structure</h2>
    <pre><code>
.
├── src/
│   ├── ai/                 # AI integration service
│   ├── chat/               # Chat service and controller
│   ├── telegram/           # Telegram bot integration
│   ├── utils/              # Utility functions
│   ├── main.ts             # Application entry point
│   └── app.module.ts       # Root module
├── .env                    # Environment variables
├── buttons.json            # Dynamic buttons configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
    </code></pre>

    <h2>🧩 Environment Variables</h2>
    <p>The following environment variables need to be set in the <code>.env</code> file for the application to function correctly:</p>
    <table border="1">
        <thead>
            <tr>
                <th>Variable Name</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>MONGO_URI</code></td>
                <td>MongoDB connection string for storing data.</td>
            </tr>
            <tr>
                <td><code>AI_API_KEY</code></td>
                <td>API key for the AI/ML service.</td>
            </tr>
            <tr>
                <td><code>TELEGRAM_BOT_TOKEN</code></td>
                <td>Token for your Telegram bot.</td>
            </tr>
            <tr>
                <td><code>ASSISTANT_NAME</code></td>
                <td>Name of the assistant to personalize interactions.</td>
            </tr>
        </tbody>
    </table>

    <h2>🤖 How to Use</h2>
    <ol>
        <li>Start the bot:
            <pre><code>npm run start</code></pre>
        </li>
        <li>Open Telegram, search for your bot using its username, and start a conversation.</li>
        <li>Use the interactive commands or simply ask questions like:
            <ul>
                <li>"What can I eat for breakfast?"</li>
                <li>"Give me tips to lower my blood sugar."</li>
            </ul>
        </li>
    </ol>

    <h2>🔑 API Keys</h2>
    <p>To run this project, you'll need:</p>
    <ul>
        <li>An <strong>AI API Key</strong> from <a href="https://aimlapi.com/">AI/ML API</a>.</li>
        <li>A <strong>Telegram Bot Token</strong> from <a href="https://core.telegram.org/bots#botfather">Telegram BotFather</a>.</li>
        <li>A <strong>MongoDB URI</strong> for database storage.</li>
    </ul>

    <h2>🛡️ Security Notice</h2>
    <p>
        Ensure you <strong>never commit your <code>.env</code> file</strong> or sensitive keys to a public repository.
        Use tools like <code>.gitignore</code> to exclude sensitive files from version control.
    </p>

    <h2>🤝 Contributing</h2>
    <p>We welcome contributions! Please follow these steps:</p>
    <ol>
        <li>Fork the repository.</li>
        <li>Create a new branch:
            <pre><code>git checkout -b feature-name</code></pre>
        </li>
        <li>Commit your changes:
            <pre><code>git commit -m "Add feature"</code></pre>
        </li>
        <li>Push the branch:
            <pre><code>git push origin feature-name</code></pre>
        </li>
        <li>Open a Pull Request.</li>
    </ol>

    <h2>📝 License</h2>
    <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>

    <h2>📧 Contact</h2>
    <p>For questions or support, feel free to reach out via Telegram or open an issue on GitHub.</p>