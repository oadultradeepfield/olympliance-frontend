# Olympliance Frontend - CVWO Assignment AY2024/25

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

![Mockup](/public/mock_up.jpg)

## 1. About the Project

### 1.1 Description

**Olympliance (Olympiad + Alliance)** is a web forum created for high school students to discuss Science Olympiad problems as they prepare for higher-level competitions. This project was developed as part of the CVWO Assignment AY2024/25 for the School of Computing, National University of Singapore (NUS). For more details, please visit this [link](https://www.comp.nus.edu.sg/~vwo/). Feel free to also visit the [backend repo](https://github.com/oadultradeepfield/olympliance-backend) for the full context.

- **Project Owner**: Phanuphat Srisukhawasu
- **Matriculation Number**: A0311151B

### 1.2 Tech Stack

- **Programming Language**: TypeScript
- **Library and Framework**: React
- **Styling**: Tailwind CSS and daisy UI
- **Build and Deployment**: Vite and Netlify

## 2. Table of Contents

- [1. About the Project](#1-about-the-project)
  - [1.1 Description](#11-description)
  - [1.2 Tech Stack](#12-tech-stack)
- [2. Table of Contents](#2-table-of-contents)
- [3. Getting Started](#3-getting-started)
  - [3.1 Installation](#31-installation)
  - [3.2 Building and Running the App](#32-building-and-running-the-app)
- [4. Deployment](#4-deployment)
- [5. User Manual](#5-user-manual)
  - [5.1 Getting Started](#51-getting-started)
  - [5.2 Creating an Account](#52-creating-an-account)
  - [5.3 Role-Based Access Controls](#53-role-based-access-controls)
  - [5.4 User Reputation and Badge](#54-user-reputation-and-badge)
  - [5.5 Threads and Comments](#55-threads-and-comments)
- [6. Acknowledgment](#6-acknowledgment)
- [7. License](#7-license)

## 3. Getting Started

### 3.1 Installation

Start by cloning this repository:

```bash
git clone https://github.com/oadultradeepfield/olympliance-frontend.git
cd olympliance-frontend
```

Before starting the local development server, ensure that the environment variable is correctly configured. Specifically, set up the `.env` file. You can also refer to [`.env.example`](/.env.example) for guidance. In this project, the only environment variable is the backend API URL, which is stored in the `VITE_API_URL` variable. If you're following from the backend, please use the local server running on PORT 8080. Note that the app deployed on Google Cloud Run restricts allowed origins to the frontend URL, so the API cannot be accessed from the local development server.

### 3.2 Building and Running the App

This React app was built using Vite. To start a local development server, ensure that you have Node.js and `npm` installed. For reference, this project was developed using Node.js version 23.4.0 and `npm` version 10.9.2. You can check your current versions by running the following commands:

```bash
node -v
npm -v
```

To install the required dependencies, run the following command:

```bash
npm install
```

Once the dependencies are installed, you should see a `node_modules` folder in your local directory. You can then start the local development server by running:

```bash
npm run dev
```

By default, the development server will be hosted at http://localhost:5173/. You can access it by clicking the link in the terminal or opening it in your browser.

## 4. Deployment

This app was deployed using Netlify. To deploy, simply publish the entire directory to GitHub and enable Netlify's continuous deployment, which automatically triggers a new build whenever there is a new commit to the repository.

Remember to set the required environment variable in the Site Configuration to ensure the app functions correctly. Additionally, specify the Build Command as `npm run build` and the Publish Directory as `dist` in the deployment settings to ensure the site is properly rendered.

**Note**: If you encounter a bug where refreshing the Netlify app results in a "404 Not Found" error, you can fix this by creating a [`netlify.toml`](./netlify.toml) file as shown in the example below and adding the following lines:

```toml
[[redirects]]
  from = "/*"
  to = "/"
  status = 200
```

## 5. User Manual

### 5.1 Getting Started

When you visit the main page, you can choose to change the theme to your preference. The default theme is inferred from your system settings. When in dark mode, clicking the sun icon in the header will switch to light mode, and when in light mode, clicking the moon icon will switch to dark mode. Next to it, you’ll find the login/register button.

You can view threads and comments without an account; however, you will need to create an account to interact with any threads or comments.

### 5.2 Creating an Account

As you go to login page, you can switch between registering if you don't have an account or logging in if you do so. This website use username-based authentication, tho you cannot change the username later, so choose it wisely. The password can be later changed, but it is recommended to save somewhere else, since you cannot change when you forgot the current password.

### 5.3 Role-Based Access Controls

Once logged in, you can click on your avatar icon (which will usually be a rocket emoji) to change your password, view followed threads, or log out. Moderators will have additional buttons to ban users, and admins will have another button to assign moderators. These actions work by toggling; for example, if a user is not banned, clicking the button will ban them, and vice versa. A username is required to perform these actions.

**Note**: In this app, there is no functionality to assign an admin. The admin with the highest authority is assigned by directly editing their role in the database (refer to the [backend repo](https://github.com/oadultradeepfield/olympliance-backend)).

### 5.4 User Reputation and Badge

As you engage more with the community, you can earn reputation points, which are calculated on the backend. On the frontend, your avatar is updated based on your reputation. The ranking system is displayed as follows:

- 🏆 **Grandmaster**: 3500 Points
- 🥇 **Master**: 2000 Points
- 🎯 **Candidate master**: 800 Points
- 🧠 **Expert**: 400 Points
- 🔧 **Specialist**: 100 Points
- 🧑‍🎓 **Apprentice**: 50 Points
- 📚 **Pupil**: 15 Points
- 🚀 **Novice**: 0 Points

Note that your rank will also be displayed next to your name when you post a thread or comment. If you are an admin or moderator, the respective badge will be displayed before the title of the content you posted.

### 5.5 Threads and Comments

You can choose a thread category to begin with on the homepage. Currently, we have around 11 categories, following the officially recognized International Science Olympiads listed on [Wikipedia](https://en.wikipedia.org/wiki/International_Science_Olympiad). IAO and IOAA are categorized under Astronomy, and there is an additional General section for discussing random topics or IJSO, which are not categorized as individual subjects.

In each category page, you will see a title and a list of all threads. The threads are fetched with a maximum of 5 per page. You can use the navigation buttons at the bottom to move between pages. You can also choose to sort the page by Newest, Top Upvoted, Most Comments, or Last Updated. There is a button at the top, labeled "Ask a Question," to create a new thread. To create a thread, you need a title, a content, and optionally tags.

If you click on any existing thread, you will be brought to a single-thread page. The thread stats, including the number of upvotes, downvotes, comments, followers, etc., are displayed on the category page, but you cannot interact with them directly. You need to visit the thread page to interact with it.

On each thread page, you can interact with the thread or reply to comments. When clicked, it will open a modal to make a comment. Below the thread content, you'll find the comment section. You can freely interact with comments, just as you would with the thread. The only exception is that you cannot follow a comment. Comments can be sorted by "Oldest" or "Most Upvoted." When replying to a comment, it will display as "Replied to..." followed by that comment. Comment are fetched with a maximum of 10 per page.

**Note**: The thread and comment owners will have a pencil icon and a trash icon next to their content, allowing them to edit or delete their posts. Comments will be flagged as "[Comment deleted]" while the thread will simply disappear. Admins and moderators have access to delete any comments, but they cannot edit them.

## 6. Acknowledgment

I would like to express my heartfelt gratitude to my seniors who introduced me to CVWO well in advance. Their guidance allowed me to prepare and familiarize myself with the tech stack throughout the first semester, which significantly streamlined the development process.

I also want to acknowledge the incredible creators who provided invaluable tutorials that guided me through various aspects of this project. Special thanks to [NetNinja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg), [Fireship](https://www.youtube.com/c/Fireship), and others that weren't mention. I’m also grateful to the developer communities on discussion platforms like StackOverflow and Reddit.

Lastly, I want to thank the School of Computing for offering this program and opportunity. Working on this project has taught me more than I ever anticipated. The challenges of debugging and integrating multiple programming components have reshaped the way I approach problem-solving and coding.

## 7. License

This project is licensed under the MIT License. You can view the full license text in the [`LICENSE`](/LICENSE) file.
