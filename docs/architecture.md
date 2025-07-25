# Personal Wallet App Fullstack Architecture Document

## 1. Introduction

This document outlines the complete fullstack architecture for the Personal Wallet App, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

**Starter Template or Existing Project**
The project will be initialized using the standard `create-next-app` command to create a clean Next.js application. This provides a solid, community-standard foundation.

Immediately following initialization, we will integrate **`shadcn/ui`** as the primary UI component library. This will provide a collection of accessible, high-quality, and customizable components to accelerate frontend development and ensure a clean, modern aesthetic. This approach combines the stability of a standard Next.js installation with the speed of a top-tier component library.

**Change Log**
| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| July 24, 2025 | 1.0 | Initial architecture draft. | Winston, Architect |

## 2. High Level Architecture

**Technical Summary**
The application will be a modern full-stack web application built using the Next.js framework within a monorepo structure. It will feature server-side rendering (SSR) for fast initial page loads and a client-side interactive experience. The backend logic will be handled via Next.js API Routes, which will communicate with a PostgreSQL database. The entire application will be deployed on Netlify, leveraging its seamless Git-based CI/CD workflow. This architecture is chosen for its simplicity, development speed, and alignment with the project's learning goals, providing a robust yet manageable foundation for a solo developer.

**Platform and Infrastructure Choice**
*   **Platform:** Netlify
*   **Key Services:**
    *   **Hosting:** Netlify's core hosting platform for Next.js applications.
    *   **CI/CD:** Netlify's built-in Continuous Integration and Deployment from a GitHub repository.
    *   **Serverless Functions:** Netlify Functions will be used to deploy the Next.js API Routes.
*   **Deployment Host and Regions:** Netlify's global edge network will be used for hosting. The database will be hosted separately (e.g., on a free-tier provider like Supabase or Railway) in a region geographically close to the user.

**Repository Structure**
*   **Structure:** Monorepo.
*   **Monorepo Tool:** We will use standard npm/yarn/pnpm workspaces. No complex monorepo tool like Nx or Turborepo is necessary for a project of this scale, keeping the setup simple.
*   **Package Organization:** All code (frontend, backend API routes, shared types) will reside within the single Next.js application structure created by `create-next-app`.

**High Level Architecture Diagram**
```mermaid
graph TD
    User[💻 User's Browser] -- HTTPS --> Edge[Netlify Edge Network]
    
    subgraph Netlify Platform
        Edge -- Serves Static Assets --> App[Next.js Frontend (React/shadcn/ui)]
        Edge -- Invokes --> API[Next.js API Routes (Serverless Functions)]
    end

    subgraph External Services
        DB[(PostgreSQL Database)]
    end

    App -- Fetches Data --> API
    API -- Queries/Mutates Data --> DB

    subgraph Development Workflow
        Dev[🧑‍💻 Developer] -- Pushes Code --> GitHub[GitHub Repository]
        GitHub -- Triggers Deploy --> Edge
    end

    style App fill:#add8e6
    style API fill:#add8e6
    style DB fill:#lightgreen
```

**Architectural Patterns**
*   **Full-Stack Framework (Next.js):** Using a single framework for both frontend and backend simplifies development, reduces context switching, and allows for easy type sharing. *Rationale:* Perfect for a solo developer and aligns with learning goals.
*   **Component-Based UI (React + shadcn/ui):** Building the UI from small, reusable components. *Rationale:* Ensures a maintainable, consistent, and scalable frontend. `shadcn/ui` accelerates this process with high-quality primitives.
*   **Serverless Functions (Next.js API Routes / Netlify Functions):** Handling backend logic with stateless, auto-scaling functions. *Rationale:* Eliminates the need for server management and aligns perfectly with the "no budget" constraint by leveraging free-tier function invocations.
*   **Repository Pattern (for Data Access):** Creating an abstraction layer between the API routes and the PostgreSQL database. *Rationale:* Decouples business logic from the database, making the code easier to test and maintain.

## 3. Tech Stack

