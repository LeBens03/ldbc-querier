# LDBC Project: Social Network Data Explorer

## Overview

This project is a full-stack web application for exploring and analyzing social network data, inspired by the LDBC Social Network Benchmark. It features a React frontend (built with Vite) and a Node.js backend that connects to both Neo4j (graph database) and MongoDB (document database). The app allows users to view, filter, and analyze persons, posts, and organizations, as well as cross-database queries.

---

## Features

### Frontend (React + Vite)
- **Modern UI**: Built with Material-UI for a clean interface.
- **Persons View**: List, filter, and analyze persons from Neo4j.
- **Posts View**: List and filter posts from MongoDB, including language statistics.
- **Organizations View**: List and analyze organizations from Neo4j.
- **Cross-Database Queries**: Filter persons by organization and minimum number of liked posts (joins Neo4j and MongoDB).
- **Modals & Details**: View acquaintances and language statistics in modals.
- **Horizontal Card Scroll**: Cards for persons, posts, and organizations are displayed in horizontally scrollable rows.
- **Loading & Error Handling**: User feedback for loading states and errors.

### Backend (Node.js + Express)
- **Neo4j Integration**: Fetches persons, organizations, and relationships using Cypher queries.
- **MongoDB Integration**: Fetches and aggregates posts, including language statistics.
- **Cross-DB Logic**: Combines data from both databases for advanced queries.
- **RESTful API**: Clean endpoints for all data operations.

---

## Technologies Used

- **Frontend**: React, Vite, Material-UI, Axios
- **Backend**: Node.js, Express, Neo4j Driver, Mongoose/MongoDB
- **Databases**: Neo4j (graph), MongoDB (document)
- **Other**: ESLint, Prettier

---

## Project Structure

```
ldbc_project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── neo4jControllers.js
│   │   │   ├── mongoControllers.js
│   │   │   └── crossdbControllers.js
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Person.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── OrganizationCard.jsx
│   │   │   ├── MostAcquaintances.jsx
│   │   │   └── LanguageCount.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Neo4j database, the following has been uploaded from LDBC SNB
    - Person   
    - Organisation
    - Place
    - Person_knows_Person
    - Person_studyAt_University
    - Person_workAt_Company
- MongoDB database the following has been uploaded from LDBC SNB
    - Post
    - Tag
    - TagClass
    - Comment
    - Comment_hasTag_Tag
    - Person_hasInterest_Tag
    - Person_likes_Comment
    - Person_likes_Post
    - Forum
    - Forum_hasTag_Tag
    - Forum_hasMember_Person

### 1. Clone the Repository

```sh
git clone https://github.com/LeBens03/ldbc_project.git
```

### 2. Backend Setup

```sh
cd backend
npm install
# Configure your Neo4j and MongoDB connection strings in a .env file or config file
npm run dev
```

- **Environment Variables**:  
  - `NEO4J_URI`, `NEO4J_USER`, `NEO4J_PASSWORD`
  - `MONGODB_URI`

### 3. Frontend Setup

```sh
cd ../frontend
npm install
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## API Endpoints

### Neo4j Endpoints

- `GET /api/neo4j/` — List all persons
- `GET /api/neo4j/organizations` — List all organizations
- `GET /api/neo4j/acquaintances/:id` — Get acquaintances for a person
- `GET /api/neo4j//most-acquaintances/:count` — Top X persons with most acquaintances

### MongoDB Endpoints

- `GET /api/mongodb/` — List all posts
- `GET /api/mongodb/count` — Posts count by language
- `GET /api/mongodb/:year` — Filter posts by year

### Cross-Database Endpoints

- `GET /api/crossdb/members/:org/:minLikes`  — Persons in an organization who liked at least X posts
- `GET /api/crossdb/organizations/:count` - Most active organizations in terms of members's number of acquaintances and posts likes

---

## Usage

- **Persons Section**:  
  - Filter by number of acquaintances or by organization and minimum likes.
  - Click "Look up acquaintances" to see a person's connections.

- **Posts Section**:  
  - Filter posts by year.
  - Get post counts by language.

- **Organizations Section**:  
  - View most active organizations and their stats.

---

## Customization

- **Styling**:  
  - Edit `frontend/src/App.css` for layout and theme changes.
- **Database**:  
  - Use your own Neo4j and MongoDB datasets, but ensure the schema matches the queries.

---

## Troubleshooting

- **CORS Issues**:  
  - Make sure the backend enables CORS for the frontend origin.
- **Database Connection Errors**:  
  - Check your connection strings and database status.
- **Data Not Showing**:  
  - Ensure your databases are populated and the backend is running.

---

## License

MIT License

---

## Credits

- [LDBC Social Network Benchmark](https://ldbcouncil.org/ldbc_snb_docs/)
- [Neo4j](https://neo4j.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)

---

## Contact

For questions or contributions, open an issue or contact [benslimanetaha03@gmail.com](mailto:benslimanetaha03@gmail.com).
