import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA0whqjvXQJI8p1cP6OqpoMOGtWU_RmBGM',
  authDomain: 'eatout-27c7d.firebaseapp.com',
  databaseURL: 'https://eatout-27c7d.firebaseio.com',
  storageBucket: 'eatout-27c7d.appspot.com',
  projectId: 'eatout-27c7d',
  messagingSenderId: '358366068015',
  appId: '1:358366068015:android:e19deae0f1549b450f75da',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };