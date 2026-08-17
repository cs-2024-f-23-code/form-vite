import { useState } from "react";
import "./App.css";
import Login from "./components/login.jsx";
import Form from "./components/form.jsx";

// function App() {
//   const [count, setCount] = useState(0);
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     getUserData();
//   }, []);

//   // async function getUserData() {
//   //   // Requests go to the Vite dev server, which proxies them to http://localhost:3000
//   //   const url = "/api/todo";
//   //   let response = await fetch(url);
//   //   const data = await response.json();
//   //   setUserData(Array.isArray(data) ? data : []);
//   // }
// async function getUserData() {
//   try {
//     const response = await fetch("/api/todo");

//     if (!response.ok) {
//       throw new Error(`Request failed: ${response.status}`);
//     }

//     const data = await response.json();
//     setUserData(Array.isArray(data) ? data : []);
//   } catch (error) {
//     console.error("Could not load todos:", error);
//     setUserData([]);
//   }
// }
//   return (
//     <>
//       <Login />

//       <div>
//         <h1>fetch data from api</h1>
//         {userData &&
//           userData.map((todo) => (
//             <ul className="userlist" key={todo._id}>
//               <li>Name: {todo.name}</li>
//               <li>Description: {todo.desc}</li>
//               <li>Status: {todo.isDone ? "Done" : "Pending"}</li>
//             </ul>
//           ))}
//       </div>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   );
// }

// export default App;

function App() {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <>
      <nav className="auth-switcher" aria-label="Authentication form">
        <button
          type="button"
          className={activeForm === "login" ? "active" : ""}
          onClick={() => setActiveForm("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={activeForm === "signup" ? "active" : ""}
          onClick={() => setActiveForm("signup")}
        >
          Sign up
        </button>
      </nav>

      {activeForm === "login" ? <Login /> : <Form />}
    </>
  );
}

export default App;
