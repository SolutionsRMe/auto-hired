import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA6Sq5c4PWCz1zEo1Y9xbUNZEEfMpyVeY",
  authDomain: "autohired-d3d7c.firebaseapp.com",
  projectId: "autohired-d3d7c",
  storageBucket: "autohired-d3d7c.appspot.com",
  messagingSenderId: "877765459945",
  appId: "1:877765459945:web:5049c8637e706c1c125578"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
