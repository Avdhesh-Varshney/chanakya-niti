# CHANAKYA-NITI-BACKEND 📚

## Overview

CHANAKYA-NITI is a web application designed to provide an engaging platform for exploring and learning about the teachings of Chanakya, an ancient Indian philosopher, economist, and strategist.

## 📈 GitHub Repository Stats
| 🌟 **Stars** | 🍴 **Forks** | 🐛 **Issues** | 🔔 **Open PRs** | 🔕 **Closed PRs** | 🛠️ **Languages** | ✅ **Contributors** |
|--------------|--------------|---------------|-----------------|------------------|------------------|------------------|
| ![GitHub stars](https://img.shields.io/github/stars/Avdhesh-Varshney/chanakya-niti-backend) | ![forks](https://img.shields.io/github/forks/Avdhesh-Varshney/chanakya-niti-backend) | ![issues](https://img.shields.io/github/issues/Avdhesh-Varshney/chanakya-niti-backend?color=32CD32) | ![pull requests](https://img.shields.io/github/issues-pr/Avdhesh-Varshney/chanakya-niti-backend?color=FFFF8F) | ![Closed PRs](https://img.shields.io/github/issues-pr-closed/Avdhesh-Varshney/chanakya-niti-backend?color=20B2AA) | ![Languages](https://img.shields.io/github/languages/count/Avdhesh-Varshney/chanakya-niti-backend?color=20B2AA) | ![Contributors](https://img.shields.io/github/contributors/Avdhesh-Varshney/chanakya-niti-backend?color=00FA9A) |

## Purpose and Motivation 🎯

This project aims to bring the timeless wisdom of Chanakya to a modern audience, making his teachings accessible and engaging through a digital platform.

## Features ✨

- **Interactive Interface**: Engaging UI for exploring Chanakya's teachings.
- **Secure Backend**: Robust infrastructure to secure source code and multimedia content.
- **AI Integration**: Personalized recommendations and image processing.
- **User Authentication**: Secure and personalized user experiences.
- **Multimedia Content**: Audio files, books, videos on Chanakya’s life.
- **API Access**: Allows users to create their own Chanakya-Niti websites.
- **Language Translation**: AI model for translating content into multiple languages.

## Frontend Repository 👑

The frontend of the CHANAKYA-NITI application is designed to provide a seamless and engaging user experience while ensuring robust connectivity and integration with the backend.

- **Repository Link**: [chanakya-niti](https://github.com/Avdhesh-Varshney/chanakya-niti)
- **Technologies Used**:
  - **React.js**: A JavaScript library for building user interfaces.
  - **Redux**: State management for handling complex state across the application.
  - **Axios**: Promise-based HTTP client for making API requests.
  - **Material-UI**: React components for faster and easier web development.
  - **React Router**: Declarative routing for React applications.
  - **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.

## Rough Project Structure 👈

```css
Chanakya-Niti
├── Frontend
│   └── React + Vite
│       ├── Navbar
│       │   ├── Logo
│       │   │   └── Targeting the homepage
│       │   ├── About Page
│       │   │   ├── Chanakya Card component
│       │   │   │   └── Detailed timeline of Chanakya's life
│       │   │   ├── Chandragupta Card component
│       │   │   │   └── Chandragupta's life
│       │   │   └── Maurya Dynasty Card component
│       │   │       └── Its lifeline
│       │   ├── Resources Section
│       │   │   ├── Audio Card Section
│       │   │   │   ├── Chanakya Card component
│       │   │   │   │   └── Story of Chanakya
│       │   │   │   └── Planning of other persona stories
│       │   │   ├── Books Card Section
│       │   │   │   └── Chanakya Card component
│       │   │   │       └── Books related to Chanakya
│       │   │   └── Videos Card Section
│       │   │       ├── Videos related to Chanakya
│       │   │       └── Planned for other persona resources
│       │   ├── Contributors Page
│       │   │   ├── Card of Contributors
│       │   │   │   └── Images fetched from GitHub API
│       │   │   └── Details Button
│       │   │       ├── GitHub Button
│       │   │       ├── LinkedIn Button
│       │   │       └── Working details button
│       │   │           └── Details of contributions linked to the database
│       │   └── Sign In/Sign Up Buttons
│       ├── Main Body
│       │   └── Homepage
│       │       └── Showcasing UI and intro of all website sections
│       └── Footer
│           ├── Logo
│           ├── One-line Intro
│           ├── Contact Information
│           │   └── Social Icons
│           │       ├── GitHub
│           │       └── Discord
│           └── Project Frontend repo link
├── Backend
│   ├── Express + Node + MongoDB
│   │   ├── User Authentication
│   │   │   └── JWT
│   │   │       └── Sign In/Sign Up
│   │   │           └── Database from MongoDB URL
│   │   ├── Database Integration
│   │   │   ├── MongoDB API
│   │   │   │   ├── Quotes resources
│   │   │   │   ├── Books resources
│   │   │   │   ├── Videos resources
│   │   │   │   ├── Audio resources
│   │   │   │   └── Contributors' records
│   │   │   └── GitHub API
│   │   └── API Access for logged-in users only
│   │       └── API hits capped at 1000
│   └── AI Integration
│   |   ├── Text-to-Speech Converter
│   |   │   └── For books resources
│   |   └── Language Translator
│   |       ├── For books
│   |       └── For audios
|   ├── Testing
|   └── Documentation
└── Database
    ├── Audio database
    ├── Videos database
    ├── Books database
    └── Quotes database
```

## Installation Instructions 🛠️

1. Clone the repository:
   ```sh
   git clone https://github.com/<your-username>/chanakya-niti-backend.git
   ```
2. Navigate to the project directory:
   ```sh
   cd chanakya-niti-backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Contributing Guidelines 🤝

We welcome contributions! Here’s how you can get started:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b issue/<issue-number>
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin issue/<issue-number>
   ```
5. Open a pull request.
6. Feel the pr template carefully by properly linked your issue with the pr.

## Contact Information 📬

- **Maintainer**: Avdhesh Varshney
- **Discord Server**: https://discord.gg/tSqtvHUJzE

## Guide to Contributing 🛠️

1. **Start Simple**: Begin with small tasks such as fixing typos, improving documentation, or resolving simple bugs. This will help you familiarize yourself with the project structure and coding standards.
2. **Intermediate Tasks**: Once comfortable, take on more complex tasks such as adding new features, improving existing functionalities, or optimizing code performance.
3. **Advanced Contributions**: Work on integrating AI models, enhancing security features, or developing new modules. This requires a deep understanding of the project's architecture and advanced coding skills.
4. **Engage with the Community**: Participate in discussions, attend virtual meetups, and provide feedback on others' contributions. Collaboration is key to the success of open-source projects.
5. **Stay Updated**: Regularly check the project's issue tracker, roadmap, and discussion forums to stay informed about the latest developments and opportunities for contribution.

![Line](https://user-images.githubusercontent.com/85225156/171937799-8fc9e255-9889-4642-9c92-6df85fb86e82.gif)

<div align="center">
  <h1>Tip from us 😇</h1>
  <p>It always takes time to understand and learn. So, don't worry at all. We know <b>you have got this</b>! 💪</p>
  <h3>Show some &nbsp;❤️&nbsp; by &nbsp;🌟&nbsp; this repository!</h3>
  <img src="https://media.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="60"> <em><b>I love connecting with different people</b> so if you want to say <b>hi, I'll be happy to meet you more!</b> :)</em>
</div>

<a href="#top"><img src="https://img.shields.io/badge/-Back%20to%20Top-red?style=for-the-badge" align="right"/></a>
