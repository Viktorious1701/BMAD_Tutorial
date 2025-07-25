# Personal Wallet App Product Requirements Document (PRD)

## 1. Goals and Background Context

**Goals**
*   **Primary Functional Goal:** To build and deploy a functional wallet application that allows a user to create accounts, manually add income and expense transactions, and view a simple, accurate monthly summary of their finances.
*   **Primary Learning Goal:** To successfully utilize the BMad-Method framework for an end-to-end Greenfield project, including the handoffs between the Analyst, PM, Architect, and development agents.
*   **User Experience Goal:** To deliver a clean, comfortable, and intuitive user interface that prioritizes simplicity and speed for core tasks, such as adding a transaction in under 30 seconds.
*   **Technical Goal:** To implement the application using a modern full-stack approach with Next.js and PostgreSQL, deployed via Netlify, aligning with the user's learning objectives and technical constraints.
*   **Project Goal:** To complete all "Must-Have" MVP features within a 2-week development sprint, demonstrating a rapid and efficient development cycle.

**Background Context**
This project was initiated to solve the core problem that many commercial financial tracking apps are overly complex, costly, and raise significant data privacy concerns. The target user—a tech-savvy individual—seeks a transparent alternative where they retain full control over their financial data. This application directly addresses that need by operating on a manual-entry basis, thereby eliminating the requirement to link to live bank accounts.

The core design philosophy is "simplicity as a feature." We are intentionally avoiding feature bloat like investment tracking or advanced forecasting. Instead, we are focusing on perfecting the fundamental user loop: creating accounts, adding transactions, and viewing a clear summary. This focus on a streamlined, private, and free tool is the project's key differentiator and value proposition. The success of this project will be measured not by the quantity of features, but by its daily utility and the user's satisfaction in having a financial tool they fully own and control.

**Change Log**
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| {{current_date}} | 1.0 | Initial PRD draft created. | John, Product Manager |

## 2. Requirements

**Functional Requirements (FR)**
1.  **FR1:** The system shall allow a user to create, view, and delete financial accounts (e.g., wallets).
2.  **FR2:** The system shall provide a form for users to manually add new transactions, specifying an amount, a type (income or expense), and the associated account.
3.  **FR3:** The system shall automatically assign the current date and time to any new transaction upon its creation.
4.  **FR4:** The system shall display a list of all transactions for the current calendar month, sorted with the newest first.
5.  **FR5:** The system shall allow a user to delete any existing transaction, with a confirmation prompt to prevent accidental deletion.
6.  **FR6:** The system shall display the current calculated balance for each account and update this balance in real-time as transactions are added or deleted.
7.  **FR7:** The transaction entry form shall include an optional text field for a description.
8.  **FR8:** The system shall allow a user to edit the details of an existing transaction.
9.  **FR9:** The system shall provide a function for transferring funds between two user-created accounts.
10. **FR10:** The system shall allow users to assign a category (e.g., "Groceries") to each transaction.
11. **FR11:** The system shall come pre-populated with a default list of common transaction categories.
12. **FR12:** The system shall allow users to create, edit, and delete their own custom transaction categories.

**Non-Functional Requirements (NFR)**
1.  **NFR1:** The application must be built using Next.js, PostgreSQL, and be deployable on Netlify.
2.  **NFR2:** All technologies and services used must have a free tier that is sufficient for the application's intended personal use case.
3.  **NFR3:** The application must be a responsive web application, fully functional on the latest versions of modern desktop and mobile browsers (Chrome, Firefox, Safari, Edge).
4.  **NFR4:** The user interface must feel fast and responsive, with critical interactions (like adding a transaction) and page loads completing in under 2 seconds.
5.  **NFR5:** The application must follow basic web security best practices to prevent common vulnerabilities.

## 3. User Interface Design Goals

**Overall UX Vision**
The user experience will be centered on efficiency and clarity. The goal is to create an interface that is clean, uncluttered, and comfortable for daily use. While the aesthetic will be minimalist, the application must capably present data-rich information through clear tables and charts when the user wishes to analyze their finances. The design should feel modern, responsive, and fast.

