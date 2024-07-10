
## Setup Instructions
Install:
- Node.js + NPM - install [here](https://nodejs.org/en/download/package-manager) (we highly recommend using at least Node 18.0.0 + NPM 8.6.0)
- Git - install [here](https://git-scm.com/downloads)

1. Clone this repo on to your computer. You can do so with the [desktop app](https://desktop.github.com/), or in a terminal with the following:
```
git clone [https://github.com/sf0628/C4C-Fall2024.git]
```
2. In a terminal, run `npm install` **at the root of this project** to install the required packages
3. Run `npm run dev` **at the root of this project** to start the app locally
4. Visit `http://localhost:3000` to view the website
    
    4a. The backend will be available at `http://localhost:4000`

5. Access the dashboard by logging in as an admin
   Username: `admin`
   Password: `admin123`
6. Once logged in, you can view, add, delete, and search partner organizations.

## Overview
This application is designed to manage and display infomration about partner organizations. It provides functionality for viewing, filter, deleting, and searching partner information. It also includes authorization to control access to the dashboard.

## Features
1. Authorization: The application includes an admin login feature to control who can access the dashboard.
2. Add Partners: Users can add new partner organizations by providing organization details.
3. Partner Display: Users can view partner organizations' information with the organization's name, logo (by URL), description of the organization and how we support them, and the active status.
4. Search Partner: Users can search for specific organizations by title or active status.
5. Data Persistence: Partner information is stored in a central place and persists even when the app is restarted by saving data to a JSON file.

## Technologies Used
Frontend: React with TypeScript
Backend: Express.js
Database: JSON file for data persistence

## Reflection
Learning Experience
   - Handling types and interfaces in a React project with TypeScript as this was my first time programming in Typescript
   - implementing backend using Express.js
   - the usage of ports in connecting the frontend and backend
Future Approaches (things to be done differently)
   - enhanced UI for better styling, features, and interactivity
   - more robust admin login features: adding new admins, removing irrelevant admins, logging out,
     staying logged in after refreshing
   - ability to edit partners, more sophisticated filtering by text
   - storing partner information in a more robust manner, ex: MySQL, Firebase/Supabase
Issues and Solutions
   - TypeScript errors due to incorrect types or missing properties, "type expected" issues
   - general debugging and error handling for async operations and UI updates
Bonus Features
   - Search by title, active status
   - User authorization
   - Data Persistence

