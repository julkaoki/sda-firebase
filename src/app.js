import './../styles/styles.css';
import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

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

// const myBtn = document.getElementById("my-btn");
// myBtn.addEventListener("click", () => {
//     const header = document.getElementById("send-header");
//     const file = document.getElementById("my-file").files[0];
    
    
//     if (file) {
//     header.innerText = "Przesyłam...";
//     const name = document.getElementById("file-name");
//     const myFileRef = ref(storage, name.value);

//     uploadBytes(myFileRef, file).then((result) => {
//         header.innerText = "Przesłano!";
//         getDownloadURL(result.ref).then((url) => {
//             const image = document.getElementById("my-picture");
//             image.src = url;
//         });
//     }); 
//     } 
//     else {
//     header.innerText = "Error!!! wybierz plik";
//     }
// });

// const storageRef = ref(storage);

// listAll(storageRef).then((res) => {
//     res.items.forEach(item => {
//         const newEl = document.createElement("li");
//         newEl.innerText = item.fullPath;
//         document.body.appendChild(newEl);
//     });
// });


// const delImage = ref(storage, "test.jpg");
// deleteObject(delImage).then(() => {console.log("usunięto plik")});

// ZADANIE Z KARTAMI UŻYTKOWNIKÓW


const usersList = document.getElementById("users");


function createUserCard(name, image) {
    const userCard = document.createElement("div").addId("userCard");
    const userName = document.createElement("h2").addId("userName");
    const userImage = document.createElement("img").addId("userImage");
    userName.innerText = name;
    userImage.src = image;
    userCard.appendChild(userName);
    userCard.appendChild(userImage);
}

function renderCards() {
    const imageRef = ref(storage);
    users.innerHTML = "";
    listAll(imageRef).then((res) => {
        res.items.forEach(item => {
            const card = document.createElement("div");
            const img = document.createElement("img");
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.dataset.imageName = item.fullPath;

            card.classList.add("userCard");
            img.classList.add("userImage");

            usersList.appendChild(card);
            card.appendChild(img);
            card.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", (event) => {
                const imageRef = ref(storage, event.target.dataset.imageName);
                deleteObject(imageRef).then(() => {
                    console.log("plik usunięto");
                    renderCards();
                });
            });

            getDownloadURL(item).then((url) => {
                img.src = url;
            });
            
        });
    });
}

renderCards();

