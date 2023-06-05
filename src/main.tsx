import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import "@/styles/reset.css"
import store from "@/store"
import { ThemeProvider } from "@/context/ThemeProvider"
import App from './App'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <Router>
                    <App />
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
