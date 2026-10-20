import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'web-inception-sdk/style.css'

addEventListener('contextmenu', (e) => {
  e.preventDefault();
});


if (window.self === window.top) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <body>
        This Host is not allowed.
      </body>
    </StrictMode>,
  )
}
else {


  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
