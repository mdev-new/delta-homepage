import { render } from 'preact';
import * as service_worker from './misc/serviceWorkerRegistration';

import App from './pages/App.jsx'

render(<App />, document.getElementById('app'));
service_worker.register();
