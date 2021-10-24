let listsContainer = document.getElementById("listsContainer");

let nameBox = document.getElementById("nameBox");
let emailBox = document.getElementById("emailBox");
let phoneBox = document.getElementById('phoneBox');
let addBtnEl = document.getElementById("addBtnEl");
let saveBtnEl = document.getElementById("saveBtnEl");

function getContactsFromLocalStorage(){
    let stringifiedContacts = localStorage.getItem("contactInfo");
    let parsedContacts = JSON.parse(stringifiedContacts);
    if(parsedContacts === null){
        return [];
    }else{
        return parsedContacts;
    }
}



let contactInfo = getContactsFromLocalStorage();

function deleteContact(listId){
    let contactItem = document.getElementById(listId);
    listsContainer.removeChild(contactItem);

    let deleteElementIndex = contactInfo.findIndex(function(eachContact){
        let eachContactId = "contact"+eachContact.id;
        if(eachContactId === listId){
            return true;
        }else{
            return false;
        }
    })

    contactInfo.splice(deleteElementIndex,1);
}

function highLighter(bgId){
    let boxEl = document.getElementById(bgId);
    boxEl.classList.toggle('bgStyle')

    let contactObjectIndex = contactInfo.findIndex(function(eachContact){
        let contactId = "bg"+eachContact.id;

        if(contactId === bgId){
            return true;
        }else{
            return false;
        }
    });

    let cItem = contactInfo[contactObjectIndex];

    if(cItem.isclicked === true){
        cItem.isclicked = false;
    }else{
        cItem.isclicked = true;
    }
}

saveBtnEl.onclick = function(){
    localStorage.setItem('contactInfo',JSON.stringify(contactInfo));
}


function createContact(info){
    let listId = "contact"+info.id;
    let bgId = "bg"+info.id;


    let listIt = document.createElement("li");
    listIt.id = listId;
    listIt.classList.add("listItem");
    listsContainer.appendChild(listIt);

    let contactContainer = document.createElement("div");
    contactContainer.classList.add("contactBox");
    contactContainer.id = bgId;
    listIt.appendChild(contactContainer);

    let detailsContainer = document.createElement('div');
    contactContainer.appendChild(detailsContainer);

    let nameEl = document.createElement("p");
    nameEl.textContent = "Name: "+info.name;
    detailsContainer.appendChild(nameEl);

    let emailEl = document.createElement("p");
    emailEl.textContent = "Email: "+info.email;
    detailsContainer.appendChild(emailEl);

    let phoneEl = document.createElement("p");
    phoneEl.textContent = 'Phone: '+info.ph_no;
    detailsContainer.appendChild(phoneEl);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add('displayDelete')
    contactContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.onclick = function(){
        deleteContact(listId);
    }
    deleteIcon.classList.add("fas", "fa-trash-alt");
    deleteContainer.appendChild(deleteIcon);

    let starIcon = document.createElement('i');
    starIcon.onclick = function(){
        highLighter(bgId);
    }
    if(info.isclicked === true){
        contactContainer.classList.add("bgStyle");
    }
    starIcon.classList.add("far",'fa-star');
    deleteContainer.appendChild(starIcon);

}

function createNewContact(){
    let nameData = nameBox.value;
    let emailData = emailBox.value;
    let phoneData = phoneBox.value;

    if (nameData==="" || emailData==="" || phoneData === ""){
        alert('Enter all Details');
        return;
    }

    unique = contactInfo.length + 10;
    let newInfo = {
        name: nameData,
        email: emailData,
        ph_no: phoneData,
        isclicked: false,
        id: unique
    }
    contactInfo.push(newInfo);
    createContact(newInfo);

    nameBox.value = '';
    emailBox.value ='';
    phoneBox.value = '';
}


addBtnEl.onclick = function(){
    createNewContact()
}

for (let cont of contactInfo){
    createContact(cont)
}