import ReactDOM from 'react-dom/client';
import App from './pages/App';
import * as service_worker from './misc/serviceWorkerRegistration';

import {CssVarsProvider, CssBaseline, useColorScheme} from "@mui/joy";

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <CssVarsProvider>
            <CssBaseline />
            <App />
        </CssVarsProvider>
    );

service_worker.register();
