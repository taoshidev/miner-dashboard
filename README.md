# Miner Dashboard

Welcome to your PTN Miner Dashboard. This is a React application that requires a URL to be added to a `.env` file to
fetch data from your miner.

## Installation

Follow these steps to install and run the application on your local machine.

### Prerequisites

- Your PTN Miner
- A package manager like npm, yarn, or pnpm,

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/taoshidev/miner-dashboard.git
```

Navigate into the project directory:

```bash
cd miner-dashboard
```

### 2. Install Dependencies

Install the necessary dependencies by running:

```bash
npm install
```

if you are using yarn:

```bash
yarn install
```

or if you are using pnpm:

```bash
pnpm install
```

### 3. Configure Environment Variables

The application requires you to set an environment variables to function correctly. A template .env.example file has
been
provided.

Copy the .env.example file to .env using the following command:

```bash
cp .env.example .env
```

Update the .env file

```env
VITE_MINER_URL=your-miner-url-here
```

Replace your-miner-url-here with the actual URL your miner.

### 4. Start the Application

To start the development server, run:

```bash
npm start
```

if you are using yarn:

```bash
yarn start
```

or if you are using pnpm:

```bash
pnpm start
```

This will start the app on http://localhost:5173/ by default. Open your browser and navigate to this URL to view your
miner dashboard.

