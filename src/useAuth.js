// import { useState, useEffect } from "react";

// const useAuth = () => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     try {
//       const response = await fetch("/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await response.json();
//       setUser(data.user);
//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const signup = async (name, email, password) => {
//     try {
//       const response = await fetch("/api/users/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });
//       const data = await response.json();
//       setUser(data.user);
//       localStorage.setItem("token", data.token);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       try {
//         const response = await fetch("/api/users/check-token", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         setUser(data.user);
//         localStorage.setItem("token", data.token);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     checkToken();
//   }, []);

//   return { user, login, signup, logout };
// };

// export default useAuth;
