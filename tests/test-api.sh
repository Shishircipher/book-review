#!/bin/bash

BASE_URL="http://localhost:3011"

# User credentials
EMAIL="jhon@example.com"
PASSWORD="jhon123"

echo "Signing up user..."
curl -s -X POST "$BASE_URL/auth/signup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  | jq

echo " Logging in..."
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}" \
  | jq -r '.token')

echo " Token received: $TOKEN"

# Add a book
echo " Adding a new book..."
BOOK_ID=$(curl -s -X POST "$BASE_URL/books" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Brave New World","author":"Aldous Huxley","genre":"	Dystopian"}' \
  | jq -r '.id')

echo " Book created with ID: $BOOK_ID"

# Get all books
echo " Listing books..."
curl -s "$BASE_URL/books?page=1&limit=5" | jq

# Submit a review
echo "Submitting a review..."
REVIEW_ID=$(curl -s -X POST "$BASE_URL/books/$BOOK_ID/reviews" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating":4.5, "comment":"Thought-provoking ,A satirical look at a controlled society."}' \
  | jq -r '.id')

echo "Review created with ID: $REVIEW_ID"

# Update the review
echo " Updating the review..."
curl -s -X PUT "$BASE_URL/reviews/$REVIEW_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating":5, "comment":"Thought-provoking and eerie. A satirical look at a controlled society."}' | jq

# Delete the review
echo " Deleting the review..."
curl -s -X DELETE "$BASE_URL/reviews/$REVIEW_ID" \
  -H "Authorization: Bearer $TOKEN" | jq

# Search for a book
echo " Searching for books with 'great'..."
curl -s "$BASE_URL/search?q=harper" | jq
