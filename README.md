# Ulapdrive

A stripped-down version of Dropbox / Google Drive

## Technologies and Tools

- TypeScript
- React + React-Router
- Tanstack-Query
- Tailwind + shadcn/ui
- Express
- PostgreSQL
- Cloudinary for file-hosting

## REST API Endpoints

Version 1.0
Base URL => `/api/v1`

### Auth

| Description | Method | Endpoint       |
| ----------- | ------ | -------------- |
| Login       | POST   | /auth          |
| Register    | POST   | /auth/register |
| Logout      | POST   | /auth/logout   |
| Session     | GET    | /auth/me       |

### Folders

| Description   | Method | Endpoint    |
| ------------- | ------ | ----------- |
| Root Folders  | GET    | /folder     |
| New Folder    | POST   | /folder     |
| Update Folder | PATCH  | /folder/:id |
| Delete Folder | DELETE | /folder/:id |

### Files

| Description     | Method | Endpoint             |
| --------------- | ------ | -------------------- |
| Files of Folder | GET    | /files/:folderId     |
| Upload File     | POST   | /files/:folderId     |
| Delete File     | DELETE | /files/:folderId/:id |

> [!NOTE]
> File Upload endpoint is rate-limited.

### Shared Folders

| Description     | Method | Endpoint             |
| --------------- | ------ | -------------------- |
| Files of Folder | GET    | /files/:folderId     |
| Upload File     | POST   | /files/:folderId     |
| Delete File     | DELETE | /files/:folderId/:id |

## ER Diagram

<div align="center">
  <kbd>
    <img src="https://i.imgur.com/1do61Xe.png" height="auto"/>
    <div>From Top to Bottom, Left to Right: Sessions, Migrations, Folders, Shared Folders, Files, Users</div>
  </kbd>
</div>

## Running the Project locally

1. Fork and clone the repository.
2. Run the client.

   1. Go to `/client` and run `npm i`
   2. Run dev mode using `npm run dev`

3. Run the server.

   1. Go to `/server` and run `npm i`
   2. Setup .env variables (check below for example)
   3. Run dev mode using `npm run dev`

4. Open localhost in browser.

## env.example

> [!WARNING]
> Don't recklessly push your env variables to your version control system.

```js
PORT = 8080;
DATABASE_URL = 'your_db_url';
COOKIE_SECRET = 'random_secret';
CLIENT_URL = 'domain';
//for cloudinary
CLOUD_NAME = 'random_name';
CLOUD_API_KEY = 'random_key';
CLOUD_API_SECRET = 'random_secret';

//for Vite App / client .env
VITE_API_URL = 'your_backend_api_url';
```
