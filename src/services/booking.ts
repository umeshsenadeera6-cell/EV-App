import { collection, doc, addDoc, getDocs, query, where, orderBy, serverTimestamp, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export interface Reservation {
  id?: string;
  stationId: string;
  userId: string;
  startTime: any;
  endTime: any;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  portIndex: number;
  totalCost?: number;
}

export interface QueueEntry {
  id?: string;
  stationId: string;
  userId: string;
  joinedAt: any;
  estimatedWaitTime: number;
  position: number;
}

export const bookingService = {
  // Create a new reservation
  async createReservation(userId: string, stationId: string, duration: number): Promise<Reservation> {
    const reservation: Omit<Reservation, 'id'> = {
      userId,
      stationId,
      startTime: new Date(),
      endTime: new Date(Date.now() + duration * 60000),
      status: 'confirmed',
      portIndex: 0,
    };
    const docRef = await addDoc(collection(db, "reservations"), {
      ...reservation,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...reservation };
  },

  // Get user reservations
  async getUserReservations(userId: string) {
    const q = query(
      collection(db, "reservations"),
      where("userId", "==", userId),
      orderBy("startTime", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
  },

  // Join the queue
  async joinQueue(userId: string, stationId: string): Promise<QueueEntry> {
    const q = query(
      collection(db, "queues"),
      where("stationId", "==", stationId),
      where("userId", "==", userId)
    );
    const existing = await getDocs(q);
    
    if (!existing.empty) {
      return { id: existing.docs[0].id, ...existing.docs[0].data() } as QueueEntry;
    }

    const waitTime = 15; // Default wait time
    const position = await this.getQueueCount(stationId) + 1;
    
    const entryData = {
      stationId,
      userId,
      joinedAt: new Date(),
      estimatedWaitTime: waitTime,
      position,
    };

    const docRef = await addDoc(collection(db, "queues"), {
      ...entryData,
      joinedAt: serverTimestamp(),
    });

    return { id: docRef.id, ...entryData } as QueueEntry;
  },

  // Get queue count for a station
  async getQueueCount(stationId: string): Promise<number> {
    const q = query(
      collection(db, "queues"),
      where("stationId", "==", stationId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  },

  // Leave queue
  async leaveQueue(queueId: string) {
    await deleteDoc(doc(db, "queues", queueId));
  },

  // Cancel reservation
  async cancelReservation(reservationId: string) {
    await updateDoc(doc(db, "reservations", reservationId), {
      status: 'cancelled',
      updatedAt: serverTimestamp(),
    });
  }
};
