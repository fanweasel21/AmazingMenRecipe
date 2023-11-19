document.addEventListener("DOMContentLoaded", function () {
    // Flags to track whether duplicate check has been performed
    var isNameChecked = false;
    var isEmailChecked = false;

    // Original values of name and email
    var originalNameValue = $("#name").val();
    var originalEmailValue = $("#email").val();

    // Function to check duplicate and update result
    function checkDuplicate(field, inputSelector, resultSelector, originalValue, flag) {
        var value = $(inputSelector).val();

        if (value.trim() === "") {
            alert("Please enter a(n) " + field + ".");
            return false;
        }

        // Clear the result only if the value has been modified by the user
        if (flag && value !== originalValue) {
            $(resultSelector).text("").css("color", "");
            flag = false; // Reset the flag
        }

        $.ajax({
            type: "POST",
            url: "/register/check-duplicate-" + field,
            data: { [field]: value },
            success: function (response) {
                if (response === "Valid " + field) {
                    $(resultSelector).text(response).css("color", "green");
                } else {
                    $(resultSelector).text(response).css("color", "red");
                }
            },
            error: function (xhr, status, error) {
                if (xhr.status === 409) {  // HTTP CONFLICT status
                    $(resultSelector).text(field + " already exists").css("color", "red");
                } else {
                    alert("INTERNAL ERROR (" + status + ")");
                }
            }
        });

        return flag;
    }

    // Check conditions for enabling the submit button
    function checkSubmitButton() {
        var isNameValid = $("#name-result").text() === "Valid name";
        var isEmailValid = $("#email-result").text() === "Valid email";
        var isPasswordNotEmpty = $("#password").val() !== "";
        var isConfirmPasswordValid = $("#password").val() === $("#confirm-password").val();

        var conditionsNotMet = [];
        if (!isNameValid) {
            conditionsNotMet.push("Please enter a valid name");
        }
        if (!isEmailValid) {
            conditionsNotMet.push("Please enter a valid email");
        }
        if (!isPasswordNotEmpty) {
            conditionsNotMet.push("Please enter a password");
        }
        if (!isConfirmPasswordValid) {
            conditionsNotMet.push("Password and confirm password must match");
        }

        if (conditionsNotMet.length > 0) {
            alert("Unable to submit. Conditions not met:\n\n" + conditionsNotMet.join("\n"));
            return false; // Prevent form submission
        } else {
            $("#register-form").attr("action", "/register/submit").submit();
            alert("Registration Success!!");
            return true; // Allow form submission
        }
    }

    // Check duplicate when the buttons are clicked
    $("#check-duplicate-name-button").click(function () {
        isNameChecked = checkDuplicate("name", "#name", "#name-result", originalNameValue, isNameChecked);
    });

    $("#check-duplicate-email-button").click(function () {
        isEmailChecked = checkDuplicate("email", "#email", "#email-result", originalEmailValue, isEmailChecked);
    });

    // Handle form submission when the submit button is clicked
    $("#submit-button").click(function (event) {
        if (!checkSubmitButton()) {
            event.preventDefault(); // Prevent form submission if conditions are not met
        }
    });

    // Reset the flags and original values when the text boxes are modified
    $("#name").on("input", function () {
        isNameChecked = false;
        originalNameValue = $(this).val();
        $("#name-result").text("").css("color", "");
    });

    $("#email").on("input", function () {
        isEmailChecked = false;
        originalEmailValue = $(this).val();
        $("#email-result").text("").css("color", "");
    });
});