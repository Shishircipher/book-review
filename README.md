
#  Book Review API

RESTful API for a Book Review system.  Built with **Node.js**, **Express**, and **PostgreSQL**, it features JWT-based authentication, relational schema  and basic CRUD operations for books and reviews.

---

##  Features

- JWT-based user authentication (signup/login)
- Add/get books (with author & genre)
- Add/edit/delete one review per user per book
- Pagination for listing books and reviews
- Filter by author and genre
- Search by title or author (case-insensitive)

---

##  Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shishircipher/book-review.git
cd book-review
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Rename a `.env.exmaple`file to `.env`file in the root and add your JWT secret and Database Url.

```env
DATABASE_URL=postgres://username:password@localhost:5432/bookdb
JWT_SECRET=your_jwt_secret
```

### 4. Set Up the PostgreSQL Database

Run the SQL schema in your DB:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  book_id INTEGER REFERENCES books(id),
  rating REAL,
  comment TEXT
);

```

---
### ER Diagram directory:


[ER-Diagram](https://github.com/Shishircipher/book-review/tree/main/src/migrations/er-diagram.png)

---
##  How to Run Locally



with development auto-reload:

```bash
npm run dev
```

Once running:
Go to `http://localhost:3011` – you’ll see:

```json
{ "message": "Book Review API is running..." }
```

---

##  Running Tests

### Test directory:

All test scripts are inside:

```
/tests/test-api.sh
```

### To run tests:

```bash
npm run test
```

> The test script uses `curl` to test endpoints like `/signup`, `/login`, `/books`, `/reviews`, etc.

---

##  API Endpoints Summary

---
1. Authentication:
Implement JWT-based user authentication
Endpoints:
- POST /signup – register a new user
- POST /login – authenticate and return a token

2. Core Features:
- POST /books – Add a new book (Authenticated users only)
- GET /books – Get all books (with pagination and optional filters by author and genre)
- GET /books/:id – Get book details by ID, including:
Average rating
Reviews (with pagination)
- POST /books/:id/reviews – Submit a review (Authenticated users only, one review per user per book).
- PUT /reviews/:id – Update your own review
- DELETE /reviews/:id – Delete your own review
- GET /search – Search books by title or author (partial and case-insensitive)

##  Design Decisions & Assumptions

* **Users can post only one review per book**
* **Search is case-insensitive and partial match** using SQL `ILIKE`
* **JWT is stored on client side (e.g., browser) and passed via `Authorization: Bearer <token>`**
* Reviews and books are **only editable by the user who created them**
* Pagination uses `?page=1&limit=10`

---




