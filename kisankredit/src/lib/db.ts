import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  getDoc,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './firebase';

export interface LoanApplication {
  id?: string;
  userId: string;
  fullName: string;
  phone: string;
  address: string;
  landSize: number;
  cropType: string;
  location: string;
  amount: number;
  tenure: number;
  purpose: string;
  status: 'Submitted' | 'Verification' | 'Inspection' | 'Approval' | 'Disbursement';
  createdAt: any;
}

export const dbService = {
  // Store Loan Application
  async applyForLoan(loanData: any) {
    try {
      const docRef = await addDoc(collection(db, 'loans'), {
        ...loanData,
        status: 'Submitted',
        createdAt: serverTimestamp(),
      });
      return { id: docRef.id, ...loanData, status: 'Submitted' };
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  },

  // Get Active Loan for User
  async getActiveLoan(userId: string) {
    try {
      const q = query(
        collection(db, 'loans'), 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const data = querySnapshot.docs[0].data();
      return { id: querySnapshot.docs[0].id, ...data };
    } catch (error) {
      console.error("Error getting loans: ", error);
      return null;
    }
  }
};
