# Vendor Management ERP Admin Panel

This is a code bundle for the Vendor Management ERP Admin Panel. 

The original project design is available at [Figma Link](https://www.figma.com/design/geJZrkXMMDLGsmcpAgZ8TG/Vendor-Management-ERP-Admin-Panel).

---

## 🚀 Getting Started

Follow these step-by-step instructions to set up and run the project locally on any operating system (macOS, Windows, or Linux).

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
1. **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
2. **[Python](https://www.python.org/)** (v3.8 or higher recommended)
3. **Git** (optional, but recommended for version control)

Check your installed versions using your terminal:
```bash
node -v
python --version
# or python3 --version
```

---

### 💻 Step-by-Step Local Setup

Because the project is split into a **Python Backend** and a **React Frontend**, you will need to open **two separate terminal windows** to run the application fully.

#### 1️⃣ Clone the Repository (Do this first)

Open your terminal and run:
```bash
git clone https://github.com/Ganapathyram-Nandhagopal/pick-uppers.git
cd pick-uppers
```

#### 2️⃣ Setup and Start the Backend (Terminal 1)

In your first terminal window, navigate into the backend folder, install the python dependencies, and start the FastAPI server:

```bash
cd backend

# Create a virtual environment
# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# On Windows (Command Prompt / PowerShell):
# python -m venv venv
# venv\Scripts\activate

# Install the required Python packages
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --port 8000
```
*The backend API will now be running at `http://localhost:8000`.*

#### 3️⃣ Setup and Start the Frontend (Terminal 2)

Open a **new, second terminal window**, ensure you are inside the `pick-uppers` project holder, and start the frontend:

```bash
cd frontend

# Install project dependencies
npm install
# (Alternatively, if you prefer pnpm: pnpm install)

# Start the Vite development server
npm run dev
```

---

## 🌐 Viewing the Application

Once **both** development servers (Backend and Frontend) are running concurrently:
1. The backend API is quietly processing requests at `http://localhost:8000`.
2. Open your web browser (Chrome, Firefox, Safari, Edge) and go to the frontend URL displayed in Terminal 2 (usually `http://localhost:5173/` or `http://localhost:5174/`).

You can now view and interact with the full application!

## 📦 Building for Production (Frontend)

To create a production-ready build of the frontend application:

```bash
cd frontend
npm run build
```
This will generate optimized, minified files in the `dist` folder.