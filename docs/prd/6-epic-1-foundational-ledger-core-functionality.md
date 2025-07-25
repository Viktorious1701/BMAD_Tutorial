# 6. Epic 1: Foundational Ledger & Core Functionality

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