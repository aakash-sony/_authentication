function userLogin() {
    var username = document.getElementById('uname');
    var password = document.getElementById('pword');

    var userString = localStorage.getItem('user');
    var user = JSON.parse(userString);

    if (localStorage.length === 0) {
        alert("No data available for this credential. Please sign up first.");
        username.value = '';
        password.value = '';
        return false;
    }
    else {
        if (username.value === user.username && password.value === user.password) {
            alert("Login successfull!!");
            localStorage.setItem('isSessionValid', '1');
            return true;
        }
        else {
            alert("Invalid username/password");
            username.value = '';
            password.value = '';
            return false;
        }
    }
}


