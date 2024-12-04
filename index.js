import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase,
         ref,
         push,
        onValue,
         remove} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// const firebaseConfig = {
//     databaseURL : "https://leads-saver-app-k183-default-rtdb.firebaseio.com/"
// }
const DATABASE_URL = "https://leads-saver-app-k183-default-rtdb.firebaseio.com/"
const firebaseConfig = {
    databaseURL: DATABASE_URL
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const reference = ref(database,"links")

const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const deleteBtn = document.getElementById('delete-btn')

inputBtn.addEventListener('click', function(){
    push(reference,inputEl.value)
    inputEl.value=""
})
onValue(reference,function(snapshot){
        const snapDoesExist = snapshot.exists()
        if(snapDoesExist){
            const snapValues = snapshot.val()
            let links = Object.values(snapValues)
            show(links)
        }
})
deleteBtn.addEventListener('dblclick',function(){
    remove(reference)
    ulEl.innerHTML = ""
})

function show(links){
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        // listItems += "<li><a target='_blank' href='" + inputs[i] + "'>" + inputs[i] + "</a></li>"
        listItems += `<li>
                        <a target='_blank' href='${links[i]}'>
                            ${links[i]}
                        </a>
                    </li>  `
    }   
    ulEl.innerHTML = listItems  // NO.2
}

