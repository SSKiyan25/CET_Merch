import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/init";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const email = ref("");
export const password = ref("");
export const isInvalid = ref(true);
export const loading = ref(false);
export const passwordError = ref(false);
export const emailError = ref(false);
const provider = new GoogleAuthProvider();
const guestEmail = "guest@gmail.com";
const guestPassword = "guest123";

export const handleGuestLogin = (router: any) => {
  loading.value = true;
  signInWithEmailAndPassword(auth, guestEmail, guestPassword)
    .then((credential) => {
      const user = credential.user;
      //console.log(user);
      if (!user) return;
      // Redirect to regular dashboard
      router.push({ name: "launchPage" });
    })
    .catch((error) => {
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);
    })
    .finally(() => {
      loading.value = false;
    });
};

export const handleLogin = (router: any) => {
  loading.value = true;
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((credential) => {
      const user = credential.user;
      //console.log(user);

      // Fetch user data from Firestore
      getDoc(doc(db, "users", user.uid))
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            if (userData.isAdmin || userData.role === "seller") {
              console.log("User is an admin/seller");
              // Redirect to admin dashboard
              router.push({ name: "adminDashboard" });
            } else {
              console.log("User is not an admin");
              // Redirect to regular dashboard
              router.push({ name: "launchPage" });
            }
          } else {
            console.log("No such user!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
    .catch((error) => {
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      if (error.code === "auth/invalid-credential") {
        passwordError.value = true;
      } else if (error.code === "auth/invalid-credential") {
        emailError.value = true;
      } else {
        console.log("Unexpected error during sign in:", error);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

export const loginWithGoogle = async (router: any) => {
  console.log("accessed");
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // If the user's email is null, throw an error
    if (!user.email) {
      throw new Error("User does not have an email");
    }

    // If the user's display name is null, use the local part of the email as the name
    const name = user.displayName || user.email.split("@")[0];

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    // Only add a new document to the users collection if it doesn't already exist
    if (!userDoc.exists()) {
      try {
        await setDoc(userDocRef, {
          name: name,
          email: user.email,
          uid: user.uid,
          role: "user",
          department: "", // Default value
          faction: "", // Default value
          lastViewed: {}, // Default value
          studentId: "", // Default value
          username: user.email.split("@")[0], // Default value
        });
      } catch (error) {
        console.error("Error adding user to Firestore:", error);
      }
    }

    // Navigate to the dashboard
    router.push({ name: "launchPage" });
  } catch (error) {
    console.error("Error logging in with Google:", error);
  }
};
