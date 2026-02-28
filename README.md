# Vendor Management ERP Admin Panel

This is a code bundle for the Vendor Management ERP Admin Panel. 

The original project design is available at [Figma Link](https://www.figma.com/design/geJZrkXMMDLGsmcpAgZ8TG/Vendor-Management-ERP-Admin-Panel).

---

## 🚀 Getting Started

Follow these step-by-step instructions to set up and run the project locally on any operating system (macOS, Windows, or Linux).

### 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:
1. **[Node.js](https://nodejs.org/)** (v18.0.0 or higher recommended)
   - Note: Installing Node.js will automatically install `npm` (Node Package Manager).
2. **Git** (optional, but recommended for version control)

Check your installed versions using your terminal/command prompt:
```bash
node -v
npm -v
```

---

### 💻 Step-by-Step Local Setup

#### 🍎 For macOS

1. **Open the Terminal app** (you can find it via Spotlight Search `Cmd + Space` and typing "Terminal").
2. **Clone the repository and navigate to the directory**:
   ```bash
   git clone https://github.com/Ganapathyram-Nandhagopal/pick-uppers.git
   cd pick-uppers
   ```
3. **Install project dependencies**:
   ```bash
   npm install
   ```
   *(Alternatively, if you prefer `pnpm`: `pnpm install`)*
4. **Start the development server**:
   ```bash
   npm run dev
   ```

#### 🪟 For Windows (Command Prompt / PowerShell / WSL)

1. **Open your preferred terminal** (Search for "cmd", "PowerShell", or "Terminal" in the Start menu).
2. **Clone the repository and navigate to the directory**:
   ```cmd
   git clone https://github.com/Ganapathyram-Nandhagopal/pick-uppers.git
   cd pick-uppers
   ```
3. **Install project dependencies**:
   ```cmd
   npm install
   ```
4. **Start the development server**:
   ```cmd
   npm run dev
   ```
   *Note: If you run into script execution errors in PowerShell, you may need to run `Set-ExecutionPolicy RemoteSigned` in an Administrator PowerShell window.*

#### 🐧 For Linux (Ubuntu / Debian / Fedora / Arch, etc.)

1. **Open your terminal emulator** (usually `Ctrl + Alt + T`).
2. **Clone the repository and navigate to the directory**:
   ```bash
   git clone https://github.com/Ganapathyram-Nandhagopal/pick-uppers.git
   cd pick-uppers
   ```
3. **Ensure you have the right permissions and install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## 🌐 Viewing the Application

Once the development server is running, the terminal will display a local address, usually:
```
  ➜  Local:   http://localhost:5173/
```
Open your web browser (Chrome, Firefox, Safari, Edge) and go to `http://localhost:5173/` to view the application.

## 📦 Building for Production

To create a production-ready build of the application:

```bash
npm run build
```
This will generate optimized, minified files in the `dist` folder. You can then serve this directory using any static file server.