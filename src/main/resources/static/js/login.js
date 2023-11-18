document.addEventListener("DOMContentLoaded", function () {
    function loginButton() {
        var email = $("#email").val();
        var password = $("#password").val();

        if (email.trim() === "" || password.trim() === "") {
            alert("Empty email and/or password");
            return false;
        }

        var member = {
            "email": email,
            "password": password
        };

        $.ajax({
            type: "POST",
            url: "/",
            contentType: "application/json",
            data: JSON.stringify(member),
            success: function(response) {
                if (response === "Login successful") {
                    window.location.href = "/post";
                    return true;
                } else {
                    alert("Login failed");
                    return false;
                }
            },
            error: function() {
                alert("error occurred");
                return false;
            }
        });
    }
    $(".login-button").click(function (event) {
        console.log("login button clicked");
        if (!loginButton()) {
            event.preventDefault();
        }
    });
});