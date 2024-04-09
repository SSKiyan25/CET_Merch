import { ref } from "vue";
import { auth, db } from "@/firebase/init.ts";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const firstName = ref("");
export const lastName = ref("");
export const email = ref("");
export const password = ref("");
export const department = ref("");
export const studentId = ref("");
export const username = ref("");
export const phoneNumber = ref("");
export const loading = ref(false);

export const confirmPassword = ref("");
export const errorPassword = ref(false);
const role = ref("user");

const passwordsMatch = () => {
  return password.value === confirmPassword.value;
};

export const handleSignup = async (router: any) => {
  if (!passwordsMatch()) {
    loading.value = false;
    errorPassword.value = true;
    return;
  }
  loading.value = true;
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    const user = credential.user;

    if (user) {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        name: `${lastName.value}, ${firstName.value}`,
        faction: department.value,
        studentId: studentId.value,
        username: username.value,
        email: email.value,
        role: role.value,
      });

      router.push({ name: "launchPage" });
    }
  } catch (error) {
    console.log("Error creating user:", error);
  } finally {
    loading.value = false;
  }
};
