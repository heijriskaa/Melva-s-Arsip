// ========================================
// 1. FIREBASE IMPORT
// ========================================

import { initializeApp } 
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";


import {
    getAuth,
    signInAnonymously,
    onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


import {
    getDatabase,
    ref,
    push,
    onValue,
    serverTimestamp,
    get,
    set,
    update
}
from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";



// ========================================
// 2. FIREBASE CONFIG
// ========================================

const firebaseConfig = {

    apiKey:
    "AIzaSyBWP6bSvPNwauOyBjYH2hBM9-00fELQqKw",

    authDomain:
    "melvaarsip-c9f2b.firebaseapp.com",

    databaseURL:
    "https://melvaarsip-c9f2b-default-rtdb.firebaseio.com",

    projectId:
    "melvaarsip-c9f2b",

    storageBucket:
    "melvaarsip-c9f2b.firebasestorage.app",

    messagingSenderId:
    "197666317818",

    appId:
    "1:197666317818:web:d850d78d21f62774aef043",

    measurementId:
    "G-CJRDLM0MS9"

};



// ========================================
// 3. FIREBASE INITIALIZE
// ========================================

const app =
initializeApp(firebaseConfig);


const auth =
getAuth(app);


const db =
getDatabase(app);



// ========================================
// 4. GLOBAL VARIABLES
// ========================================

let currentUserProfile = null;



// ========================================
// 5. TOAST SYSTEM
// ========================================

const toast =
document.getElementById("toast");


function showToast(message){

    if(!toast){
        return;
    }


    toast.textContent =
    message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        1700
    );

}



// ========================================
// 6. SIDEBAR NAVIGATION
// ========================================

const navItems =
document.querySelectorAll(".nav-item");


const sidebar =
document.getElementById("sidebar");


const menuBtn =
document.getElementById("menuBtn");



navItems.forEach(item => {


    item.addEventListener(
        "click",
        () => {


            navItems.forEach(nav => {

                nav.classList.remove(
                    "active"
                );

            });



            item.classList.add(
                "active"
            );



            const section =
            item.dataset.section;



            const target =
            document.querySelector(
                `[data-panel="${section}"]`
            );



            if(target){

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

            }



            showToast(
                `${item.textContent.trim()} opened`
            );



            sidebar?.classList.remove(
                "open"
            );


        }
    );


});




// MOBILE MENU

menuBtn?.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);



document.addEventListener(
    "click",
    (event)=>{


        if(
            window.innerWidth <= 760 &&
            sidebar?.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            event.target !== menuBtn
        ){

            sidebar.classList.remove(
                "open"
            );

        }

    }
);
// ========================================
// 6. DATE + TIME + GREETING
// ========================================


const greetingElement =
document.getElementById("greeting");


const dateElement =
document.getElementById("currentDate");


const dayElement =
document.getElementById("currentDay");


const timeElement =
document.getElementById("currentTime");



function updateDateTime(){

    const now =
    new Date();


    const hour =
    now.getHours();



    let greeting =
    "Good Night";


    if(hour >= 5 && hour < 12){

        greeting =
        "Good Morning";

    }
    else if(hour >= 12 && hour < 18){

        greeting =
        "Good Afternoon";

    }
    else if(hour >= 18 && hour < 22){

        greeting =
        "Good Evening";

    }



    if(greetingElement){

        greetingElement.textContent =
        greeting;

    }



    if(dateElement){

        dateElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                day:"numeric",
                month:"long",
                year:"numeric"
            }
        );

    }



    if(dayElement){

        dayElement.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                weekday:"long"
            }
        );

    }



    if(timeElement){

        timeElement.textContent =
        now.toLocaleTimeString(
            "en-US",
            {
                hour:"2-digit",
                minute:"2-digit"
            }
        );

    }

}



updateDateTime();


setInterval(
    updateDateTime,
    1000
);
// ========================================
// 7. CALENDAR
// ========================================


const calendarElement =
document.getElementById("calendar");


const calendarMonth =
document.getElementById("calendarMonth");


const nextMonthBtn =
document.getElementById("nextMonth");



let currentCalendarDate =
new Date();



function renderCalendar(){


    if(!calendarElement){

        return;

    }



    const year =
    currentCalendarDate.getFullYear();


    const month =
    currentCalendarDate.getMonth();



    const firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();



    const totalDays =
    new Date(
        year,
        month + 1,
        0
    ).getDate();



    if(calendarMonth){

        calendarMonth.textContent =
        currentCalendarDate.toLocaleDateString(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        );

    }



    calendarElement.innerHTML = "";



    const weekdays =
    [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ];



    weekdays.forEach(day => {


        const element =
        document.createElement("span");


        element.textContent =
        day;


        element.classList.add(
            "weekday"
        );


        calendarElement.appendChild(
            element
        );


    });




    for(
        let i = 0;
        i < firstDay;
        i++
    ){

        const empty =
        document.createElement("span");


        empty.classList.add(
            "empty-day"
        );


        calendarElement.appendChild(
            empty
        );

    }



    for(
        let day = 1;
        day <= totalDays;
        day++
    ){


        const date =
        document.createElement("span");


        date.textContent =
        day;



        const today =
        new Date();



        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ){

            date.classList.add(
                "today"
            );

        }



        calendarElement.appendChild(
            date
        );

    }


}



renderCalendar();



nextMonthBtn?.addEventListener(
    "click",
    ()=>{


        currentCalendarDate.setMonth(
            currentCalendarDate.getMonth() + 1
        );


        renderCalendar();


    }
);
// ========================================
// 8. USER PROFILE
// ========================================


