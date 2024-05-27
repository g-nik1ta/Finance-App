import { collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app } from 'firebase.js';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);
const usersRef = collection(db, "users");

function wait() {
    return new Promise(resolve => {
        setTimeout(resolve, 1200);
    });
}

export default class AccountService {
    static async getAsyncFetch() {
        await wait();
    }

    static  setUserRefreshToken(refreshToken, days = 30) {
        const expiresAt = Date.now() + days * 24 * 60 * 60 * 1000;

        localStorage.setItem('financeAppRefreshToken', JSON.stringify({
            token: refreshToken,
            expiresAt: expiresAt
        }));
    }


    static async signIn(values) {
        const { email, password, remember } = values;

        let status = 'error';
        const response = await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const token = userCredential.user.reloadUserInfo.localId;
                const { status: status_user, data: data_user } = await AccountService.getUserData(token);

                if (status_user === 'error') return
                if (remember) {
                    AccountService.setUserRefreshToken(userCredential.user.uid)
                } else AccountService.setUserRefreshToken(userCredential.user.uid, 1)

                status = 'success';
                return data_user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return errorCode;
            });

        return { status, data: response };
    }

    static async registerUser(values) {
        const { email, password, remember, name } = values;

        let status = 'error';
        const response = await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const { uid, email } = user;

                
                if (remember) {
                    AccountService.setUserRefreshToken(userCredential.user.uid)
                } else AccountService.setUserRefreshToken(userCredential.user.uid, 1)

                await AccountService.updateUserTable({
                    uid, email, remember, name, password
                });

                const {data} = await AccountService.getUserDataFromEmail(email);

                status = 'success';
                return data
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                return errorCode;
            })

        return { status, data: response };
    }

    static async updateUserTable(formValues) {
        const arr = []
        const querySnapshot = await getDocs(usersRef);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });

        const { uid, email, name, password } = formValues;
        await setDoc(doc(usersRef, String(arr.length + 1)), {
            id: uid,
            email,
            name,
            history: [],
            current_balance: 0,
            password
        })
    }


    static async updateUser(values) {
        const { id, name } = values;

        let status = 'error';
        let data = null;
        const q = query(usersRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    name: name
                });
            });


            let arr = []
            const q_user = query(usersRef, where("id", "==", id));
            const querySnapshot_user = await getDocs(q_user);
            querySnapshot_user.forEach((doc) => {
                arr.push(doc.data())
            });

            if (!!arr[0]) {
                status = 'success';
                data = arr[0];
            }
        }

        return { status, data }
    }

    static async getUserData(refreshTokenData) {
        let arr = [];
        const q = query(usersRef, where("id", "==", refreshTokenData.trim()));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });

        if (!!arr[0]) return {
            status: 'success', data: arr[0]
        }
        return {
            status: 'error', data: null
        }
    }

    static async getUserDataFromEmail(email) {
        let arr = [];
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });

        if (!!arr[0]) return {
            status: 'success', data: arr[0]
        }
        return {
            status: 'error', data: null
        }
    }
}