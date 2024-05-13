import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import 'styles/App.scss';

function App() {
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
