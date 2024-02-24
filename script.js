document.addEventListener('DOMContentLoaded', function () {
    const nationalityDropdown = document.getElementById('nationality');
    const countries = getAllCountries();
    
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      nationalityDropdown.appendChild(option);
    });
  });
  
  function getAllCountries() {
    return ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  }
  
  function submitForm() {
    const formData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      middleName: document.getElementById('middleName').value,
      dob: document.getElementById('dob').value,
      nationality: document.getElementById('nationality').value,
      idNumber: document.getElementById('idNumber').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      addressLine1: document.getElementById('addressLine1').value,
      addressLine2: document.getElementById('addressLine2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pinCode: document.getElementById('pinCode').value,
    }

    if (!firstName || !lastName || !middleName || !dob || !nationality || !idNumber || !mobileNumber || !addressLine1 || !address || !city || !state || !pinCode) {
      alert('Please fill in all required fields.');
      return; // Stop further execution
    }

    if (!validateForm()) {
      return;
    }

  
    // Validate Mobile Number
    if (!validateMobileNumber(formData.mobileNumber)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    function updateMobileValidation() {
      const nationalitySelect = document.getElementById('nationality');
      const mobileNumberInput = document.getElementById('mobileNumber');
      const mobileNumberHelp = document.getElementById('mobileNumberHelp');
    
      // Get the selected country code
      const selectedCountryCode = nationalitySelect.value;
    
      // Set the pattern and title for mobile number based on the selected country code
      switch (selectedCountryCode) {
        case 'IN':
          mobileNumberInput.pattern = "[0-9]{10}";
          mobileNumberHelp.textContent = "Enter a valid 10-digit mobile number for India.";
          break;
        
        default:
          // Default validation for other countries
          mobileNumberInput.pattern = "[0-9]+";
          mobileNumberHelp.textContent = "Enter a valid mobile number.";
          break;
      }
    }
  
    // Display result
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `<p>Account opening request submitted successfully for ${formData.firstName} ${formData.lastName}. Awaiting approval from the Branch Manager.</p>`;
  }
  
  function validateIdNumber(idNumber) {
    // Simple pattern to match either Aadhaar or Passport numbers
    const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    return pattern.test(idNumber);
  }
  
  function validateMobileNumber(mobileNumber) {
    // Simple pattern to match a 10-digit mobile number
    const pattern = /^[0-9]{10}$/;
    return pattern.test(mobileNumber);
  }
  
  // ... Existing JavaScript code ...
  let currentUser = null;

function login() {
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // Check if entered credentials match any user
  currentUser = userCredentials.find(user => user.username === usernameInput && user.password === passwordInput);

  if (currentUser) {
    // Successful login
    alert(`Login successful. Welcome, ${currentUser.username}!`);

    // Hide the login form
    document.getElementById('loginForm').style.display = 'none';

    // Show the appropriate UI based on the user role
    if (currentUser.role === 'csr') {
      document.getElementById('csrDashboard').style.display = 'block';
    } else if (currentUser.role === 'branchmanager') {
      document.getElementById('branchManagerUI').style.display = 'block';
      loadApplications(); // Load applications for the Branch Manager
    }
  } else {
    // Failed login
    alert('Invalid username or password. Please try again.');
  }
}


function openNewAccount() {
  
  document.getElementById('csrDashboard').style.display = 'none';
  document.getElementById('branchManagerUI').style.display = 'none';

  // Show the account opening form
  document.getElementById('accountFormContainer').style.display = 'block';
}


function submitForm() {
    const newApplication = {
      id: generateApplicationId(),
      firstName: document.getElementById('firstName').value,
      middleName: document.getElementById('middleName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      nationality: document.getElementById('nationality').value,
      idNumber: document.getElementById('idNumber').value,
      mobileNumber: document.getElementById('mobileNumber').value,
      addressLine1: document.getElementById('addressLine1').value,
      addressLine2: document.getElementById('addressLine2').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      pinCode: document.getElementById('pinCode').value,
      status: 'Pending Approval',
    
    };

  // Load existing applications from localStorage
  let applications = JSON.parse(localStorage.getItem('applications')) || [];
  applications.push(newApplication);

  // Save applications to localStorage
  localStorage.setItem('applications', JSON.stringify(applications));

  // Notify CSR form submission
  alert('Application submitted successfully. Case assigned to Branch Manager.');

  // Clear form fields
  clearForm();

  // Reload applications for the Branch Manager
  loadApplications();
}

function loadApplications() {
  const applicationsList = document.getElementById('applicationsList');
  applicationsList.innerHTML = ''; // Clear the list before loading

  // Load existing applications from localStorage
  let applications = JSON.parse(localStorage.getItem('applications')) || [];

  // Display applications in the list
  applications.forEach(application => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<button type="button" class="btn btn-link" onclick="viewDetails(${application.id})">${application.firstName} ${application.lastName} - ${application.status}</button>`;
    applicationsList.appendChild(listItem);
  });
}

function viewDetails(applicationId) {
    // Load existing applications from localStorage
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
  
    // Find the selected application
    const selectedApplication = applications.find(application => application.id === applicationId);
  
    // Display full form details
    const detailsMessage = `Details for Application #${applicationId}:\n
    First Name: ${selectedApplication.firstName}\n
    Last Name: ${selectedApplication.middleName}\n
    Middle Name: ${selectedApplication.lastName || 'N/A'}\n
    Date of Birth: ${selectedApplication.dob || 'N/A'}\n
    Nationality: ${selectedApplication.nationality || 'N/A'}\n
    ID Number: ${selectedApplication.idNumber || 'N/A'}\n
    Mobile Number: ${selectedApplication.mobileNumber || 'N/A'}\n
    Address Line 1: ${selectedApplication.addressLine1 || 'N/A'}\n
    Address Line 2: ${selectedApplication.addressLine2 || 'N/A'}\n
    City: ${selectedApplication.city || 'N/A'}\n
    State: ${selectedApplication.state || 'N/A'}\n
    Pin Code: ${selectedApplication.pinCode || 'N/A'}\n
    Status: ${selectedApplication.status}`;
    
    // Display details
    alert(detailsMessage);
    
    // Display approve/reject buttons
    const approveButton = document.createElement('button');
    approveButton.textContent = 'Approve';
    approveButton.className = 'btn btn-success';
    approveButton.onclick = () => approveApplication(selectedApplication.id);
    
    const rejectButton = document.createElement('button');
    rejectButton.textContent = 'Reject';
    rejectButton.className = 'btn btn-danger';
    rejectButton.onclick = () => rejectApplication(selectedApplication.id);
  
    // Clear previous buttons
    const actionsContainer = document.getElementById('actionsContainer');
    actionsContainer.innerHTML = '';
    
    // Append new buttons
    actionsContainer.appendChild(approveButton);
    actionsContainer.appendChild(rejectButton);
  }
  

function approveApplication(applicationId) {
    // Simulate approving the application (replace with actual logic)
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
  
    if (applications[applicationIndex].status === 'Pending Approval') {
      applications[applicationIndex].status = 'Approved';
      applications[applicationIndex].accountNumber = generateAccountNumber();
  
      // Save updated applications to localStorage
      localStorage.setItem('applications', JSON.stringify(applications));
  
      // Display approval details
      const approvedApplication = applications[applicationIndex];
      alert(`Application approved. Account number generated: ${approvedApplication.accountNumber}`);
    } else {
      alert('Application has already been processed.');
    }
  
    // Reload applications for the Branch Manager
    loadApplications();
  }
  
  function generateAccountNumber() {
    // Placeholder function to generate a simple account number
    return Math.floor(Math.random() * 1000000000) + 1000000000;
  
}


function rejectApplication(applicationId) {
    // Simulate rejecting the application (replace with actual logic)
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applications[applicationIndex].status === 'Pending Approval') {
      applications[applicationIndex].status = 'Rejected';
      alert('Application rejected.');
    } else {
      alert('Application has already been processed.');
    }
  
    // Remove the rejected application from the list
    applications = applications.filter(app => app.status !== 'Rejected');
    
    // Save updated applications to localStorage
    localStorage.setItem('applications', JSON.stringify(applications));
  
    // Reload applications for the Branch Manager
    loadApplications();
  }
  

function clearForm() {
  // Clear form fields (replace with actual form clearing logic)
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('middleName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('nationality').value = '';
  document.getElementById('idNumber').value = '';
  document.getElementById('mobileNumber').value = '';
  document.getElementById('addressLine1').value = '';
  document.getElementById('addressLine2').value = '';
  document.getElementById('city').value = '';
  document.getElementById('state').value = '';
  document.getElementById('pinCode').value = '';
  // ... (clear other fields)
}

function generateApplicationId() {
  // Placeholder function to generate a unique application ID
  return Math.floor(Math.random() * 1000) + 1;
}

// Example user credentials (replace with actual authentication logic)
const userCredentials = [
  { username: 'csruser', password: 'csrpwd', role: 'csr' },
  { username: 'branchmanager', password: 'branchpwd', role: 'branchmanager' },
];



// Function to clear applications in the Branch Manager UI
function clearApplications() {
  // Clear applications in local storage
  localStorage.removeItem('applications');

  // Clear the applications list on the UI
  document.getElementById('applicationsList').innerHTML = '';
}


function goBack() {
  // Hide all UI elements
  document.getElementById('csrDashboard').style.display = 'none';
  document.getElementById('branchManagerUI').style.display = 'none';
  document.getElementById('accountFormContainer').style.display = 'none';

  // Show the login form
  document.getElementById('loginForm').style.display = 'block';
}



  