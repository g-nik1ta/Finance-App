import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import 'styles/App.scss';
import { useEffect } from 'react';
import { setUserAction } from 'store/ProfileReducer';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.ProfileReducer.user);

	const [fetchUser, isUserLoading, userError] = useFetching(async (token) => {
		const response = await PostService.getUserToken(token);
		console.log(response);
		if (response) {
			dispatch(setUserAction(response)) //  Your logic to handle the response
		} else {
			console.log("Ошибка получения пользователя по токену");
			localStorage.removeItem('financeAppRefreshToken');
		}
	});

	useEffect(() => {
		if (!userError) return
		console.log("Автоматическая авторизация не удалась");
	}, [userError])

	useEffect(() => {
		const refreshTokenData = JSON.parse(localStorage.getItem('financeAppRefreshToken'));

		if (refreshTokenData && refreshTokenData.expiresAt > Date.now()) {
			fetchUser(refreshTokenData.token);
		} else {
			console.log("Автоматическая авторизация не удалась");
			localStorage.removeItem('financeAppRefreshToken');
		}
	}, []);

	if (isUserLoading) {
		return (
			<div id="app">
				Loading...
			</div>
		)
	}

	if (!user) {
		return (
			<div id="app">
				<AppRouter auth={true} />
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
