function resetPassword() {
    var newPassword = document.getElementById("newPass");
    var confirmPassword = document.getElementById("cnfPass");


    if (!isValidPassword(newPassword.value) || !isValidPassword(confirmPassword.value)) {
        alert("Invalid Password! Password must have atleast one capital letter, one special character and a digit. It should be more than 6 character");
        return false;
    }
    if (!passwordMatched(confirmPassword.value, newPassword.value)) {
        alert("Password mismatched!!");
        return false;
    }
    alert("Password reset successfully!");

    var user = JSON.parse(localStorage.getItem('user'));

    // Update the password property
    user.password = newPassword.value;

    // Save the updated user back to localStorage
    localStorage.setItem('user', JSON.stringify(user));

    return true;
}


function isValidPassword(passWord) {
    const pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*_])/;
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
