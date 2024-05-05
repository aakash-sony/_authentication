function changePassword() {
    var currentPass = document.getElementById("currentPass");
    var newPass = document.getElementById("newPass");
    var cnfPass = document.getElementById("cnfPass");

    var userString = localStorage.getItem('user');
    var user = JSON.parse(userString);

    if (currentPass.value === user.password) {
        if (!isValidPassword(newPass.value) || !isValidPassword(cnfPass.value)) {
            alert("Invalid Password! Password must have atleast one capital letter, one special character and a digit. It should be more than 6 character");
            return false;
        }
        if (!passwordMatched(cnfPass.value, newPass.value)) {
            alert("Password mismatched!!");
            return false;
        }
        user.password = newPass.value;
        localStorage.setItem('user', JSON.stringify(user));
        alert("Password update successfully.");
        return true;
    }
    else {
        alert("Please enter correct  Password.");
        return false;
    }
}
function isValidPassword(PassWd) {
    let pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])/;

    if (pattern.test(PassWd)) {
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

