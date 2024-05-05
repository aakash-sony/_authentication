function logoutPage() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("logoutBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get the buttons inside the modal
    var confirmBtn = document.getElementById("confirmLogout");
    var cancelBtn = document.getElementById("cancelLogout");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks on the yes button, log out
    confirmBtn.onclick = function () {
        // Perform logout action
        // For example, redirect to logout page or clear session
        modal.style.display = "none";
        alert("Logout successful!"); // Just for demonstration
        localStorage.setItem('isSessionValid', '0');
        window.location.href = "../index.html"
    }

    // When the user clicks on the no button, close the modal
    cancelBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Check if session is expired when the page loads
window.onload = function () {
    var x = isSessionExpired();
    if (x === '0') {
        redirectToLogin();
    }
};
// Function to check if session is expired
function isSessionExpired() {
    var x = localStorage.getItem('isSessionValid');
    return x;
}

// Function to redirect to the login page
function redirectToLogin() {
    // Redirect the user to the login page
    window.location.href = "../index.html";
}