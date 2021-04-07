import React, { useEffect } from "react";
import "./App.css";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://iframe-consumer.herokuapp.com",
];

function App() {
  useEffect(() => {
    window.addEventListener(
      "message",
      function (event) {
        console.log(window.parent);
        const isValidEvent =
          ALLOWED_ORIGINS.includes(event.origin) &&
          ALLOWED_ORIGINS.includes(window.parent.location);
        if (!isValidEvent || typeof event.data !== "string") {
          return null;
        }
        const data = JSON.parse(event.data);
        const isUpdateInputs = data.eventName === "updateInputs";
        const isSubmit = data.eventName === "submit";
        if (isUpdateInputs) {
          console.log("updating iframe input fields");
          document.getElementById("email").value = data.email;
          document.getElementById("password").value = data.password;
        } else if (isSubmit) {
          console.log("*********");
          console.log(
            "submit form iframe function invoked from react app domain:",
            event.origin
          );
          console.log("*********");
          console.log(
            "then make req from iframe domain:",
            window.location.origin
          );
          console.log("*********");
          console.log("payload received for req", data.email, data.password);
        }
        console.log("*********");
      },
      false
    );
  }, []);

  return (
    <div className="App">
      <input placeholder="email" id="email"></input>
      <input placeholder="password" id="password"></input>
    </div>
  );
}

export default App;
