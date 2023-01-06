import React from "react";
import ReactDOM from "react-dom/client";
import AuthForm from "./Auth";
import Timer from "./Timer";

// Bad hack, should probally use different bundles for different pages, but it works https://i.imgflip.com/4/1cf8by.jpg

// access page
const domRoot = document.getElementById("auth-form-root");
if (domRoot) {
  const AuthRoot = ReactDOM.createRoot(domRoot);

  AuthRoot.render(<AuthForm />);
} else {
  // main page
  const TimerRoot = ReactDOM.createRoot(document.getElementById("timer-root"));

  TimerRoot.render(<Timer />);
}