| Category | Technology | Version | Purpose | Rationale |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Language** | TypeScript | ~5.3.3 | Primary language for type safety and scalability. | Industry standard for modern web development, enables robust code. |
| **Frontend Framework** | Next.js | ~14.1.0 | The core React framework for the application. | Meets user learning goals, provides a full-stack toolkit. |
| **UI Library** | React | ~18.2.0 | The declarative library for building user interfaces. | The foundation of Next.js. |
| **UI Component Library**| shadcn/ui | Latest | Provides unstyled, accessible components to build the UI. | Accelerates development of a clean, consistent UI. |
| **Styling** | Tailwind CSS | ~3.4.1 | A utility-first CSS framework for rapid styling. | Works seamlessly with Next.js and shadcn/ui. |
| **State Management** | Zustand | ~4.5.0 | A simple, fast state management solution for React. | Minimalistic and easy to learn, avoids boilerplate for this simple app. |
| **Form Handling** | React Hook Form | ~7.50.0 | Performant, flexible, and extensible forms with easy-to-use validation. | Simplifies form state management and validation. |
| **Backend Language** | TypeScript | ~5.3.3 | Consistent language across the stack. | Simplifies development by using one language for front and back end. |
| **Backend Framework** | Next.js API Routes | ~14.1.0 | The built-in framework for creating API endpoints. | Tightly integrated with the frontend, perfect for the chosen architecture. |
| **Database** | PostgreSQL | 16 | The primary relational database for storing all application data. | Powerful, reliable, and has a rich feature set. Meets user preference. |
| **ORM / DB Toolkit** | Drizzle ORM | Latest | A modern TypeScript ORM for interacting with the database. | Provides excellent type-safety and performance, superior to many traditional ORMs. |
| **Frontend Testing** | Vitest | ~1.2.2 | A fast unit and component testing framework. | Modern, fast, and has a Jest-compatible API, making it easy to use. |
| **E2E Testing** | Playwright | ~1.41.2 | For end-to-end testing of critical user flows. | Powerful and reliable for testing the application from a user's perspective. |
| **Build Tool** | Next.js CLI | ~14.1.0 | The command-line interface for Next.js handles all build processes. | The native build tool for Next.js, no other is needed. |
| **CI/CD** | Netlify | - | Continuous integration and deployment platform. | Seamlessly integrates with GitHub for automatic deployments. Meets user preference. |
| **Logging** | Pino | ~8.19.0 | A very low-overhead logger for Node.js. | Ensures performant logging in serverless environments. |

## 4. Data Models

**Account**
*   **Purpose:** Represents a financial wallet or bucket where funds are managed (e.g., "Personal Savings", "Family Expenses").
*   **Key Attributes:**
    *   `id`: `string` - Unique identifier (e.g., CUID).
    *   `name`: `string` - User-defined name for the account.
    *   `startingBalance`: `number` - The initial balance of the account when created.
*   **Relationships:** An `Account` has many `Transactions`.

```typescript
// TypeScript Interface for Account
export interface Account {
  id: string;
  name: string;
  startingBalance: number;
  userId: string; // To associate with a user in the future
  createdAt: Date;
  updatedAt: Date;
}
```

**Transaction**
*   **Purpose:** Represents a single financial event, either an income or an expense, linked to a specific account.
*   **Key Attributes:**
    *   `id`: `string` - Unique identifier.
    *   `amount`: `number` - The monetary value of the transaction.
    *   `type`: `'income' | 'expense'` - The nature of the transaction.
    *   `description`: `string | null` - An optional user-provided note.
*   **Relationships:** A `Transaction` belongs to one `Account` and belongs to one `Category`.

```typescript
// TypeScript Interface for Transaction
export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  description?: string | null;
  accountId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

**Category**
*   **Purpose:** Represents a user-defined category for tagging transactions to understand spending habits (e.g., "Groceries", "Utilities", "Salary").
*   **Key Attributes:**
    *   `id`: `string` - Unique identifier.
    *   `name`: `string` - The name of the category.
*   **Relationships:** A `Category` has many `Transactions`.

```typescript
// TypeScript Interface for Category
export interface Category {
  id: string;
  name: string;
  userId: string; // To associate with a user in the future
  createdAt: Date;
  updatedAt: Date;
}
```

## 5. API Specification

```yaml
openapi: 3.0.0
info:
  title: Personal Wallet API
  version: 1.0.0
  description: API for managing personal financial accounts, transactions, and categories.

servers:
  - url: /api
    description: Local API server

paths:
  /accounts:
    get:
      summary: Get all accounts
      responses:
        '200':
          description: A list of accounts.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Account'
    post:
      summary: Create a new account
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewAccount'
      responses:
        '201':
          description: The created account.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Account'

  /transactions:
    get:
      summary: Get all transactions for the current month
      responses:
        '200':
          description: A list of transactions.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Transaction'
    post:
      summary: Create a new transaction
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewTransaction'
      responses:
        '201':
          description: The created transaction.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'

  /transactions/{id}:
    put:
      summary: Update a transaction
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateTransaction'
      responses:
        '200':
          description: The updated transaction.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Transaction'
    delete:
      summary: Delete a transaction
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '204':
          description: Transaction deleted successfully.

  /categories:
    get:
      summary: Get all categories
      responses:
        '200':
          description: A list of categories.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Category'
    post:
      summary: Create a new category
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewCategory'
      responses:
        '201':
          description: The created category.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Category'
  
  /transfers:
    post:
      summary: Create an inter-account transfer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewTransfer'
      responses:
        '201':
          description: Transfer created successfully.

