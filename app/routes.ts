// routes.ts

// المسارات التي تحتاج تسجيل دخول (مثلاً صفحة الإعدادات وغيرها)
export const ProtectedRoutes = [
    "/settings",
    "/dashboard",
    // ... مسارات أخرى
  ];
  
  // المسارات الخاصة بصفحات الدخول والتسجيل، بحيث لو المستخدم مسجل دخول ما يرجع لهم
  export const config = {
    matcher: [
      "/settings",
      "/dashboard",
      "/admin",
      "/login",
      "/register"
    ],
  };
  
//   export const routes = [...ProtectedRoutes, ...config.matcher];  