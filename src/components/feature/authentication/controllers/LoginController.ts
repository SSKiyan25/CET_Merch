import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase/init";
import { getDoc, doc } from "firebase/firestore";

export const email = ref("");
export const password = ref("");
export const isInvalid = ref(true);
export const loading = ref(false);
export const passwordError = ref(false);
export const emailError = ref(false);
const guestEmail = "guest@gmail.com";
const guestPassword = "guest123";

export const handleGuestLogin = (router: any) => {
  loading.value = true;
  signInWithEmailAndPassword(auth, guestEmail, guestPassword)
    .then((credential) => {
      const user = credential.user;
      console.log(user);
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
      console.log(user);

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
