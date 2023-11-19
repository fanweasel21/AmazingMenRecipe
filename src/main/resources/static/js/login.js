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
                    alert("Incorrect email and/or password");
                    return false;
                }
            },
            error: function(xhr, status, error) {

                if (xhr.status === 401) {
                    alert("Email and/or Password is incorrect");
                } else{
                    alert("Internal Error (" + status + ")");
                }
                return false;
            }
        });
    }
    $(".login-button").click(function (event) {
        if (!loginButton()) {
            event.preventDefault();
        }
    });
});