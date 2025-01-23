<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_GreyonTransparent_cropped_small.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_OffBlackonTransparent_cropped_small.png">
    <img alt="Letta logo" src="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_GreyonOffBlack_cropped_small.png" width="500">
  </picture>
</p>

<div align="center">
  <h1>Letta Demo Chat App</h1>
</div>

Deploy your own AI chatbot built with [Letta](https://www.letta.com/).

## ✨ Feature Overview

- [Letta](https://github.com/letta-ai/letta)
  - Letta, formerly MemGPT, is an open-source framework for building stateful LLM applications.
- [Next.js 15+](https://nextjs.org)
  - We use Next.js for its powerful features like server-side rendering, which enhance the performance of the app.
- [React](https://reactjs.org)
  - React is used for building dynamic UIs with reusable components, making the chat app interactive and responsive.
- [Shadcn UI](https://ui.shadcn.com)
  - Shadcn UI is a library of components for building consistent and modern UI with [Tailwind CSS](https://tailwindcss.com). It includes [Lucide icons](https://lucide.dev) for a wide range of use cases.
- [Auth]

---

# 🔰 Getting Started

### 📋 Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://docs.docker.com/get-docker/)

## 🚀 Running the app locally

#### 🔸 Set up your local Letta AI server

Follow the [quickstart guide](https://github.com/letta-ai/letta?tab=readme-ov-file#-quickstart) to run your local Letta AI server.

#### 🔸 Setup and run the app

Clone the repository and run the app:

```bash
# Clone the repository
git clone https://github.com/letta-ai/demo-chat-app.git

# Navigate to the project directory
cd demo-chat-app

# Install dependencies
npm install

# Set environment variables
export $(grep -v '^#' .env.template | xargs)

# Run the app
npm run dev
```

#### 🔸 See the app in action

Once the app is running, open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

## ☁️ Running the app with Letta Cloud

[instructions here]
