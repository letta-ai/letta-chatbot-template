<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_GreyonTransparent_cropped_small.png">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_OffBlackonTransparent_cropped_small.png">
    <img alt="Letta logo" src="https://raw.githubusercontent.com/letta-ai/letta/refs/heads/main/assets/Letta-logo-RGB_GreyonOffBlack_cropped_small.png" width="500">
  </picture>
</p>

<div align="center">
  <h1>Letta Chatbot Template</h1>
</div>

Deploy your own AI chatbot built on [Letta](https://www.letta.com/) with AI agents that live forever and learn from experience.

## 📦 What's included

- [Letta](https://github.com/letta-ai/letta)

  - Formerly known as MemGPT, Letta is an open-source framework designed for building **stateful LLM applications**. Our chatbot webapp template showcases powerful core features of Letta.

- [Next.js 15+](https://nextjs.org)

  - We leverage Next.js for its **server-side rendering (SSR)** and other performance optimizations, ensuring a fast and seamless user experience.

- [React](https://reactjs.org)

  - React provides a **component-based architecture**, enabling us to build **interactive and dynamic UIs** with reusable elements.

- [TypeScript](https://www.typescriptlang.org)

  - TypeScript enhances our codebase with **static typing, improved maintainability, and better developer tooling**, reducing potential runtime errors.

- [Shadcn UI](https://ui.shadcn.com)

  - Shadcn UI, built on [Tailwind CSS](https://tailwindcss.com), offers a collection of **modern, accessible UI components**, ensuring a cohesive and polished design.

- [React Markdown](https://github.com/remarkjs/react-markdown)
  - React Markdown allows us to **render Markdown content seamlessly**, making it easier to display formatted text within our application.

---

# ⚡️ Quickstart

### 📋 What you need before starting

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)
- [Docker](https://docs.docker.com/get-docker/)

## 🚀 Running the app locally

#### 🔸 Set up your local Letta server

Follow the [quickstart guide](https://docs.letta.com/quickstart) to run your local Letta server.
You can run your own Letta server using [Letta Desktop](https://docs.letta.com/quickstart/desktop) or [Docker](https://docs.letta.com/quickstart/docker).
By default, the Letta server will run on `http://localhost:8283`.

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

👾 TBA. Stayed tuned! [Follow us on Discord](https://discord.com/invite/letta) for updates.
