window.onload = function () {
    var userString = localStorage.getItem('user');
    var user = JSON.parse(userString);

    var firstName = user.fName;
    var welcomeMessage = document.getElementById('welcome_message');
    welcomeMessage.innerHTML = "Welcome, " + " " + firstName;
};