import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { app } from 'firebase.js';

const db = getFirestore(app);
// const catalogRef = collection(db, "catalog");
// const feedbackRef = collection(db, "feedback");
const usersTable = collection(db, "users");
// const userRef = collection(db, "authUsers");
// const categoryRef = collection(db, "category");
// const ordersRef = collection(db, "orders");
// const promoCodesRef = collection(db, "promoCodes");

function wait() {
    return new Promise(resolve => {
        setTimeout(resolve, 1200);
    });
}

export default class PostService {
    static async getAsyncFetch() {
        await wait();
    }

    // static async getAllProducts() {
    //     let arr = [];
    //     const querySnapshot = await getDocs(catalogRef);
    //     querySnapshot.forEach((doc) => {
    //         arr.push(doc.data().product)
    //     });
    //     return arr;
    // }

    // static async sendFeedbackForm(formValues) {
    //     await setDoc(doc(feedbackRef, String(formValues.id)), {
    //         id: formValues.id,
    //         name: formValues.name,
    //         telephone: formValues.telephone,
    //         email: formValues.email,
    //         message: formValues.message,
    //         isRead: false
    //     })
    // }

    static async sendRegisterForm(formValues) {
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

    static async getUserToken(refreshTokenData) {
        let arr = [];
        const q = query(usersTable, where("id", "==", refreshTokenData.trim()));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });
        return arr[0];
    }

    // static async getCategory() {
    //     let arr = [];
    //     const querySnapshot = await getDocs(categoryRef);
    //     querySnapshot.forEach((doc) => {
    //         arr.push(doc.data())
    //     });
    //     return arr;
    // }

    // static async sendOrderForm(formValues) {
    //     const { id, nameSurname, city, telephone, email, wishes, payment, adress, date, status, sum, products } = formValues;
    //     await setDoc(doc(ordersRef, String(formValues.id)), {
    //         id,
    //         nameSurname,
    //         city,
    //         telephone,
    //         email,
    //         wishes,
    //         payment,
    //         adress,
    //         date,
    //         status,
    //         sum,
    //         products
    //     })
    // }

    // static async getPromocode(promocode) {
    //     let arr = [];
    //     const q = query(promoCodesRef, where("promocode", "==", promocode.trim()));
    //     const qIsUsed = query(promoCodesRef, where("promocode", "==", promocode.trim()), where("isUsed", "==", false));
    //     const querySnapshot = await getDocs(q);
    //     const querySnapshotIsUsed = await getDocs(qIsUsed);

    //     if (querySnapshotIsUsed.docs[0]) {
    //         querySnapshotIsUsed.forEach((doc) => {
    //             arr.push(doc.data())
    //         });
    //         return arr[0];
    //     } else if (querySnapshot.docs[0]) {
    //         return 'already-used'
    //     } else return 'not-found'
    // }

    // static async updatePromocode(promocode) {
    //     const q = query(promoCodesRef, where("promocode", "==", promocode.trim()));
    //     const querySnapshot = await getDocs(q);
    //     const promoCodeRef = doc(db, "promoCodes", querySnapshot.docs[0].ref.id);
    //     await updateDoc(promoCodeRef, {
    //         isUsed: true
    //     });

    // }
}