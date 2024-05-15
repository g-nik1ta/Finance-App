import AppRouter from 'components/AppRouter';
import AsideMenu from 'components/AsideMenu/AsideMenu';
import Header from 'components/Header/Header';
import Authorization from 'pages/Authorization/Authorization';
import { useDispatch, useSelector } from 'react-redux';
import 'styles/App.scss';
import { getAuth, onAuthStateChanged, signInWithCustomToken } from 'firebase/auth';
import { useEffect } from 'react';
import { setUserAction } from 'store/ProfileReducer';
import { app } from 'firebase.js';

function App() {
    const dispatch = useDispatch();
    const auth = getAuth(app);
	const user = useSelector(state => state.ProfileReducer.user);

	// useEffect(() => {
	// 	// Проверка при монтировании компонента
	// 	const savedToken = localStorage.getItem('financeAppUserToken');

	// 	if (savedToken) {
	// 		signInWithCustomToken(auth, savedToken)
	// 			.then((userCredential) => {
	// 				console.log(userCredential.user);
	// 				dispatch(setUserAction(userCredential.user))
	// 			})
	// 			.catch(error => {
	// 				console.error("Ошибка автоматической авторизации:", error);
	// 				// Если токен недействителен, очистите localStorage
	// 				// localStorage.removeItem('financeAppUserToken');
	// 			});
	// 	}

	// 	// Наблюдение за изменениями авторизации
	// 	const unsubscribe = onAuthStateChanged(auth, (user) => {
	// 		console.log('unmout:', user);
	// 		dispatch(setUserAction(user))
	// 	});

	// 	// Очистка при демонтировании компонента
	// 	return () => unsubscribe();
	// }, []);

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
