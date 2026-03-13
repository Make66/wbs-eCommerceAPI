Status Legend:
⬜ Not Started | ⏳ In Progress | ✅ Complete

## Project Overview

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR001 | Solo Project | Build the backend on your own. | ✅  |
| FR002 | Follow Group-Work Guidelines | Adhere to the bootcamp's teamwork practices throughout. | ✅  |
| FR003 | Single Public Repository | Use one public GitHub repo for the team; do not add instructors as collaborators. | ✅  |
| FR004 | PR-Only to main | All changes land on main via Pull Requests. | ✅  |

## Setup \& Architecture

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR005 | Express + TypeScript Bootstrap | You can start from [here](https://github.com/WebDev-WBSCodingSchool/wbs-node-ts-template) | ✅  |
| FR006 | MongoDB (Atlas or local) | Provision a MongoDB database (e.g., MongoDB Atlas) and manage the connection string via environment variables. | ✅  |
| FR007 | Mongoose Integration | Connect to MongoDB with Mongoose and expose a ready connection before starting the HTTP server. | ✅  |
| FR008 | Project Structure (TypeScript) | Follow the prescribed folders: `src/db/index.ts`, `src/controllers/*.ts`, `src/middleware/*.ts`, `src/models/*.ts`, `src/routes/*.ts`, `src/schemas/*.ts`, `src/app.ts`. | ✅  |
| FR009 | Zod Validation | Define Zod schemas for request body/params/query per resource; validate in routes before controllers. | ✅  |
| FR010 | Common Middleware | Enable JSON parsing, CORS, and centralized error handling with consistent error responses. | ✅  |

## Data Models (Mongoose)

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR011 | User Model | Fields: name (string), email (string), password (string). Ensure unique email at the DB or app layer. | ✅  |
| FR012 | Category Model | Fields: name (string, required). | ✅  |
| FR013 | Product Model | Fields: name, description, price (number), categoryId (ObjectId ref to Category). | ✅  |
| FR014 | Order Model | Fields: userId (ObjectId ref to User), products (array of { productId: ObjectId, quantity: number }), total (number), plus timestamps. | ✅  |
| FR015 | Response Shaping | Exclude sensitive fields (e.g., password) from all API responses; normalize _id to id where returned. | ✅ |

## Business Rules

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR016 | Product–Category Integrity | Create/Update Product must fail if categoryId does not reference an existing Category. | ✅ |
| FR017 | Order Integrity | Create/Update Order must fail if userId or any productId does not exist. | ✅ |
| FR018 | Order Total Calculation | Compute total from the current product prices × quantities during order create/update on the server. | ✅ |

## Endpoints (CRUD)

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR019 | Users CRUD | GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id. | ✅ |
| FR020 | Products CRUD | GET /products (?categoryId= filter), POST /products, GET /products/:id, PUT /products/:id, DELETE /products/:id. | ✅ |
| FR021 | Categories CRUD | GET /categories, POST /categories, GET /categories/:id, PUT /categories/:id, DELETE /categories/:id. | ✅ |
| FR022 | Orders CRUD | GET /orders, POST /orders, GET /orders/:id, PUT /orders/:id, DELETE /orders/:id. | ✅ |

## Documentation \& Tooling

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR023 | Swagger UI | Once the entire app is implemented, add documentation with Swagger UI | ✅ |