**Key Interaction Paradigms**
The application will follow standard, intuitive web interaction patterns. Core interactions will include:
*   Using simple, clear forms for adding and editing data.
*   Displaying data in sortable tables and lists.
*   Using modals or dedicated pages for focused tasks like adding a transaction.
*   Visualizing data with interactive charts (e.g., hovering to see details).

**Core Screens and Views**
From a product perspective, the following conceptual screens are necessary to deliver the application's value:
*   **Dashboard/Home Page:** An overview screen displaying the balances of all accounts and a high-level summary of recent financial activity.
*   **Transaction View:** A detailed page for viewing, searching, and managing the list of all transactions.
*   **Add/Edit Transaction Form:** A dedicated form (likely a modal for speed) for creating or modifying a transaction.
*   **Account Management Page:** A settings page for creating and managing financial accounts/wallets.
*   **Category Management Page:** A settings page for managing transaction categories.

**Accessibility: WCAG AA**
As a best practice, the application should aim to meet WCAG 2.1 AA standards. This ensures it is usable by the widest possible audience, including those with disabilities. This involves using proper color contrast, keyboard navigation, and screen-reader-friendly markup.

**Branding**
No specific branding guidelines are required. The focus will be on creating a consistent and pleasant visual theme using a limited color palette, clean typography, and consistent spacing. The Architect and UX expert will define these specifics.

**Target Device and Platforms: Web Responsive**
The application will be designed with a "mobile-first" responsive approach, ensuring it is fully functional and easy to use on a range of screen sizes, from mobile phones to desktop monitors.

## 4. Technical Assumptions

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

## 5. Epic List

1.  **Epic 1: Foundational Ledger & Core Functionality**
    *   **Goal:** To establish the project foundation and implement all "Must-Have" features to create a usable, manual financial ledger.

2.  **Epic 2: Enhanced Functionality & Insights**
    *   **Goal:** To build upon the core ledger by adding "Should-Have" features like transaction categorization, editing, and visual reporting to provide deeper financial insights.

## 6. Epic 1: Foundational Ledger & Core Functionality

**Epic Goal:** To establish the complete project foundation, including the Next.js application setup, database connection, and deployment pipeline. This epic will implement all "Must-Have" MVP features, resulting in a usable, manual financial ledger where a user can manage accounts, add transactions, and see their financial summary.

---

**Story 1.1: Project Initialization and Deployment Setup**
*   **As a** developer,
*   **I want** to initialize a new Next.js project, connect it to a GitHub repository, and configure a CI/CD pipeline with Netlify,
*   **so that** I have a foundational, deployable codebase from day one.

**Acceptance Criteria:**
1.  A new Next.js application is created on the local machine.
2.  The project is successfully pushed to a new repository on GitHub.
3.  The GitHub repository is connected to a new site on Netlify.
4.  A basic "Hello World" or index page, when pushed to the main branch on GitHub, automatically triggers a deployment and becomes live on the Netlify URL.

---

**Story 1.2: Account Creation and Viewing**
*   **As a** user,
*   **I want** to create financial accounts with a name and starting balance and see a list of my accounts,
*   **so that** I can set up the different wallets where my money is managed.

**Acceptance Criteria:**
1.  The database schema for an "Accounts" table (with columns for name, starting balance, etc.) is created.
2.  A backend API endpoint exists to create a new account.
3.  A backend API endpoint exists to retrieve a list of all created accounts.
4.  A user interface is created with a form to input a new account's name and starting balance.
5.  Submitting the form successfully calls the create API and adds the new account to the database.
6.  The UI displays a list of all created accounts.

---

**Story 1.3: Add and View Transactions**
*   **As a** user,
*   **I want** to add new income and expense transactions to a specific account and see them in a monthly list,
*   **so that** I can track my financial activity and see my account balances update in real-time.

**Acceptance Criteria:**
1.  The database schema for a "Transactions" table is created and linked to the "Accounts" table.
2.  A backend API endpoint exists to create a new transaction (requiring amount, type, and account ID).
3.  A backend API endpoint exists to fetch all transactions for the current month.
4.  The UI provides a form to add a new transaction, including fields for amount, type (income/expense), and selecting the parent account.
5.  When a transaction is successfully added, the balance of the associated account is correctly recalculated and updated in the UI.
6.  The transaction list view correctly displays the new transaction.