async function loadUserProfile(user) {

    const userRef =
    ref(
        db,
        `users/${user.uid}`
    );


    try {


        const snapshot =
        await get(userRef);



        if(snapshot.exists()) {


            currentUserProfile =
            snapshot.val();



            console.log(
                "👤 Profile loaded:",
                currentUserProfile
            );


            return;


        }



        const newProfile = {

            name:
            "Sharingan",

            photoURL:
            "",

            createdAt:
            Date.now()

        };



        await set(
            userRef,
            newProfile
        );



        currentUserProfile =
        newProfile;



        console.log(
            "✅ Profile created:",
            currentUserProfile
        );



    } catch(error){


        console.error(
            "❌ Profile error:",
            error
        );


    }

}
// ========================================
// 9. GLOBAL CHAT
// ========================================


const chatMessages =
document.getElementById(
    "chatMessages"
);



function renderMessages(snapshot){


    if(!chatMessages){

        return;

    }



    chatMessages.innerHTML = "";



    const messages =
    snapshot.val();



    if(!messages){


        chatMessages.innerHTML =
        `
        <div class="chat-empty">
            Belum ada pesan
        </div>
        `;


        return;

    }



    const currentUser =
    auth.currentUser;



    Object.values(messages)
    .forEach(message => {



        const wrapper =
        document.createElement(
            "div"
        );



        const mine =
        currentUser &&
        message.senderId === currentUser.uid;



        wrapper.className =
        mine
        ?
        "chat-message mine"
        :
        "chat-message theirs";



        wrapper.innerHTML =
        `

        <div class="message-name">

            ${message.senderName || "User"}

        </div>


        <div class="message-bubble">

            ${message.text}

        </div>


        <div class="message-time">

            ${
            message.timestamp
            ?
            new Date(
                message.timestamp
            )
            .toLocaleTimeString(
                "id-ID",
                {
                    hour:"2-digit",
                    minute:"2-digit"
                }
            )
            :
            ""
            }

        </div>

        `;



        chatMessages.appendChild(
            wrapper
        );


    });



    chatMessages.scrollTop =
    chatMessages.scrollHeight;


}
const chatForm =
document.getElementById(
    "chatForm"
);


const chatInput =
document.getElementById(
    "chatInput"
);



chatForm?.addEventListener(
    "submit",
    async(event)=>{


        event.preventDefault();



        const text =
        chatInput.value.trim();



        if(!text){

            return;

        }



        const user =
        auth.currentUser;



        if(!user){

            showToast(
                "User belum login"
            );

            return;

        }



        try {


            await push(

                ref(
                    db,
                    "messages"
                ),


                {

                    senderId:
                    user.uid,


                    senderName:
                    currentUserProfile?.name
                    ||
                    "User",


                    text:
                    text,


                    timestamp:
                    Date.now()

                }

            );



            chatInput.value =
            "";



        }
        catch(error){


            console.error(
                "Send error:",
                error
            );


        }


    }

);
// ========================================
// 10. AUTHENTICATION
// ========================================


signInAnonymously(auth)
.then(()=>{


    console.log(
        "✅ Anonymous login"
    );


})
.catch(error=>{


    console.error(
        error
    );


});





onAuthStateChanged(
    auth,
    async(user)=>{


        if(!user){

            return;

        }



        console.log(
            "UID:",
            user.uid
        );



        await loadUserProfile(
            user
        );



        const messagesRef =
        ref(
            db,
            "messages"
        );



        onValue(
            messagesRef,
            snapshot=>{


                renderMessages(
                    snapshot
                );


            }

        );


    }

);
// ========================================
// 11. EDIT PROFILE
// ========================================


const editProfileBtn =
document.getElementById(
    "editProfileBtn"
);


const profileModal =
document.getElementById(
    "profileModal"
);


const closeProfileModal =
document.getElementById(
    "closeProfileModal"
);


const profileName =
document.getElementById(
    "profileName"
);


const profilePhoto =
document.getElementById(
    "profilePhoto"
);


const profilePreview =
document.getElementById(
    "profilePreview"
);


const saveProfileBtn =
document.getElementById(
    "saveProfileBtn"
);


const profileSaveStatus =
document.getElementById(
    "profileSaveStatus"
);
editProfileBtn?.addEventListener(
    "click",
    ()=>{


        profileModal.classList.add(
            "active"
        );


        profileName.value =
        currentUserProfile?.name || "";


    }
);
closeProfileModal?.addEventListener(
    "click",
    ()=>{


        profileModal.classList.remove(
            "active"
        );


    }
);
profilePhoto?.addEventListener(
    "change",
    ()=>{


        const file =
        profilePhoto.files[0];


        if(!file){

            return;

        }



        const reader =
        new FileReader();



        reader.onload =
        (event)=>{


            profilePreview.innerHTML =
            `

            <img
                src="${event.target.result}"
                alt="Preview">

            `;


        };



        reader.readAsDataURL(file);


    }
);
saveProfileBtn?.addEventListener(
    "click",
    async()=>{


        const user =
        auth.currentUser;



        if(!user){

            showToast(
                "User belum login"
            );

            return;

        }



        const newName =
        profileName.value.trim();



        if(!newName){

            showToast(
                "Nama tidak boleh kosong"
            );

            return;

        }



        try{


            await update(

                ref(
                    db,
                    `users/${user.uid}`
                ),


                {

                    name:
                    newName

                }

            );



            currentUserProfile =
            {

                ...currentUserProfile,

                name:
                newName

            };



            profileSaveStatus.textContent =
            "Profile saved ✓";



            showToast(
                "Profile updated"
            );



            setTimeout(
                ()=>{


                    profileModal.classList.remove(
                        "active"
                    );


                },
                800
            );



        }
        catch(error){


            console.error(
                "Profile update error:",
                error
            );


            profileSaveStatus.textContent =
            "Failed to save";


        }


    }
);