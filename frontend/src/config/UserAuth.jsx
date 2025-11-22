import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function UserAuth({ isAuthenticated, children }) {
  const location = useLocation();
  const path = location.pathname; 

  // If not logged in and trying to access protected routes → go to login
  const protectedRoutes = [
    "/upload",
    "/upload/uploadfile",
    "/upload/analysis",
    "/acc/setting",
    "/acc/history",
  ];

  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => path.startsWith(route))
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Otherwise render children normally
  return <>{children}</>;
}

export default UserAuth;

// function UserAuth({ isAuthenticated, children }) {
//   const location = useLocation();
//   const path = location.pathname;

//   if (
//     !isAuthenticated &&
//     !(path.includes("/login") || path.includes("/signup"))
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (
//     (!isAuthenticated && path.includes("/upload/uploadfile")) ||
//     path.includes("/upload/analysis")
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (!isAuthenticated && path.includes("/upload")) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (isAuthenticated && path.includes("/upload/uploadfile")) {
//     return <Navigate to="/upload/uploadfile" />;
//   }

//   if (isAuthenticated && path.includes("/upload/analysis")) {
//     return <Navigate to="/upload/analysis" />;
//   }

//   if (
//     (!isAuthenticated && path.includes("/acc/setting")) ||
//     path.includes("/acc/history")
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (!isAuthenticated && path.includes("/acc")) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (isAuthenticated && path.includes("/acc/setting")) {
//     return <Navigate to="/acc/setting" />;
//   }
//   if (isAuthenticated && path.includes("/acc/history")) {
//     return <Navigate to="/acc/history" />;
//   }

//   return <>{children}</>;
// }

// export default UserAuth;

// import React, { useEffect } from "react";
// import { useLocation, Navigate } from "react-router-dom";

// function UserAuth({ isAuthenticated, children }) {
//   const location = useLocation();
//   const path = location.pathname;

//   if (
//     !isAuthenticated &&
//     !(path.includes("/login") || path.includes("/signup"))
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   if (!isAuthenticated && path.includes("/upload")) {
//     return <Navigate to="/auth/login" />;
//   } else {
//     return <Navigate to="/upload" />;
//   }

// }

// export default UserAuth;

// // const location = useLocation();
// // const path = location.pathname;

// // if (
// //   !isAuthenticated ||
// //   path.startsWith("/acc/history") ||
// //   path.startsWith("/acc/setting")
// // ) {
// //   return <Navigate to="/auth/login" />;
// // }

// // if (
// //   !isAuthenticated ||
// //   path.startsWith("/upload") ||
// //   path.startsWith("/analysis")
// // ) {
// //   return <Navigate to="/auth/login" />;
// // } else {
// //   return <Navigate to="/upload" />;
// // }
// // return children;

// // console.log("checkAuth", isAuthenticated); //comming true

// // const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
// // const location = useLocation();

// // if (isLoading) {
// //   return (
// //     <div className="h-screen flex items-center justify-center">
// //       <p className="text-xl font-bold">Loading...</p>
// //     </div>
// //   );
// // }

// // if (!isAuthenticated) {
// //   return <Navigate to="/auth/login" state={{ from: location }} replace />;
// // }
// // Redirect to login and preserve intended destination

// import { Navigate, useLocation } from "react-router-dom";

// function UserAuth({ isAuthenticated, isLoading, children }) {
//   const location = useLocation();
//   const path = location.pathname;

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-xl font-bold">Loading...</p>
//       </div>
//     );
//   }

//   // Protect all /upload and /acc routes
//   if (!isAuthenticated) {
//     if (path.startsWith("/upload") || path.startsWith("/acc")) {
//       return <Navigate to="/auth/login" state={{ from: location }} replace />;
//     }
//   }

//   return children;
// }

// export default UserAuth;
