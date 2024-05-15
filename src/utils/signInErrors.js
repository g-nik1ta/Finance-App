export const fetchErrorCode = (errorCode) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'Пользователь с введенным Вами адресом электронной почты уже существует';
        case 'auth/invalid-email':
            return 'Пожалуйста, укажите корректный адрес';
        case 'auth/user-not-found':
            return 'Пользователь не найден';
        case 'auth/wrong-password':
            return 'Пароль не верный';
        case 'auth/missing-password':
            return 'Укажите пароль';
            
        case 'RESET_PASSWORD_auth/user-not-found':
            return 'Пользователь не найден';
        case 'RESET_PASSWORD_auth/invalid-email':
            return 'Пожалуйста, укажите корректный адрес';
        default:
            return 'Не удалось войти в систему. Обратитесь в тех-поддержку';
    }
}