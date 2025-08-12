**# 🔐 KeyVault**



KeyVault is a simple and secure password manager built as a semester project to help users safely store, view, and manage their login credentials in one place. Designed with clarity and ease of use in mind, this desktop/web app acts as a personal vault for passwords, notes, and secrets.



> ⚠️ \*\*Note:\*\* This was a semester project — not all features are complete. Read more below if you're interested in contributing or improving the tool.



---



**## 🚀 Features**



\- Add and view stored credentials with associated websites/logins.

\- Home dashboard with helpful sections like:

&nbsp; - Summary of saved items

&nbsp; - Add new secret shortcut

&nbsp; - Blog/news preview (incomplete)

\- Organized interface to view, edit, and (eventually) search your stored items.

\- Basic validation and UI components.



---



**## 🖼️ Homepage Overview**



The homepage is designed to be the user's control center:



\- \*\*Quick Access Panel:\*\* Buttons for adding new credentials and viewing saved ones.

\- \*\*Info Cards:\*\* Highlight total items, password strength tips, etc.

\- \*\*Blog Preview Section:\*\* Placeholder space for security tips/news (not completed).

\- \*\*Navigation Bar:\*\* To move between saved items, add new entries, and eventually search.



---



**## 🔐 Passwords Vault Functionality**



Inside the "Saved Passwords" or Vault section:



\- Credentials are listed in a clean tabular/card view.

\- Each entry contains:

&nbsp; - Website name

&nbsp; - Email/Username

&nbsp; - Password (masked with option to reveal)

\- Edit and Delete buttons (some may still be in prototype state)

\- Data stored in a local MongoDB database.



---



**## ⚠️ Incomplete Features**



Since this was made for academic purposes, several features were left unfinished due to time constraints (will work on it in future)



\- 🔍 \*\*Search bar\*\*: UI exists but functionality is not implemented yet.

\- 🧪 \*\*Input validation\*\*: No deep input checking for duplicate entries, strong password checks, or invalid formats.

\- 📝 \*\*Blog/News section\*\*: Placeholder exists, content and structure are not complete.



---



**## 💻 How to Run Locally**



You can either \*\*clone\*\* this repository or simply \*\*download\*\* the project ZIP and open it in \*\*Visual Studio\*\* or your preferred editor.



**### 🛠 Requirements**



\- Node.js installed on your system

\- MongoDB Compass installed and running (connected to `mongodb://localhost:27017`)

\- Visual Studio (or VS Code, WebStorm, etc.)



**### 📦 Setup Steps**



1\. \*\*Clone the repository\*\*

&nbsp;  ```bash

&nbsp;  git clone https://github.com/your-username/keyvault.git

&nbsp;  ```

open the project in visual studio.

split the terminal in half



2\. Navigate to the project directory for frontend on one terminal



```bash

cd webroject 

```

Navigate to the project directory for backend on other split terminal

```bash

cd KeyVault_backend

cd backend

```



Install dependencies for backend and frontend



```bash

npm install

```



3\. Make sure MongoDB Compass is running



You should have a MongoDB instance running locally at:



```bash

mongodb://localhost:27017

```



A database (e.g. keyvaultDB) will be created automatically when the app runs.



4\. Start the project in first backend terminal with the following command and then in frontend terminal



```bash

npm start

```



Visit the app in your browser

http://localhost:3000



**## ontribute \& Collaborate**



We'd love for someone to take this project further!



* Want to improve UI?
* Add a full encryption layer (AES, RSA)?
* Connect a real-time database?
* Finalize the blog section or add secure login?
* Feel free to fork, contribute, or reach out for collaboration — let’s build this into a fully secure and functional password manager together.



🧱 Tech Stack



Frontend: HTML / CSS / JavaScript (or React)



Backend: Node.js + Express.js



Database: MongoDB (local)



📌 License

MIT License — Free to use and modify.



