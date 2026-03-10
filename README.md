## Project Overview

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR001 | Solo Project | Build the backend on your own. | Check |
| FR002 | Follow Group-Work Guidelines | Adhere to the bootcamp's teamwork practices throughout. | Check |
| FR003 | Single Public Repository | Use one public GitHub repo for the team; do not add instructors as collaborators. | Check |
| FR004 | PR-Only to main | All changes land on main via Pull Requests. | Check |

## Setup \& Architecture

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR005 | Express + TypeScript Bootstrap | You can start from [here](https://github.com/WebDev-WBSCodingSchool/wbs-node-ts-template) | Check |
| FR006 | MongoDB (Atlas or local) | Provision a MongoDB database (e.g., MongoDB Atlas) and manage the connection string via environment variables. | Check |
| FR007 | Mongoose Integration | Connect to MongoDB with Mongoose and expose a ready connection before starting the HTTP server. | Check |
| FR008 | Project Structure (TypeScript) | Follow the prescribed folders: `src/db/index.ts`, `src/controllers/*.ts`, `src/middleware/*.ts`, `src/models/*.ts`, `src/routes/*.ts`, `src/schemas/*.ts`, `src/app.ts`. | Check |
| FR009 | Zod Validation | Define Zod schemas for request body/params/query per resource; validate in routes before controllers. | In Process |
| FR010 | Common Middleware | Enable JSON parsing, CORS, and centralized error handling with consistent error responses. | Not Started |

## Data Models (Mongoose)

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR011 | User Model | Fields: name (string), email (string), password (string). Ensure unique email at the DB or app layer. | Check |
| FR012 | Category Model | Fields: name (string, required). | Check |
| FR013 | Product Model | Fields: name, description, price (number), categoryId (ObjectId ref to Category). | Check |
| FR014 | Order Model | Fields: userId (ObjectId ref to User), products (array of { productId: ObjectId, quantity: number }), total (number), plus timestamps. | Check |
| FR015 | Response Shaping | Exclude sensitive fields (e.g., password) from all API responses; normalize _id to id where returned. | Not Started |

## Business Rules

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR016 | Product–Category Integrity | Create/Update Product must fail if categoryId does not reference an existing Category. | Not Started |
| FR017 | Order Integrity | Create/Update Order must fail if userId or any productId does not exist. | Not Started |
| FR018 | Order Total Calculation | Compute total from the current product prices × quantities during order create/update on the server. | Not Started |

## Endpoints (CRUD)

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR019 | Users CRUD | GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id. | Not Started |
| FR020 | Products CRUD | GET /products (?categoryId= filter), POST /products, GET /products/:id, PUT /products/:id, DELETE /products/:id. | Not Started |
| FR021 | Categories CRUD | GET /categories, POST /categories, GET /categories/:id, PUT /categories/:id, DELETE /categories/:id. | Not Started |
| FR022 | Orders CRUD | GET /orders, POST /orders, GET /orders/:id, PUT /orders/:id, DELETE /orders/:id. | Not Started |

## Documentation \& Tooling

| ID | Functional Requirement | Description | Status |
| :-- | :-- | :-- | :-- |
| FR023 | Swagger UI | Once the entire app is implemented, add documentation with Swagger UI | Not Started |
