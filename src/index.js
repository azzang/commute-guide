import React from 'react';
import ReactDOM from 'react-dom';

import CommuteGuide from './components/CommuteGuide';

import registerServiceWorker from './registerServiceWorker';

import './styles/lib/Datetime.css';
import './styles/lib/font-awesome.css';
import './styles/lib/normalize.css';
import './styles/lib/skeleton.css';

import './styles/index.css';

ReactDOM.render(<CommuteGuide />, document.getElementById('root'));
registerServiceWorker();
