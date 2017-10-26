import React from 'react';
import ReactDOM from 'react-dom';

import CommuteGuide from './components/CommuteGuide';

import registerServiceWorker from './registerServiceWorker';

import './styles/normalize.css';
import './styles/skeleton.css';
import './styles/font-awesome.css';
import './styles/Datetime.css';
import './styles/index.css';

ReactDOM.render(<CommuteGuide />, document.getElementById('root'));
registerServiceWorker();
