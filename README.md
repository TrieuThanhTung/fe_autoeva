# AutoEva

This project is a React application bootstrapped with [Vite](https://vitejs.dev/) and using TypeScript.

## 📌 Features

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/TrieuThanhTung/fe_autoeva.git
   cd fe_autoeva
   ```

2. Install dependencies:
   ```sh
   npm install  # or yarn install
   npx @tailwindcss/cli -i .src/assets/styles/input.css -o .src/assets/styles/output.css --watch # add tailwind
   ```

3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
   
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Build the project for production.
- `npm run preview` – Preview the production build.
- `npm run lint` – Run ESLint for linting.

## 🛠️ Project Structure
```
├── src
│   ├── components  # Reusable UI components
│   ├── pages       # Page components
│   ├── context       # Custom hooks
│   ├── assets      # Static assets (images, fonts, etc.)
│   ├── styles      # Global styles
|   ├── routes      # Contains routes (paths, pages)
│   ├── main.tsx    # Entry point
│   ├── App.tsx     # Root component
├── public          # Static files
├── .eslintrc.js    # ESLint configuration
├── vite.config.ts  # Vite configuration
├── tsconfig.json   # TypeScript configuration
├── package.json    # Project dependencies
├── README.md       # Project documentation
```

## 🏗️ Build & Deployment

1. Build the project:
   ```sh
   npm run build
   ```

2. Serve the built files:
   ```sh
   npm run preview
   ```

To deploy, upload the contents of the `dist/` folder to your hosting provider.

## 🎨 Styling (Optional)
This project can use Tailwind CSS. To install it, run:
```sh
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Then, configure Tailwind in `tailwind.config.js` and import it in `index.css`.

## ❓ FAQ

## 📜 License


