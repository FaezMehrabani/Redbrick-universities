# University Search Web App

## Overview

This is a **Next.js** web application that retrieves and displays university data from a local database. Users can search universities by country and name, add universities to their favorites, and track API performance metrics.

## Features

### **Search Page**

- Dropdown to filter universities by country.
- Search box to filter universities by name.
- Table displaying:
  - University Name
  - State/Province
  - Website
- Button to **add/remove** a university from favorites.
- API performance tracking:
  - API response code.
  - Time taken to retrieve data (in milliseconds).
- "Clear All Filters" button resets filters (default: **Canada** selected).
- Link to navigate to the **Favorites Page**.
- Fully responsive UI (mobile to desktop).

### **Favorites Page**

- Displays saved universities in a table.
- Table columns:
  - University Name
  - State/Province
  - Website
- Button to remove an item from favorites.
- Link to navigate back to the **Search Page**.
- Favorites data is stored in a **SQLite database**.
- Table updates immediately when a favorite is removed.
- Fully responsive UI.

## **Tech Stack**

- **Frontend**: Next.js 15.1.6, React 19.0.0
- **Database**: SQLite (better-sqlite3)
- **Backend**: API endpoints built with Next.js API routes

## **Setup Instructions**

### **1. Clone the Repository**

```sh
git clone https://github.com/FaezMehrabani/Redbrick-universities.git
cd Redbrick-universities
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Set Up the Database**

university database is already pushed into this repo, if you want to recreate the database to explore more
you just need to run

```sh
node initdb.js
```

it will create the database with name "universities.db" with two table in there:

1- universities:
which reading the json file of universities that has beed downloaded from this repo "https://github.com/Hipo/university-domains-list" stored in a json file in db folder and import them into the table

2- favorites:
which will be using to store the favorite universities

### **4. Run the Application Locally**

```sh
npm run dev
```

The app will be available at: [**http://localhost:3000**](http://localhost:3000)

## **API Endpoints**

### **1. Search Universities**

```http
GET /api/universities?country=CANADA&name=Toronto
```

**Response:**

```json
[
  {
    "id": 7,
    "name": "Toronto Baptist Seminary and Bible College",
    "domains": ["tbs.edu"],
    "web_pages": ["https://tbs.edu"],
    "country": "Canada",
    "alpha_two_code": "CA",
    "state_province": "Ontario"
  }
]
```

### **2. Add to Favorites**

```http
POST /api/favorites
```

**Request Body:**

```json
{
  "universityId": 6025
}
```

### **3. Remove from Favorites**

```http
DELETE /api/favorites
```

**Request Body:**

```json
{
  "universityId": 6028
}
```

## **License**

This project is open-source and available under the **MIT License**.

---

### **Author**

Faez mehrabani – [GitHub](https://github.com/FaezMehrabani)
