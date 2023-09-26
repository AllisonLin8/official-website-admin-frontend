# official-website-admin-frontend

## Introduction

This project serves as the backend management for the official website (frontend), built with Vue.js. The website's functionalities include user management, news management, and product management, each with different role-based permissions:

- **User Management (使用者管理)** : The "root" role can modify a user's name, email, password, and role permissions. They can also view a list of all users and perform a "soft delete" on a user (rendering them unable to log in).

- **News Management (新聞管理)** : All role permissions allow for writing, editing, deleting, and previewing news articles. The "general" role can only see and edit/delete their own authored news articles. In contrast, the "root" or "editor" roles can view, publish (making them visible on the web frontend), or edit news articles authored by anyone (including themselves), and perform hard deletions.

- **Product Management (產品管理)** : There are no role restrictions in product management. Everyone can write, edit, and perform hard deletions on products.

## Online Demo

You can access the live version of the official website admin frontend by clicking the link below:

- [Official Website Admin Frontend Demo](http://owaf.s3-website-ap-northeast-1.amazonaws.com)

### Demo Account Information

- Root Account:
  - Email: [root@example.com](root@example.com)
  - Password: 12345678

- Editor Account:
  - Email: [editor@example.com](editor@example.com)
  - Password: 12345678

- General Account:
  - Email: [general@example.com](general@example.com)
  - Password: 12345678

### Entire Project

The complete official website consists of this project and the following two projects:

1. Demo and API Docs
    - [Official Website Web Frontend](http://owwf.s3-website-ap-northeast-1.amazonaws.com)
    - [Official Website Server Backend API Documentation](http://owsb.ap-northeast-1.elasticbeanstalk.com/api-docs)

2. GitHub
    - [Official Website Web Frontend](https://github.com/AllisonLin8/official-website-web-frontend)
    - [Official Website Server Backend](https://github.com/AllisonLin8/official-website-server-backend)

## Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

### Compiles and minifies for production

```shell
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Development Team

Here is a list of the developers who contributed to this project:

- [Allison Lin](https://github.com/AllisonLin8)
