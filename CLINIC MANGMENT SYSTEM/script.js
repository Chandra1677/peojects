document.addEventListener('DOMContentLoaded', () => {
    // --- Data (Simulated - not persistent) ---
    let patients = [
        { id: 1, name: 'Chandra', age: 30, gender: 'Male', contact: '9876543210' },
        { id: 2, name: 'Shekhar', age: 45, gender: 'Male', contact: '8765432109' },
        { id: 3, name: 'Prasad', age: 22, gender: 'Male', contact: '7654321098' },
        { id: 4, name: 'Sujata', age: 38, gender: 'Female', contact: '6543210987' }
    ];
    let nextPatientId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;

    // --- DOM Elements ---
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const patientTableBody = document.querySelector('#patientTable tbody');
    const patientSearchInput = document.getElementById('patientSearch');
    const addPatientForm = document.getElementById('addPatientForm');
    const formMessage = document.getElementById('formMessage');

    // --- Tab Switching Logic ---
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and content
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetTabId = button.dataset.tab;
            document.getElementById(targetTabId).classList.add('active');

            // If switching to patients tab, re-render list
            if (targetTabId === 'patients') {
                renderPatientTable(patients);
            }
            // Clear form message when changing tabs
            formMessage.textContent = '';
            formMessage.className = 'message';
        });
    });

    // --- Patient Table Rendering ---
    function renderPatientTable(filteredPatients) {
        patientTableBody.innerHTML = ''; // Clear existing rows
        if (filteredPatients.length === 0) {
            patientTableBody.innerHTML = '<tr><td colspan="5">No patients found.</td></tr>';
            return;
        }
        filteredPatients.forEach(patient => {
            const row = patientTableBody.insertRow();
            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.gender}</td>
                <td>${patient.contact}</td>
            `;
        });
    }

    // Initial render of patient table
    renderPatientTable(patients);

    // --- Patient Search Logic ---
    patientSearchInput.addEventListener('input', () => {
        const searchTerm = patientSearchInput.value.toLowerCase();
        const filteredPatients = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.contact.includes(searchTerm) ||
            String(patient.id).includes(searchTerm)
        );
        renderPatientTable(filteredPatients);
    });

    // --- Add Patient Form Logic ---
    addPatientForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById('patientName').value.trim();
        const age = parseInt(document.getElementById('patientAge').value);
        const gender = document.getElementById('patientGender').value;
        const contact = document.getElementById('patientContact').value.trim();

        if (!name || isNaN(age) || age < 0 || !gender || !contact) {
            displayFormMessage('Please fill in all fields correctly.', 'error');
            return;
        }

        const newPatient = {
            id: nextPatientId++,
            name: name,
            age: age,
            gender: gender,
            contact: contact
        };

        patients.push(newPatient); // Add to our simulated data store

        displayFormMessage('Patient added successfully! (Note: Data is not saved permanently)', 'success');
        addPatientForm.reset(); // Clear the form
        
        // Optional: switch back to patient list tab after adding
        // If you want this, uncomment the next two lines:
        // document.querySelector('.nav-button[data-tab="patients"]').click();
        // renderPatientTable(patients); // Re-render with the new patient
    });

    function displayFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `message ${type}`; // Add success or error class
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'message'; // Reset class after a few seconds
        }, 5000); // Message disappears after 5 seconds
    }
});