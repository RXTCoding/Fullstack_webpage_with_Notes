import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
// We imported Provider from react-redux and HashRouter from
// react-router-dom. We need to wrap both of these around App
// with the store passed in to the Provider as a prop.
import { Provider } from "react-redux"
import { HashRouter } from "react-router-dom"
import store from "./redux/store"
// Look at how this is structured below and then when you're done
// let's go take a look at ./components/Auth to see how we would
// handle registering and logging in as well as saving that user info
// to redux.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
reportWebVitals()
