# ✏️ GitPen

**GitPen** is a web application that aims to help you with creating readme for your github repository.

## ⚙️ Technologies Used

- **Backend**: Spring Boot
- **Frontend**: React

## ✨ Features

- 🔑 **GitHub Authentication**: Log in via your GitHub account to access your repositories.
- 📝 **Edit README Files**: Load your repository's `README` file, edit it using the built-in editor, and save the changes locally in the database.
- 🔒 **Private Repository Support**: You can load `README` files from private repositories by installing the GitPen app. This will grant the website **read-only** access to the repository contents.
- 💾 **Local Database Storage**: Save edited `README` files in the GitPen database for future access.

## 🚀 Accessing the Application

The application is hosted at: [https://gitpen-359x.onrender.com](https://gitpen-359x.onrender.com)  
Please note that the first request may take a few minutes to load as the server starts up (keep in mind that even if you see the frontend loaded, that doesn't mean the application is ready to work—the backend hosted at [https://gitpen-backend-tbgw.onrender.com](https://gitpen-backend-tbgw.onrender.com) may still need a few more minutes).

## 🛠️ How to Use GitPen

1. **Log In**: Click the login button to authenticate via your GitHub account.
2. **Load README**: After logging in, select one of your repositories to load its `README.md` file.
3. **Edit README**: Use the editor to modify the content of the `README` file.
4. **Save Changes**: You can save the edited file locally in the GitPen database.
5. **Private Repositories**: To load the `README` file from a private repository, install the GitPen app on that repository. This will grant read-only access to the contents of your repository.

## ⚠️ Important Notes

- The GitPen app requires **read-only** access to your repositories for loading private `README` files.

## 👀 Application Preview
(Click on the image for better quality)

<br><br>

![homepage](https://github.com/user-attachments/assets/0ccf2cd8-84a8-47f0-a1ec-4a41b157bc7c)

<br>

![editor](https://github.com/user-attachments/assets/8c9d7d1e-c66f-4198-9c36-b65c40b19ec4)

<br>

#### Green indicates a public repository, while red signifies a private repository to which GitPen has access. Other private repositories are obviously not displayed.

<br>

![repositories](https://github.com/user-attachments/assets/5fe841a8-58cd-43af-b0bc-97a39c6f81ca)

<br>

![readmes](https://github.com/user-attachments/assets/514eb788-bddd-49f4-9b93-dca6df98a542)
