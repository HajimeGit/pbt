# Personal Budget Tracker

## Overview

The Personal Budget Tracker allows users to track their income and expenses, transactions to understand their spending habits.
This project is a full-stack web application built with NestJS on the server-side and a modern client-side application using React, designed for performance and scalability. The project is containerized using Docker, making it easy to set up and deploy.

## Features

- **REST API**: Built with NestJS for server-side operations, supporting CRUD functionality.
- **Frontend (React)**: A modern client-side application using React for fast development and performance optimization.
- **Docker Support**: Both the client and server are fully containerized using Docker, making deployment and local setup simple.
- **Database Migrations**: Seamless migration handling using NestJS to manage database changes.
- **Linting and Formatting**: ESLint and Prettier configured for maintaining code quality and consistency.

## Installation

Clone the repository:

```bash
  git clone git@github.com:HajimeGit/pbt.git
  cd pbt
  pnpm install
```

Set up .env files for server and client

```bash
  cp .example.env .env
```

Run Docker command:

```bash
  docker-compose --env-file ./server/.env --env-file up --build
```

## License

PBT is [MIT licensed](LICENSE).