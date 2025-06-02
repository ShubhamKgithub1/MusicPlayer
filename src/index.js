import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Explore from "./components/Explore";
import Search from "./components/Search";
import { AuthProvider } from "./context/AuthContext";
import Welcome from "./components/Welcome";
import MyLibrary from "./components/MyLibrary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="search" element={<Search />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/library" element={<MyLibrary />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
