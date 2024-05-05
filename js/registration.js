class User {
    constructor(fName, lName, mobileNum, mailId, password, username, dateOfReg) {
        this.fName = fName;
        this.lName = lName;
        this.mobileNum = mobileNum;
        this.mailId = mailId;
        this.password = password;
        this.username = username;
        this.dateOfReg = dateOfReg;
    }
};

function validateForm() {
    let fstName = document.getElementById("fname");
    let lstName = document.getElementById("lname");
    let mobileNum = document.getElementById("mbNum");
    let mail_iD = document.getElementById("mail_iD");
    let passWd = document.getElementById("passWd");
    let cpassWd = document.getElementById("cnpWord");

    if (!isValidFirstName(fstName.value)) {
        alert("Invalid first name!! First name must be between (3-18) character.");
        return false;
    }

    if (!isValidLastName(lstName.value)) {
        alert("Invalid last name!! Last name must be between (3-15) character.");
        return false;
    }

    if (!isValidMobile(mobileNum.value)) {
        alert("Invalid mobile number! Mobile number must be 10 digits only and start with(6-9).");
        return false;
    }

    if (!isValidEmail(mail_iD.value)) {
        alert("Invalid mail Id!");
        return false;
    }
    if (!isValidPassword(passWd.value)) {
        alert("Invalid password!!");
        return false;
    }

    if (!isValidPassword(cpassWd.value)) {
        alert("Invalid confirm password!!");
        return false;
    }

    if (!passwordMatched(passWd.value, cpassWd.value)) {
        alert("Password mismatched!! Please re-enter confirm password.");
        return false;
    }
    var username = generateUsername(fstName.value, mobileNum.value);
    var dateOfReg = currentDateOfReg();
    var user = new User(fstName.value, lstName.value, mobileNum.value, mail_iD.value,
        passWd.value, username, dateOfReg);
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(user));
    alert("Registration successfull!!" + " " + "Your Username is" + " " + username);
    return true;
}

function isValidFirstName(fstName) {
    if (fstName.length <= 18 && fstName.length > 2) {
        return true;
    } else {
        return false;
    }
}

function isValidLastName(lstName) {
    if (lstName.length <= 15 && lstName.length > 2) {
        return true;
    } else {
        return false;
    }
}

function isValidMobile(mobileNum) {
    let pattern = /^[6-9]\d{9}$/;

    if (pattern.test(mobileNum)) {
        return true;
    } else {
        return false;
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

function isValidPassword(passWord) {
    let pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])/;

    if (pattern.test(passWord)) {
        return true;
    }
    else {
        return false;
    }
}

function passwordMatched(cnfPass, passWrd) {
    if (cnfPass === passWrd) {
        return true;
    }
    else {
        return false;
    }
}

function generateUsername(firstName, mobileNumber) {
    let name = firstName.slice(0, 3);
    let mobile = mobileNumber.slice(0, 3);
    let random = Math.floor((Math.random() * 1000) + 1);
    return (name + random + mobile);
}

function currentDateOfReg() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();

    // Add leading zeros if needed
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return day + '-' + month + '-' + year;
}



