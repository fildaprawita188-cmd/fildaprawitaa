let dataContacts = [
    {
        id: 1,
        fullName: "Filda Prawita",
        phone: 6289624102638,
        email: "fildaprawita188@gmail.com",
        location: "Sambas",
    },
    {
        id: 2,
        fullName: "Mochamad Irvan",
        phone: 62881080070700,
        email: "mchdirvan@example.com",
        location: "Jakarta",
    },
    {
        id: 3,
        fullName: "Adhitya Sofyan",
        phone: 62881080080800,
        email: "adhitya@exsample.com",
        location: "Bandung",
    },
];

// --- DOM ---
const contactlist = document.getElementById("contact-list");

const contactFormElement = document.getElementById("formContact");

contactFormElement.addEventListener("submit", addContact);

window.deteleContact = deteleContact;

const fullnameInputElement = document.getElementById("fullname");
const phoneInputElement = document.getElementById("phone");
const emailInputElement = document.getElementById("email");
const locationInputElement = document.getElementById("location");

// --- FUNCTION ---

function displayContacts() {
    loadContacts = loadFromLocalStrorage();
    loadContacts === null ? saveToLocalStrorage() : null;

    const contactListElement = loadContacts.map((contact) => {
        return `
        <li class="border w-lg my-2 rounded-md">
        <h1>${contact.fullName}</h1>
        <p>${contact.phone}</p>
        <p>${contact.email}</p>
        <p>${contact.location}</p>
        
        <button
            onclick="deleteContact(${contact.id})"
            class="border text-white bg-red-400 rounded-lg px-2 py-1"
        >
            Delete
        </button>
        <a
            href="/?id=${contact.id}"
            class="border text-white bg-black rounded-lg px-2 py-1"
    >
            Edit
        </a>
    </li>
    `;
    });
    
    contactlist.innerHTML = contactListElement.join("");
    }
    function createNewId() {
        // to create new id, we need to know last id in dataContacts.
        // so we access the array of object using Square Brackets to access array [] and dot notaion to access object (.)
        // access the last element with dataContacts[dataContacts.length -1] and get its id property.
        // after we know the last id, Add 1 to the last id to generate a new unique id.
        const newId = dataContacts[dataContacts.length - 1].id + 1;
        return newId;
    }

    function createNewId() {
        event.preventDefault();

        const contacts = loadFromLocalStrorage();

        const contactsFormData = new FormData(contactFormElement);

        const newContact = {

            id: createNew(),
            fullName: contactsFormData.get("fullName"),
            phone: contactsFormData.get("phone"),
            email: contactsFormData.get("email"),
            location: contactsFormData.get("location"),
        };
        
        const updateContacts = [...contacts, newContact];

        saveToLocalStrorage(updateContacts);
        displayContacts();
        }

        function searchContacts(keyword) {
            const filteredContacts = dataContacts.filter(
                (filteredContact) => filteredContact.fullName == keyword
            );
    
    for (const contact of filteredContacts) {
        console.log(`
            🆔 : ${contact.id}
            👩 : ${contact.fullName}
            📱 : ${contact.phone}
            📍 : ${contact.location}
            ✉️ : ${contact.email}
        `);
    }
}

    function deleteContact(id){
        const contacts = loadFromLocalStrorage();
        const updateContacts = contacts.filter((contacts) => contact.id !== id);

        saveToLocalStrorage(updateContacts);
        displayContacts();
    }

    function getId() {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const id = params.get("id");

        return id;
    }
    
    const conacts = loadFromLocalStrorage();
    const id = getId();

    contacts.find((contact) => {
        if (id == contact.id) {
            fullnameInputElement.value = contact.fullName;
            phoneInputElement.value = contact.phone;
            emailInputElement.value = contact.email;
            locationInputElement.value = contact.location;
        }
    });

    // TODO: MOVE THIS INTO PAGE EDIT
    function updateContacts(event) {
        event.preventDefault();

        const contactFormData = new FormData(contactFormElement);

        const newContact = {
            id: Number(id),
            fullname: contactFormData.get("fullname"),
            phone: contactFormData.get("phonr"),
            email: contactFormData.get("email"),
            location: contactFormData.get("location"),
        };

        const updateContacts = conacts.map((conacts) => {
            if (conacts.id == id) {
              return {
                ...contact,
                ...newContact,
              };
            } else {
              return contact;
            }
        });
        
        saveToLocalStrorage(updatedContacts);
        window.location.href = "/";
        displayContacts();
    }

    function saveToLocalStrorage(contacts) {
        localStorage.setItem("contacts", JHSON.stringify(contact));
    }

    function loadFromLocalStrorage() {
        const contactFromStrorage = localStorage.getItem("contacts");
        return JSON.parse(contactFromStrorage);
    }

    // RUN PROGRAM
    displayContacts();