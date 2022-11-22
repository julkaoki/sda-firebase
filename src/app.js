import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLvXz9oFS4JWv0F0zZaILyFbytI9rG248",
  authDomain: "sda-firebase-83a31.firebaseapp.com",
  projectId: "sda-firebase-83a31",
  storageBucket: "sda-firebase-83a31.appspot.com",
  messagingSenderId: "910205788910",
  appId: "1:910205788910:web:811ccfd7240d521b4249ff"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// const kuceRef = ref(storage, "Zrzut ekranu 2022-01-19 145635.png");
// const img = document.getElementById("my-picture");
// img.src = `https://firebasestorage.googleapis.com/v0/b/${kuceRef.bucket}/o/${kuceRef.fullPath}?alt=media`;

const myBtn = document.getElementById("my-btn");
myBtn.addEventListener("click", () => {
    const header = document.getElementById("send-header");
    const file = document.getElementById("my-file").files[0];
    
    
    if (file) {
    header.innerText = "Przesyłam...";
    const name = document.getElementById("file-name");
    const myFileRef = ref(storage, name.value);

    uploadBytes(myFileRef, file).then((result) => {
        header.innerText = "Przesłano!";
        getDownloadURL(result.ref).then((url) => {
            const image = document.getElementById("my-picture");
            image.src = url;
        });
    }); 
    } 
    else {
    header.innerText = "Error!!! wybierz plik";
    }
});

const storageRef = ref(storage);

listAll(storageRef).then((res) => {
    res.items.forEach(item => {
        const newEl = document.createElement("li");
        newEl.innerText = item.fullPath;
        document.body.appendChild(newEl);
    });
});
