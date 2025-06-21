// Name Validation
function fullnamevalidation(str) {
    let flag = true;
    let message = "";

    if (str.trim() === "") {
        message = "Name is required";
        flag = false;
    } else if (str[0] === ' ' || str[str.length - 1] === ' ') {
        flag = false;
        message = "Name must not start or end with a space.";
    } else {
        for (let i = 0; i < str.length; i++) {
            let ch = str.charCodeAt(i);
            let char = str.charAt(i);
            if (!((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || char === ' ')) {
                flag = false;
                message = "Name must contain only letters and spaces.";
                break;
            }
        }
    }

    let nameEle = document.getElementById("a");
    nameEle.innerHTML = message || " ";
    nameEle.style.color = flag ? "green" : "red";
    return flag;
}

// Email Validation
function emailvalidation(str) {
    let ele1 = document.getElementById("b");
    let atidx = str.indexOf("@");
    let lastatidx = str.lastIndexOf("@");
    let flag = true;

    if (atidx <= 0 || atidx !== lastatidx || atidx === str.length - 1) {
        ele1.innerHTML = "Invalid Email ID";
        ele1.style.color = "red";
        return false;
    }

    let domain = str.substring(atidx + 1);
    let validExtensions = [".com", ".net", ".org", ".in", ".uk"];
    let isValidDomain = validExtensions.some(ext => domain.endsWith(ext));
    let dotIndex = domain.indexOf(".");
    let lastDotIndex = domain.lastIndexOf(".");

    if (dotIndex === -1 || dotIndex !== lastDotIndex || !isValidDomain) {
        ele1.innerHTML = "Invalid Email ID";
        ele1.style.color = "red";
        flag = false;
    } else {
        ele1.innerHTML = " ";
        ele1.style.color = "green";
    }

    return flag;
}

// Phone Number Validation
function phonevalidation(str) {
    let flag = true;
    let message = "";

    if (!/^[6-9]\d{9}$/.test(str)) {
        flag = false;
        message = "Phone must start with 6-9 and be 10 digits.";
    }

    let phoneEle = document.getElementById("c");
    phoneEle.innerHTML = message || " ";
    phoneEle.style.color = flag ? "green" : "red";
    return flag;
}

// Salary Validation
function salaryvalidation(str) {
    let salSpan = document.getElementById("f");
    let salary = parseFloat(str);
    let flag = true;

    if (isNaN(salary) || salary <= 0) {
        salSpan.innerHTML = "Enter a valid positive salary";
        salSpan.style.color = "red";
        flag = false;
    } else {
        salSpan.innerHTML = " ";
        salSpan.style.color = "green";
    }

    return flag;
}

// Photo Validation
function photovalidation() {
    let fileInput = document.querySelector('input[name="photo"]');
    let span = document.getElementById("g");

    if (!fileInput.files || fileInput.files.length === 0) {
        span.innerHTML = "Please select a photo";
        span.style.color = "red";
        return false;
    }

    let file = fileInput.files[0];
    let fileSizeMB = file.size / (1024 * 1024); // Convert to MB

    if (fileSizeMB < 1 || fileSizeMB > 10) {
        span.innerHTML = "Photo size must be between 1MB and 10MB";
        span.style.color = "red";
        return false;
    } else {
        span.innerHTML = " ";
        span.style.color = "green";
        return true;
    }
}

window.onload = function () {
    document.forms['frm'].onsubmit = function (e) {
        const nameVal = this.elements["name"].value;
        const emailVal = this.elements["email"].value;
        const contactVal = this.elements["contact"].value;
        const salaryVal = this.elements["sal"].value;

        const nameValid = fullnamevalidation(nameVal);
        const emailValid = emailvalidation(emailVal);
        const phoneValid = phonevalidation(contactVal);
        const salaryValid = salaryvalidation(salaryVal);
        const photoValid = photovalidation();

        if (!nameValid || !emailValid || !phoneValid || !salaryValid || !photoValid) {
            e.preventDefault();
            alert("Please fix validation errors before submitting.");
        }
    };
};
