import React from "react";
import "./App.css";
import Home from "./components/Home";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Home />
      </div>
    );
  }
}

export default BooksApp;
