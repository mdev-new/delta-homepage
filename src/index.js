import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import * as service_worker from './misc/serviceWorkerRegistration';

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(<App />);

service_worker.unregister();
