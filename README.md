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

Add your miner URL to the environment variables. You can find your miner URL in your miner logs. Note: if a port is
occupied the miner will attempt to connect to the next available port, so confirm your port in the logs!

For example:
![Imgur](https://i.imgur.com/KusnPFt.png)

Copy the .env.example file to .env using the following command:

```bash
cp .env.example .env
```

Update the .env file

```env
VITE_MINER_URL=your-miner-url-here
```

Replace your-miner-url-here with the actual URL of your miner's uvicorn server, e.g. `http://127.0.0.1:41511`.

### 4. Start the Application

To start the development server, run:

```bash
npm run dev
```

if you are using yarn:

```bash
yarn dev
```

or if you are using pnpm:

```bash
pnpm dev
```

This will start the app on http://localhost:5173/ by default. Open your browser and navigate to this URL to view your
miner dashboard.

#### For Productions

To build a production ready Dashboard, run:

```bash
npm run build
```

if you are using yarn:

```bash
yarn build
```

or if you are using pnpm:

```bash
pnpm build
```

## Run with Docker

You can run this project in a Docker container.

#### 1. Build the Docker image

```bash
docker build . -t "miner-dashboard:latest"
```

#### 1. Start a container

Pass in the port you want to run on and your VITE_MINER_URL. Here's an example on port 9091

```bash
docker run -d -p 9091:9091 -e VITE_PORT=9091 -e VITE_MINER_URL="<your-uvicorn-url>" --name local-dashboard miner-dashboard:latest
```
