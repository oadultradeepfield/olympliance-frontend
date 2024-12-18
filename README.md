# Olympliance Frontend - CVWO Assignment AY2024/25

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/daisyui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

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

## 5. User Manual

## 6. Acknowledgment

I would like to express my heartfelt gratitude to my seniors who introduced me to CVWO well in advance. Their guidance allowed me to prepare and familiarize myself with the tech stack throughout the first semester, which significantly streamlined the development process.

I also want to acknowledge the incredible creators who provided invaluable tutorials that guided me through various aspects of this project. Special thanks to [NetNinja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg), [Fireship](https://www.youtube.com/c/Fireship), and others that weren't mention. I’m also grateful to the developer communities on discussion platforms like StackOverflow and Reddit.

Lastly, I want to thank the School of Computing for offering this program and opportunity. Working on this project has taught me more than I ever anticipated. The challenges of debugging and integrating multiple programming components have reshaped the way I approach problem-solving and coding.

## 7. License

This project is licensed under the MIT License. You can view the full license text in the [`LICENSE`](/LICENSE) file.
