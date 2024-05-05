function editProfile() {
    let newFirstName = document.getElementById("frstName");
    let newLastName = document.getElementById("lstName");
    let newMobileNum = document.getElementById("mbNum");
    let newMailId = document.getElementById("mailId");

    if (!isValidFirstName(newFirstName.value)) {
        alert("Invalid first name!! First name must be between (3-18) character.");
        return false;
    }
    if (!isValidLastName(newLastName.value)) {
        alert("Invalid last name!! Last name must be between (3-15) character.");
        return false;
    }
    if (!isValidMobile(newMobileNum.value)) {
        alert("Invalid mobile number! Mobile number must be 10 digits only and start with(6-9).");
        return false;
    }
    if (!isValidEmail(newMailId.value)) {
        alert("Invalid mailId!!");
        return false;
    }
    alert("Profile updated successfully!!");

    var user = JSON.parse(localStorage.getItem('user'));

    user.mailId = newMailId.value;
    user.fName = newFirstName.value;
    user.lName = newLastName.value;
    user.mobileNum = newMobileNum.value;

    localStorage.setItem('user', JSON.stringify(user));
    return true;
}


function isValidFirstName(firstName) {
    if (firstName.length > 2 && firstName.length <= 18) {
        return true;
    }
    else {
        false;
    }
}

function isValidLastName(lastName) {
    if (lastName.length > 2 && lastName.length <= 15) {
        return true;
    }
    else {
        false;
    }
}

function isValidMobile(mobile) {
    let pattern = /^[6-9]\d{9}$/;
    if (pattern.test(mobile)) {
        return true;
    }
    else {
        false;
    }
}

function isValidEmail(mail_iD) {
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(mail_iD)) {
        return true;
    } else {
        return false;
    }
}