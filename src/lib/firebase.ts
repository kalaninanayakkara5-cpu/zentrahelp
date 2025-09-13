import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return !!(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID &&
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
  );
};

// Log configuration status
if (!isFirebaseConfigured()) {
  console.warn('Firebase environment variables not found. Using localStorage fallback mode.');
} else {
  console.log('Firebase configured successfully');
}

// Local storage keys
const STORAGE_KEYS = {
  services: 'zentra_services',
  projects: 'zentra_projects',
  gallery: 'zentra_gallery',
  testimonials: 'zentra_testimonials',
  slider_images: 'zentra_slider_images',
  admin_credentials: 'zentra_admin_credentials',
  bookings: 'zentra_bookings'
};

// Initialize local storage with demo data
const initializeLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.services)) {
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify([
      {
        id: '1',
        title: 'Professional Lawn Mowing',
        description: 'Regular lawn mowing service to keep your grass healthy and well-maintained.',
        image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'maintenance',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Landscape Design',
        description: 'Custom landscape design services to transform your outdoor space.',
        image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'design',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Tree Trimming & Pruning',
        description: 'Professional tree care services to maintain healthy and beautiful trees.',
        image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'maintenance',
        created_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.projects)) {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify([
      {
        id: '1',
        title: 'Modern Front Yard Makeover',
        description: 'Complete transformation of a residential front yard with new landscaping.',
        before_image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
        after_image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
        client_name: 'John Smith',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Backyard Garden Installation',
        description: 'Beautiful garden installation with native plants and irrigation system.',
        before_image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
        after_image: 'https://images.pexels.com/photos/1049298/pexels-photo-1049298.jpeg?auto=compress&cs=tinysrgb&w=800',
        client_name: 'Mary Johnson',
        created_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.gallery)) {
    localStorage.setItem(STORAGE_KEYS.gallery, JSON.stringify([
      {
        id: '1',
        image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Beautiful lawn maintenance',
        category: 'lawn-care',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Professional landscaping',
        category: 'landscaping',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
        caption: 'Garden installation',
        category: 'garden',
        created_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.testimonials)) {
    localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify([
      {
        id: '1',
        client_name: 'Sarah Johnson',
        review_text: 'Excellent service! My lawn has never looked better.',
        rating: 5,
        status: 'approved',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        client_name: 'Mike Davis',
        review_text: 'Professional team and great results. Highly recommended!',
        rating: 5,
        status: 'approved',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        client_name: 'Lisa Chen',
        review_text: 'Amazing transformation of our backyard. Thank you!',
        rating: 4,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.slider_images)) {
    localStorage.setItem(STORAGE_KEYS.slider_images, JSON.stringify([
      {
        id: '1',
        image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=1920',
        caption: 'Professional Lawn Care Services',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=1920',
        caption: 'Beautiful Landscape Design',
        created_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.admin_credentials)) {
    localStorage.setItem(STORAGE_KEYS.admin_credentials, JSON.stringify([
      {
        id: '1',
        username: 'admin123',
        password: 'admin123',
        updated_at: new Date().toISOString()
      }
    ]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.bookings)) {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify([]));
  }
};

// Initialize on load
initializeLocalStorage();

// Image upload utility
export const uploadImage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    if (isFirebaseConfigured()) {
      // Upload to Firebase Storage
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `images/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      console.log('Image uploaded to Firebase Storage:', downloadURL);
      return downloadURL;
    } else {
      // Fallback to base64 for demo
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Admin authentication
export const authenticateAdmin = async (username: string, password: string) => {
  try {
    if (isFirebaseConfigured()) {
      try {
        // Query Firebase for admin credentials
        const credentialsRef = collection(db, 'admin_credentials');
        const q = query(credentialsRef, where('username', '==', username), where('password', '==', password));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          console.log('Firebase authentication successful');
          return { success: true, user: { ...userData, id: querySnapshot.docs[0].id } };
        }
      } catch (dbError) {
        console.warn('Firebase authentication failed, falling back to localStorage:', dbError);
      }
    }
    
    // Fallback to local storage
    const credentials = JSON.parse(localStorage.getItem(STORAGE_KEYS.admin_credentials) || '[]');
    const user = credentials.find((cred: any) => cred.username === username && cred.password === password);
    
    if (user) {
      console.log('localStorage authentication successful');
      return { success: true, user };
    }
    
    throw new Error('Invalid credentials');
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};

// Generic data operations
export const fetchData = async (tableName: string) => {
  try {
    if (isFirebaseConfigured()) {
      try {
        const collectionRef = collection(db, tableName);
        const q = query(collectionRef, orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        console.log(`Successfully fetched ${data.length} records from Firebase ${tableName}`);
        return data;
      } catch (dbError) {
        console.warn(`Firebase fetch failed for ${tableName}, using localStorage:`, dbError);
      }
    }
    
    // Fallback to local storage
    const storageKey = STORAGE_KEYS[tableName as keyof typeof STORAGE_KEYS];
    if (storageKey) {
      const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      console.log(`Fetched ${data.length} records from localStorage for ${tableName}`);
      return data;
    }
    
    console.warn(`No storage key found for table: ${tableName}`);
    return [];
  } catch (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return [];
  }
};

export const insertData = async (tableName: string, data: any) => {
  try {
    const newItem = {
      ...data,
      created_at: new Date().toISOString()
    };

    let dbSuccess = false;
    let docId = '';
    
    if (isFirebaseConfigured()) {
      try {
        const collectionRef = collection(db, tableName);
        const docRef = await addDoc(collectionRef, newItem);
        docId = docRef.id;
        console.log(`Successfully inserted record into Firebase ${tableName}:`, docId);
        dbSuccess = true;
      } catch (dbError) {
        console.warn(`Firebase insert failed for ${tableName}, using localStorage:`, dbError);
      }
    }
    
    // Always update localStorage as backup or primary storage
    const storageKey = STORAGE_KEYS[tableName as keyof typeof STORAGE_KEYS];
    if (storageKey) {
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const itemWithId = {
        ...newItem,
        id: docId || crypto.randomUUID()
      };
      existingData.unshift(itemWithId);
      localStorage.setItem(storageKey, JSON.stringify(existingData));
      console.log(`Updated localStorage for ${tableName}`);
    }
    
    return { success: true, usedDatabase: dbSuccess };
  } catch (error) {
    console.error(`Error inserting into ${tableName}:`, error);
    throw error;
  }
};

export const updateData = async (tableName: string, id: string, data: any) => {
  try {
    let dbSuccess = false;
    
    if (isFirebaseConfigured()) {
      try {
        const docRef = doc(db, tableName, id);
        await updateDoc(docRef, {
          ...data,
          updated_at: new Date().toISOString()
        });
        console.log(`Successfully updated record in Firebase ${tableName}:`, id);
        dbSuccess = true;
      } catch (dbError) {
        console.warn(`Firebase update failed for ${tableName}, using localStorage:`, dbError);
      }
    }
    
    // Always update localStorage as backup or primary storage
    const storageKey = STORAGE_KEYS[tableName as keyof typeof STORAGE_KEYS];
    if (storageKey) {
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const index = existingData.findIndex((item: any) => item.id === id);
      
      if (index !== -1) {
        existingData[index] = { ...existingData[index], ...data };
        localStorage.setItem(storageKey, JSON.stringify(existingData));
        console.log(`Updated localStorage for ${tableName}:`, id);
      }
    }
    
    return { success: true, usedDatabase: dbSuccess };
  } catch (error) {
    console.error(`Error updating ${tableName}:`, error);
    throw error;
  }
};

export const deleteData = async (tableName: string, id: string) => {
  try {
    let dbSuccess = false;
    
    if (isFirebaseConfigured()) {
      try {
        const docRef = doc(db, tableName, id);
        await deleteDoc(docRef);
        console.log(`Successfully deleted record from Firebase ${tableName}:`, id);
        dbSuccess = true;
      } catch (dbError) {
        console.warn(`Firebase delete failed for ${tableName}, using localStorage:`, dbError);
      }
    }
    
    // Always update localStorage as backup or primary storage
    const storageKey = STORAGE_KEYS[tableName as keyof typeof STORAGE_KEYS];
    if (storageKey) {
      const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const filteredData = existingData.filter((item: any) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(filteredData));
      console.log(`Updated localStorage for ${tableName} (deleted):`, id);
    }
    
    return { success: true, usedDatabase: dbSuccess };
  } catch (error) {
    console.error(`Error deleting from ${tableName}:`, error);
    throw error;
  }
};

// Email notification service using Resend API
export const sendBookingNotification = async (bookingData: any) => {
  try {
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    const fromEmail = import.meta.env.VITE_RESEND_FROM_EMAIL || 'noreply@zentraholdings.com';
    const toEmail = import.meta.env.VITE_RESEND_TO_EMAIL || 'admin@zentraholdings.com';
    
    if (!resendApiKey) {
      console.warn('Resend API key not configured. Skipping email notification.');
      return { success: false, error: 'API key not configured' };
    }
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Zentra Holdings <${fromEmail}>`,
        to: [toEmail],
        subject: 'New Service Booking Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #006400;">New Service Booking Request</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Customer Information</h3>
              <p><strong>Name:</strong> ${bookingData.name}</p>
              <p><strong>Email:</strong> ${bookingData.email}</p>
              <p><strong>Phone:</strong> ${bookingData.phone}</p>
              <p><strong>Address:</strong> ${bookingData.address}</p>
            </div>
            
            <div style="background-color: #f0f8f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Service Details</h3>
              <p><strong>Service:</strong> ${bookingData.service}</p>
              <p><strong>Preferred Date:</strong> ${bookingData.preferred_date ? new Date(bookingData.preferred_date).toLocaleDateString() : 'Not specified'}</p>
              <p><strong>Preferred Time:</strong> ${bookingData.preferred_time}</p>
              ${bookingData.message ? `<p><strong>Message:</strong> ${bookingData.message}</p>` : ''}
            </div>
            
            <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Please respond to this booking request as soon as possible to provide excellent customer service.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Submit booking with email notification
export const submitBooking = async (bookingData: any) => {
  try {
    const result = await insertData('bookings', {
      ...bookingData,
      status: 'pending'
    });
    
    // Send email notification (don't wait for it to complete)
    sendBookingNotification(bookingData).catch(error => {
      console.error('Email notification failed:', error);
    });
    
    return result;
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
};

// Submit testimonial/review
export const submitTestimonial = async (testimonialData: any) => {
  try {
    const result = await insertData('testimonials', {
      ...testimonialData,
      status: 'pending'
    });
    
    // Send email notification about new review
    sendReviewNotification(testimonialData).catch(error => {
      console.error('Review notification failed:', error);
    });
    
    return result;
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    throw error;
  }
};

// Send review notification email
export const sendReviewNotification = async (reviewData: any) => {
  try {
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;
    const fromEmail = import.meta.env.VITE_RESEND_FROM_EMAIL || 'noreply@zentraholdings.com';
    const toEmail = import.meta.env.VITE_RESEND_TO_EMAIL || 'admin@zentraholdings.com';
    
    if (!resendApiKey) {
      console.warn('Resend API key not configured. Skipping review notification.');
      return { success: false, error: 'API key not configured' };
    }
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Zentra Holdings <${fromEmail}>`,
        to: [toEmail],
        subject: 'New Customer Review Submitted',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #006400;">New Customer Review</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Review Details</h3>
              <p><strong>Customer:</strong> ${reviewData.client_name}</p>
              <p><strong>Rating:</strong> ${reviewData.rating}/5 stars</p>
              <div style="margin: 15px 0;">
                <strong>Review:</strong>
                <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 5px;">
                  "${reviewData.review_text}"
                </div>
              </div>
            </div>
            
            <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Please review and approve this testimonial in your admin panel.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, id: result.id };
  } catch (error) {
    console.error('Error sending review notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};