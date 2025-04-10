
# 🏡 Clone Airbnb

A full-stack clone of Airbnb built with Node.js, Express, MongoDB, EJS, and Passport.js. Users can sign up, log in, create listings, add reviews, and manage their content. Images are stored securely using **Cloudinary**.

🌐 [**Live Demo**: ](https://clone-airbnb-1nlt.onrender.com)

---

## ✨ Features

- 🔐 User authentication using **Passport.js (Local Strategy)**
- 📝 Create, Edit, Delete listings (only by the owner)
- 💬 Add and delete reviews (only by the reviewer)
- 🖼️ Upload and store listing images on **Cloudinary**
- ⚡ Flash messages for better UX
- 🔒 Secure session management
- 🧠 Server-side validation and error handling





---
## ⚙️ Tech Stack

-   **Backend**: Node.js, Express
    
-   **Frontend**: EJS + Bootstrap

- **Database**: MongoDB (Hosted on MongoDB Atlas)

    
-   **Authentication**: Passport.js (Local Strategy)
    
-   **Cloud Storage**: Cloudinary
    
-   **Deployment**: Render
---

  
  



## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/clone_airbnb.git
cd clone_airbnb

```
---


📄 Create `.env` file and  add:

  

```env

MONGO_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

```

  

🔗 Go to [MongoDB Atlas ](https://www.mongodb.com/atlas?msockid=138cd356fed96dc80550c6f7ff2b6cb8) and after login connect using connection string.



▶️ Start the Server

  

```bash
npm  install
node  server.js
```

  

> Server runs on: `http://localhost:8080`

  

---

  


## 👨‍💻 Author

  

Made with 💻 by 
- [Simran](https://github.com/Simran759)

🔗 [Live Demo](https://clone-airbnb-1nlt.onrender.com/)
---
