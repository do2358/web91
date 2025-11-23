# TeachingX API Integration Guide

## Overview

This guide helps frontend developers understand and integrate with the TeachingX API. Two documentation files are provided:

1. **`postman_collection.json`** - Postman Collection for testing
2. **`api-specification.yaml`** - OpenAPI 3.0 specification

## Quick Start

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Users (CRUD)
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

#### Posts (CRUD)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `GET /api/posts/{id}` - Get post by ID
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post

#### Upload
- `POST /api/upload` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## How to Use Postman Collection

### 1. Import the Collection
- Open Postman
- Click "Import" button
- Select `postman_collection.json` file
- Collection will be imported with all endpoints

### 2. Set Environment Variables
In Postman, create environment variables:
```
base_url = http://localhost:3000
token = your_jwt_token_here
user_id = replace_with_user_id
post_id = replace_with_post_id
```

### 3. Test Endpoints
- Select an endpoint from the collection
- Modify request body if needed
- Click "Send"
- Check response in the panel below

## How to Use OpenAPI/YAML Specification

### 1. View in Swagger UI
The API includes Swagger UI at:
```
http://localhost:3000/api-docs
```

### 2. Import in Other Tools
- **Insomnia**: File → Import → `api-specification.yaml`
- **VS Code**: Install OpenAPI extension
- **SwaggerHub**: Import file directly
- **ReDoc**: Host the YAML for documentation

## Authentication

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

## User Management

### Get All Users
```bash
GET /api/users
```

### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "username": "jane_doe",
  "email": "jane@example.com",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Get User by ID
```bash
GET /api/users/{{user_id}}
```

### Update User
```bash
PUT /api/users/{{user_id}}
Content-Type: application/json

{
  "username": "jane_doe_updated",
  "email": "jane_updated@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

### Delete User
```bash
DELETE /api/users/{{user_id}}
```

## Posts Management

### Get All Posts
```bash
GET /api/posts
```

**Query Parameters:**
- `limit` - Number of posts to return (default: 20)
- `skip` - Number of posts to skip (default: 0)
- `author` - Filter by author ID

### Create Post
```bash
POST /api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my first post",
  "author": "507f1f77bcf86cd799439011",
  "image": "https://example.com/post-image.jpg"
}
```

### Get Post by ID
```bash
GET /api/posts/{{post_id}}
```

### Update Post
```bash
PUT /api/posts/{{post_id}}
Content-Type: application/json

{
  "title": "Updated Post Title",
  "content": "Updated post content",
  "image": "https://example.com/updated-image.jpg"
}
```

### Delete Post
```bash
DELETE /api/posts/{{post_id}}
```

## File Upload

### Upload Single Image
```bash
POST /api/upload
Content-Type: multipart/form-data

file: <binary_file_data>
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "teaching-x/..."
  }
}
```

### Upload Multiple Images
```bash
POST /api/upload/multiple
Content-Type: multipart/form-data

files: [<file1>, <file2>, ...]
```

**Response:**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "data": [
    {
      "url": "https://res.cloudinary.com/...",
      "public_id": "teaching-x/..."
    },
    {
      "url": "https://res.cloudinary.com/...",
      "public_id": "teaching-x/..."
    }
  ]
}
```

## Frontend Integration Examples

### JavaScript/Fetch API
```javascript
// Register
const registerUser = async (username, email, password) => {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
};

// Get all posts
const getPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts');
  return response.json();
};

// Create post
const createPost = async (title, content, author, image) => {
  const response = await fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, author, image })
  });
  return response.json();
};
```

### React Hooks
```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
};

// Usage
const { data: posts, loading, error } = useFetch('http://localhost:3000/api/posts');
```

### Axios
```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Register
export const registerUser = (username, email, password) =>
  apiClient.post('/auth/register', { username, email, password });

// Get all posts
export const getPosts = () => apiClient.get('/posts');

// Create post
export const createPost = (title, content, author, image) =>
  apiClient.post('/posts', { title, content, author, image });

// Upload image
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('/upload', formData);
};
```

## Error Handling

All endpoints follow this error response format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": "Specific error message"
  }
}
```

### Common Status Codes
- `200 OK` - Successful GET/PUT/DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource already exists
- `500 Server Error` - Server error

## Database Models

### User Schema
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required),
  author: ObjectId (reference to User),
  image: String (optional),
  likes: Number (default: 0),
  comments: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## Support

For issues or questions:
- Check the Swagger documentation: `http://localhost:3000/api-docs`
- Review Postman collection for request examples
- Check error messages and validation rules

## Files Included

1. **postman_collection.json** - Import in Postman for testing
2. **api-specification.yaml** - OpenAPI 3.0 specification
3. **API_INTEGRATION_GUIDE.md** - This file

---

**Last Updated:** November 23, 2025
**API Version:** 1.0.0
