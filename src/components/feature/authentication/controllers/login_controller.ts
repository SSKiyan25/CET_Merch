import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../models/auth.ts";
import { getDoc, doc } from "firebase/firestore";

export const email = ref("");
export const password = ref("");

export const handleLogin = (router: any) => {
  onMounted(() => {
    initFlowbite();
  });

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
              console.log("User is an admin");
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
      console.log(error.message);
    });
};
