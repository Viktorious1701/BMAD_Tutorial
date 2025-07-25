# 4. Technical Assumptions

**Repository Structure: Monorepo**
The project will be structured as a monorepo. This approach is well-suited for a solo developer working with Next.js, as it keeps all frontend and backend (API routes) code within a single, unified repository, simplifying dependency management and development workflows.

**Service Architecture**
The service architecture will be a simple monolith built using Next.js API Routes. This avoids the overhead of managing separate microservices and is the most direct and efficient way to build a backend for a Next.js application, aligning with our goals for simplicity and rapid development.

**Testing Requirements**
The project will include unit tests for critical business logic and components. While comprehensive end-to-end (E2E) testing is not in scope for the MVP, the testing structure should be established to allow for future expansion. The focus will be on ensuring the core logic for transaction and balance calculations is accurate and reliable.

**Additional Technical Assumptions and Requests**
*   **Framework:** The frontend will be built with **Next.js**. The specific version should be a stable, recent release (e.g., 14.x) to leverage modern features while avoiding the risks of beta versions.
*   **Database:** The project will use **PostgreSQL** as its database.
*   **Deployment:** The application will be deployed on **Netlify** using its continuous deployment integration with a **GitHub** repository.