import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routesConfig from "./hooks/routes";
import "./App.css";
import "./index.css";
import { AuthProvider } from "./context/auth-context";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
              </Route>
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;