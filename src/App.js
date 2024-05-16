import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import 'styles/App.scss';
import { useEffect } from 'react';
import { setUserAction } from 'store/ProfileReducer';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching';
import Loader from 'components/UI/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { getRoute } from 'utils/routes';

function App() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.ProfileReducer.user);

	const [fetchUser, isUserLoading, userError] = useFetching(async (token) => {
		const response = await PostService.getUserToken(token);
		if (response) {
			// console.log(response);
			console.log("Автоматическая авторизация прошла успешно");
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
				<div className='full_width full_heigth flex align_center justify_center'>
					<Loader />
				</div>
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
