import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import 'styles/App.scss';

function App() {
	return (
		<div id="app">
			<AsideMenu />

			<main className='content_container'>
				<AppRouter />
			</main>
		</div>
	);
}

export default App;
