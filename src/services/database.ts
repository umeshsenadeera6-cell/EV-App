import { collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export const userService = {
  async createUserProfile(uid: string, data: any) {
    await setDoc(doc(db, "users", uid), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  },

  async getUserProfile(uid: string) {
    const docSnap = await getDoc(doc(db, "users", uid));
    return docSnap.exists() ? docSnap.data() : null;
  },

  async updateStats(uid: string, stats: any) {
    await updateDoc(doc(db, "users", uid), {
      stats,
      updatedAt: new Date(),
    });
  },
};

export const stationService = {
  async getNearbyStations() {
    const q = query(collection(db, "stations"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};
