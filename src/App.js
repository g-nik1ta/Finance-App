import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import Authorization from 'components/Authorization/Authorization';
import { useSelector } from 'react-redux';
import 'styles/App.scss';

function App() {
	const user = useSelector(state => state.ProfileReducer.user);
	
	if (!user) {
		return (
			<div id="app">
				<Authorization />
			</div>
		)
	}

	return (
		<div id="app">
			<AsideMenu />

			<main className='content_container'>
				<Header />
				<AppRouter />
			</main>
		</div>
	);
}

export default App;
