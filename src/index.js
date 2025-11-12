import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./reduxStore/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./components/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import LazyWrapper from "./components/LazyWrapper";

const Explore = lazy(() => import("./components/Explore"));
const Search = lazy(() => import("./components/Search"));
const MyLibrary = lazy(() => import("./components/MyLibrary"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route
                  path="explore"
                  element={
                    <LazyWrapper>
                      <Explore />
                    </LazyWrapper>
                  }
                />
                <Route
                  path="search"
                  element={
                    <LazyWrapper>
                      <Search />
                    </LazyWrapper>
                  }
                />
                <Route path="/welcome" element={<Welcome />} />
                <Route
                  path="/library"
                  element={
                    <ProtectedRoute>
                      <LazyWrapper>
                        <MyLibrary />
                      </LazyWrapper>
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

reportWebVitals();
