import { arrayUnion, collection, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { app } from 'firebase.js';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);
const usersRef = collection(db, "users");

function wait() {
    return new Promise(resolve => {
        setTimeout(resolve, 1200);
    });
}

export default class PostService {
    static async getAsyncFetch() {
        await wait();
    }

    static async removeCategory(values) {
        const { uid, id } = values;

        let status = 'error';
        let data = [];
        const q = query(usersRef, where("id", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                const doc_data = doc.data();
                const categories = doc_data.categories || [];

                const updatedArray = categories.filter(item => item.id !== id);

                status = 'success';
                data = [...updatedArray];

                await updateDoc(doc.ref, {
                    categories: updatedArray
                });
            });
        }

        return { status, data: [...data] }
    }

    static async editCategory(valuesForm) {
        const { uid, id, ...values } = valuesForm;

        let status = 'error';
        let data = [];
        const q = query(usersRef, where("id", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                const doc_data = doc.data();
                const categories = doc_data.categories || [];

                function updateOrder(arr, id, values) {
                    const { category_name_edit, category_order_edit } = values;
                    let isConflict = false;

                    let orderIndex = Number(category_order_edit);
                    const updatedArray = arr.map(item => {
                        if (Number(item.order) === orderIndex && item.id !== id) {
                            isConflict = true;
                            orderIndex = Number(item.order) + 1;
                            return { ...item, order: Number(item.order) + 1 };
                        }
                        if (item.id === id) {
                            return { ...item, name: category_name_edit, order: category_order_edit };
                        }
                        return item;
                    });

                    if (isConflict) {
                        return updateOrder(updatedArray, id, values);
                    }
                    return updatedArray;
                }


                const updatedArray = updateOrder(categories, id, values);

                status = 'success';
                data = [...updatedArray];

                await updateDoc(doc.ref, {
                    categories: updatedArray
                });
            });
        }

        return { status, data: [...data] }
    }

    static async addNewCategory(values) {
        const { id: uid, category_name } = values;

        let status = 'error';
        let data = null;
        const q = query(usersRef, where("id", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                await updateDoc(doc.ref, {
                    categories: arrayUnion({
                        id: Date.now(),
                        name: category_name,
                        order: 1
                    })
                });
            });

            let arr = []
            const q_user = query(usersRef, where("id", "==", uid));
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
}