import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import { auth } from './config';
import { db } from './config';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';


onAuthStateChanged(auth, async (user) =>{
    if(user){
        console.log("Logged in user: ", user.email)
        await fetchUserData(user.uid)    
    } else{
        console.log("No user signed in.")
    }
})

async function fetchUserData(userId){
    try {
        const userDoc = await getDocs(collection(db, "users"))
        const userData = userDoc.docs.find(doc => doc.id === userId)?.data()
        console.log("User data: ", userData)
        document.getElementById("greeting").innerHTML = "<h1> Hi, " + userData.firstname + "</h1>";
    } catch(error){
        console.error("Error getting user data: ", error)
    }
}
export async function signUp(firstName, lastName, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("user signed up:", userCredential.user.email);
        console.log("User ID:", userCredential.user.uid);
        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef,{
            firstname:firstName,
            lastname:lastName,
            timestamp: new Date()
        })
    }catch (error){
        console.error("Error fetching user data:", error)
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        window.location.href = "profile.html"
    }catch (error) {
        console.error("Login error: " + error.message)
    }
}

export async function logout() {
    try {
        await signOut(auth)
        console.log("User logged out.")
    }catch(error) {
        console.error("Logout error: ", error.message)
    }
}