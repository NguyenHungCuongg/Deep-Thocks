# Copilot Instructions – Deep Thocks E-commerce

## Project Overview

Deep Thocks is an e-commerce application for selling keyboards.

Tech stack:

- Backend: Java Spring Boot
- Database: PostgreSQL
- Frontend: React + TailwindCSS
- Payment: VNPAY

Roles:

- Admin
- User
- Guest

## General Coding Rules

- Do NOT include comments inside the code.
- Explanations must be written outside code blocks (chat only).
- Prioritize clean, production-ready code.
- Follow SOLID principles and clean architecture.
- Use meaningful naming conventions.

## Backend (Spring Boot)

- Use layered architecture:
  - Controller
  - Service
  - Repository
  - Entity
- Use DTOs for request/response separation.
- Validate all inputs (Bean Validation).
- Use transaction management (`@Transactional`) where necessary.
- Handle exceptions globally with `@ControllerAdvice`.

## Database (PostgreSQL)

- Use normalized schema.
- Use constraints:
  - NOT NULL
  - UNIQUE
  - FOREIGN KEY
- Use indexing for performance on:
  - product_id
  - user_id
  - order_id

## Inventory & Concurrency (CRITICAL)

- Prevent overselling:
  - Use optimistic locking (`@Version`) OR pessimistic locking (`FOR UPDATE`)
- Stock must only be reduced when:
  - Payment is confirmed (VNPAY success callback)
- Handle race conditions:
  - Ensure atomic updates (single transaction)
- Implement retry mechanism for concurrency conflicts if needed
- Validate stock before placing order AND before final confirmation

## Order Flow

1. User creates order
2. System checks inventory
3. Redirect to VNPAY
4. On payment success:
   - Confirm order
   - Deduct inventory
5. On failure:
   - Cancel order

## Payment (VNPAY)

- Validate secure hash from VNPAY response
- Never trust client-side payment result
- Process payment confirmation via backend callback

## Authentication & Authorization

- Use JWT
- Role-based access:
  - Admin: full access
  - User: purchase, view orders
  - Guest: browse only

## Frontend (React + Tailwind)

- Use component-based structure
- Separate API logic from UI
- Handle loading and error states
- Protect routes based on roles

## API Design

- RESTful conventions
- Use proper HTTP methods:
  - GET, POST, PUT, DELETE
- Standard response format:
  - success
  - message
  - data

## Testing

- Unit tests for services
- Integration tests for critical flows:
  - order creation
  - payment confirmation
  - inventory update

## Performance & Scalability

- Avoid N+1 queries
- Use pagination for product listing
- Cache frequently accessed data if needed