components:
  schemas:
    Account:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        startingBalance:
          type: number
    NewAccount:
      type: object
      properties:
        name:
          type: string
        startingBalance:
          type: number
    Transaction:
      type: object
      properties:
        id:
          type: string
        amount:
          type: number
        type:
          type: string
          enum: [income, expense]
        description:
          type: string
        accountId:
          type: string
        categoryId:
          type: string
    NewTransaction:
      type: object
      properties:
        amount:
          type: number
        type:
          type: string
          enum: [income, expense]
        description:
          type: string
        accountId:
          type: string
        categoryId:
          type: string
    UpdateTransaction:
      type: object
      properties:
        amount:
          type: number
        type:
          type: string
          enum: [income, expense]
        description:
          type: string
        categoryId:
          type: string
    Category:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
    NewCategory:
      type: object
      properties:
        name:
          type: string
    NewTransfer:
      type: object
      properties:
        fromAccountId:
          type: string
        toAccountId:
          type: string
        amount:
          type: number
```

## 6. Database Schema

```sql
-- Accounts Table
-- Represents a financial wallet or bucket where funds are managed.
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT cuid(),
    "name" TEXT NOT NULL,
    "starting_balance" DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    "user_id" TEXT, -- For future multi-user support
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- Categories Table
-- Represents user-defined categories for tagging transactions.
CREATE TABLE "categories" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT cuid(),
    "name" TEXT NOT NULL,
    "user_id" TEXT, -- For future multi-user support
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- Transactions Table
-- Represents a single financial event, either income or expense.
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT cuid(),
    "amount" DECIMAL(10, 2) NOT NULL,
    "type" TEXT NOT NULL, -- 'income' or 'expense'
    "description" TEXT,
    "account_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "transactions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Add indexes for faster lookups on foreign keys and user_id
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");
CREATE INDEX "categories_user_id_idx" ON "categories"("user_id");
CREATE INDEX "transactions_account_id_idx" ON "transactions"("account_id");
CREATE INDEX "transactions_category_id_idx" ON "transactions"("category_id");
```
**Schema Notes:**
*   **IDs:** We will use `TEXT` with a `cuid()` default for IDs for collision-resistant, URL-friendly unique IDs.
*   **Decimal Type:** `DECIMAL(10, 2)` is used for monetary values to avoid floating-point precision issues.
*   **Foreign Keys:** Deleting an account cascades to delete its transactions. Deleting a category in use by a transaction is restricted.
*   **Timestamps:** Standard `created_at` and `updated_at` are included.
*   **user\_id:** Included on `accounts` and `categories` for future-proofing, though it will not be used in the MVP.

## 7. Frontend Architecture

**Component Architecture**
*   **Component Organization:** We will follow a standard, feature-based organization. Core, reusable components (from `shadcn/ui`) will live in a `components/ui` directory. Feature-specific components (`TransactionForm`, `AccountList`) will live in a `components/features` directory.
    ```text
    /app
    ├── /components
    │   ├── /ui/          # Core reusable UI elements from shadcn/ui
    │   └── /features/    # Feature-specific components
    │       ├── /accounts/
    │       │   └── AccountList.tsx
    │       └── /transactions/
    │           └── TransactionForm.tsx
    └── ...
    ```
*   **Component Template:** All React components will be written in TypeScript (`.tsx`) and follow a standard functional component pattern.
    ```typescript
    import React from 'react';
    import { cn } from '@/lib/utils'; // For combining class names

    // Define component props with TypeScript
    interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
      customProp: string;
    }

    const MyComponent = ({ customProp, className, ...props }: MyComponentProps) => {
      return (
        <div className={cn('p-4', className)} {...props}>
          {customProp}
        </div>
      );
    };

    export default MyComponent;
    ```

**State Management Architecture**
*   **State Solution:** We will use **Zustand** for global state management. For local component state, we will use standard React hooks (`useState`, `useReducer`).
*   **State Structure:** The Zustand store will be organized by "slices" or domains, such as `accountSlice` or `transactionSlice`, to keep state logic separated and maintainable.
    ```typescript
    // Example store slice for accounts
    import { create } from 'zustand';
    import { Account } from '@/types'; // Assuming shared types

    interface AccountState {
      accounts: Account[];
      setAccounts: (accounts: Account[]) => void;
      addAccount: (account: Account) => void;
    }

    export const useAccountStore = create<AccountState>((set) => ({
      accounts: [],
      setAccounts: (accounts) => set({ accounts }),
      addAccount: (account) => set((state) => ({ accounts: [...state.accounts, account] })),
    }));
    ```

**Routing Architecture**
*   **Routing Solution:** We will use the **Next.js App Router**, which is the current standard. Routes are defined by creating folders within the `/app` directory.
*   **Route Organization:**
    *   `/app/page.tsx`: The main dashboard/homepage.
    *   `/app/accounts/page.tsx`: Page for managing accounts.
    *   `/app/transactions/page.tsx`: Page for viewing all transactions.
    *   `/app/categories/page.tsx`: Page for managing categories.
    *   `/app/api/...`: All backend API routes will be organized under this directory.