import React from 'react';
import '../index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Paste from './paste';
import Create from './create';

function App() {
  return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/:id">
						<Paste />
					</Route>
					<Route path="/">
						<Create />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
