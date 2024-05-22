import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import 'styles/App.scss';
import { useEffect } from 'react';
import { setUserAction } from 'store/ProfileReducer';
import AccountService from 'API/AccountService';
import { useFetching } from 'hooks/useFetching';
import Loader from 'components/UI/Loader/Loader';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.ProfileReducer.user);

	const [fetchUser, isUserLoading, userError] = useFetching(async (token) => {
		const { status, data } = await AccountService.getUserData(token);
		if (status === 'error') {
			console.log("Error getting user by token");
			localStorage.removeItem('financeAppRefreshToken');
			return
		}

		console.log("Authorization was successful");
		dispatch(setUserAction(data))
	});

	useEffect(() => {
		if (!userError) return
		console.log("Something went wrong. Contact technical support...");
	}, [userError])

	useEffect(() => {
		const refreshTokenData = JSON.parse(localStorage.getItem('financeAppRefreshToken'));

		if (refreshTokenData && refreshTokenData.expiresAt > Date.now()) {
			fetchUser(refreshTokenData.token);
		} else {
			console.log("The authorization token is out of date or not found");
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
