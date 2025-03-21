import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async register(email: string, password: string, role: string): Promise<void> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      
      await setDoc(doc(this.firestore, 'users', user.uid), { email, role });
      console.log(`User registered as ${role}`);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  async login(email: string, password: string): Promise<string | null> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      
      return await this.getCurrentUserRole(user.uid);
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }


  async getCurrentUserRole(userId?: string): Promise<string | null> {
    try {
      const user: User | null = this.auth.currentUser;
      const uid = userId || user?.uid; 

      if (!uid) return null;

      const userDoc = await getDoc(doc(this.firestore, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data()?.['role']; 
      }

      return null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  }
  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent!');
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }


  logout() {
    return signOut(this.auth);
  }
}