---

**Story 1.4: Delete Transactions**
*   **As a** user,
*   **I want** to delete a transaction from the list,
*   **so that** I can correct errors in my financial ledger.

**Acceptance Criteria:**
1.  Each transaction in the list view has a visible "delete" button.
2.  A backend API endpoint exists to delete a transaction by its ID.
3.  Clicking the delete button triggers a confirmation prompt ("Are you sure?").
4.  Confirming the deletion calls the delete API and removes the transaction from the database.
5.  Upon successful deletion, the transaction is removed from the UI list, and the associated account balance is correctly recalculated and updated.

## 7. Epic 2: Enhanced Functionality & Insights

**Epic Goal:** To build upon the core ledger by adding "Should-Have" features. This epic will introduce transaction categorization to provide deeper financial insights, improve data management with editing and transfer capabilities, and enhance the user experience with visual reporting.

---

**Story 2.1: Transaction Categorization System**
*   **As a** user,
*   **I want** to create and manage categories, assign them to my transactions, and see them in the transaction list,
*   **so that** I can understand where my money is being spent or where it's coming from.

**Acceptance Criteria:**
1.  A "Categories" table is created in the database.
2.  The database is seeded with a default list of common categories (e.g., "Groceries", "Salary", "Utilities").
3.  Backend API endpoints are created for creating, reading, updating, and deleting categories.
4.  The "Transactions" table is updated to link to a category.
5.  The "Add Transaction" form is updated to include a dropdown to select a category.
6.  The transaction list view is updated to display the assigned category for each transaction.
7.  A dedicated UI page is created for managing categories (view, add, edit, delete).

---

**Story 2.2: Edit Existing Transactions**
*   **As a** user,
*   **I want** to edit the details of a transaction I have already entered,
*   **so that** I can correct mistakes without having to delete and re-create the entry.

**Acceptance Criteria:**
1.  Each transaction in the list view has a visible "edit" button.
2.  A backend API endpoint exists to update an existing transaction by its ID.
3.  Clicking the edit button opens a form pre-populated with the transaction's current data.
4.  Submitting the form successfully calls the update API and saves the changes.
5.  The UI correctly reflects the updated transaction details in the list.
6.  The balances of any affected accounts are correctly recalculated and updated.

---

**Story 2.3: Inter-Account Transfers**
*   **As a** user,
*   **I want** to log a transfer of funds from one of my accounts to another,
*   **so that** my account balances remain accurate when I move money internally.

**Acceptance Criteria:**
1.  A dedicated UI form is created for logging a transfer, including fields for "From Account", "To Account", and "Amount".
2.  A backend API endpoint is created to process the transfer.
3.  When a transfer is submitted, two transactions are created: an expense from the "From Account" and an income to the "To Account".
4.  Both transactions should be clearly identifiable as part of a transfer (e.g., via a special category or description).
5.  The balances of both affected accounts are correctly updated.

---

**Story 2.4: Add Optional Descriptions**
*   **As a** user,
*   **I want** to add an optional description or note to my transactions,
*   **so that** I can remember specific details about a purchase or income source.

**Acceptance Criteria:**
1.  The "Transactions" table in the database is updated to include an optional text field for a description.
2.  The "Add Transaction" and "Edit Transaction" forms are updated to include a text input for the description.
3.  The transaction list view is updated to display the description if one exists.
4.  The backend API endpoints for creating and updating transactions are updated to handle the new description field.

---

**Story 2.5: Visual Reporting Chart**
*   **As a** user,
*   **I want** to see a visual chart summarizing my monthly income and expenses,
*   **so that** I can quickly understand my financial status.

**Acceptance Criteria:**
1.  A chart component (e.g., a pie chart or bar chart) is added to the main dashboard or reporting view.
2.  A backend API endpoint is created to provide aggregated data for the monthly summary (e.g., total income, total expenses, spending by category).
3.  The chart accurately visualizes the total income versus total expenses for the current month.
4.  The chart is interactive (e.g., hovering over a chart segment displays its value).