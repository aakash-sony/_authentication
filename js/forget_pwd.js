function forgetPassword() {
    var email = document.getElementById('email');
    var mobile = document.getElementById('mobile');

    var userString = localStorage.getItem('user');
    var user = JSON.parse(userString);

    if (localStorage.length === 0) {
        alert("Mobile number and mailId don't exist. ");
        email.value = '';
        mobile.value = '';
        return false;
    } else {
        if (email.value === user.mailId && mobile.value === user.mobileNum) {
            return true;
        } else {
            alert("Invalid details!!");
            return false;
        }
    }
}
