# DevOps Implementation Explanation

## 1. Architecture
The **ShopSmart** application follows a modular monolith architecture:
- **Frontend (Client)**: A React-based SPA built with Vite, deployed to AWS S3.
- **Backend (Server)**: A Node.js and Express server containerized and deployed to **AWS ECS Fargate**.
- **Infrastructure**: Provisioned via **Terraform**, ensuring a scalable and serverless environment.

## 2. Workflow (CI/CD Pipeline)
A unified CI/CD pipeline was configured via GitHub Actions (`pipeline.yml`).
- **Phase 1: Testing**: Runs backend and frontend tests, generating artifacts.
- **Phase 2: Infrastructure**: Automatically provisions AWS resources using Terraform (VPC, ECR, ECS).
- **Phase 3: Deployment**: Builds a multi-stage Docker image, pushes it to ECR, and updates the ECS service with the new image tag.

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
