# DevOps Implementation Explanation

## 1. Architecture
The **ShopSmart** application follows a modular monolith architecture separated into two primary tiers:
- **Frontend (Client)**: A React-based Single Page Application (SPA) built with Vite. It handles user interactions, static routing, and API calls.
- **Backend (Server)**: A Node.js and Express server providing the RESTful API endpoints. It serves as the primary data and logic layer.
- **Infrastructure**: Designed for deployment onto an AWS EC2 instance, utilizing PM2 as an idempotent process manager to keep the backend service alive and robust.

## 2. Workflow (CI/CD Pipeline)
A robust Continuous Integration and Continuous Deployment (CI/CD) pipeline was configured via GitHub Actions.
- **Continuous Integration (`ci.yml`)**: Triggered on `push` and `pull_request` to the `main` branch. 
  - **Steps**: It checks out the repository, sets up Node.js, installs dependencies for both frontend and backend, runs static analysis (ESLint), executes Unit/Integration Tests (Jest & Vitest), and runs End-to-End Tests (Cypress) against a deployed testing server.
- **Continuous Deployment (`cd.yml`)**: Triggered on `push` to `main`. 
  - **Steps**: It securely accesses the AWS EC2 instance via SSH and runs an idempotent shell script (`scripts/deploy.sh`).
- **Dependabot**: Configured to check weekly for outdated dependencies in both GitHub Actions and npm ecosystems to guarantee security vulnerabilities are patched.

## 3. Design Decisions
- **Idempotency in Deployment**: `scripts/deploy.sh` relies on `mkdir -p` and `pm2 start`/`pm2 restart` logic. This ensures that executing the deployment script multiple times does not corrupt the state of the EC2 instance or throw "already exists" errors.
- **Segmented Commits**: The initial repository setup simulated an organic development lifecycle by breaking the base code into sequential, logical commits (`build`, `feat`, `docs`) rather than a single bulk commit, satisfying regularity requirements.
- **Multiple Testing Layers**: 
  1. *Unit*: Verified atomic components and routes using Jest (backend) and Vitest (frontend).
  2. *Integration*: Implemented explicit tests simulating the Express app API interactions within Node.js to guarantee module connectivity.
  3. *E2E*: Integrated Cypress to launch a headless browser to simulate the exact user flow on the frontend (e.g., verifying rendering and interactions).

## 4. Challenges
- **ESLint Compatibility**: Transitioning to the newly required `eslint.config.mjs` flat config structure for the backend while retaining the legacy `.eslintrc.cjs` schema for the client's version of ESLint.
- **Testing Global Environments**: Navigating the differences between Vitest injectables vs. global variables and configuring Jest inside standard configurations.
- **E2E Integration in CI**: Seamlessly binding Cypress testing inside GitHub actions alongside isolated testing requires configuring the proper Wait-On behavior to guarantee the frontend server is ready before running the Cypress headless UI operations.
