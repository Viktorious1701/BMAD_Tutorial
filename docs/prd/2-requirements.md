# 2. Requirements

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