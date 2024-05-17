import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app } from 'firebase.js';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);
const usersTable = collection(db, "users");

function wait() {
    return new Promise(resolve => {
        setTimeout(resolve, 1200);
    });
}

export default class PostService {
    static async getAsyncFetch() {
        await wait();
    }

    static setUserRefreshToken(refreshToken) {
        const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

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
                const { status: status_user, data: data_user } = await PostService.getUserData(token);

                if (status_user === 'error') return
                if (remember) PostService.setUserRefreshToken(userCredential.user.uid)

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
                    PostService.setUserRefreshToken(userCredential.user.uid)
                }

                await PostService.updateUserTable({
                    uid, email, remember, name
                });

                status = 'success';
                return user
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return errorCode;
            })

        return { status, data: response };
    }

    static async updateUserTable(formValues) {
        const arr = []
        const querySnapshot = await getDocs(usersTable);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });

        const { uid, email, name } = formValues;
        await setDoc(doc(usersTable, String(arr.length + 1)), {
            id: uid,
            email,
            name,
        })
    }

    static async getUserData(refreshTokenData) {
        let arr = [];
        const q = query(usersTable, where("id", "==", refreshTokenData.trim()));
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