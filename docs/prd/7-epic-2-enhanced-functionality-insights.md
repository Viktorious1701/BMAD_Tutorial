# 7. Epic 2: Enhanced Functionality & Insights

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