import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<App/>
			</Provider>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

reportWebVitals();
