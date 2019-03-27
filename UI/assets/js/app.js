function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
const login = () => {
    location.href = "dashboard.html";
};

const signUp = () => {
    location.href = "dashboard.html";
};

function getStatus(element) {
    switch (element) {
        case "one":
            let status = document.getElementById("statusOne");
            let statusValue = status.options[status.selectedIndex].value;
            switch (statusValue) {
                case "Inactive":
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                    break;
                case "progress":
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                    break;
                case "Active":
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                    break;
                default:
                    document.getElementById(
                        "one"
                    ).innerHTML = `<span style="color:grey">Deleted</span>`;
                    break;
            }
        case "two":
            {
                let status = document.getElementById("statusTwo");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "two"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "three":
            {
                let status = document.getElementById("statusThree");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "three"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "four":
            {
                let status = document.getElementById("statusFour");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "four"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "five":
            {
                let status = document.getElementById("statusFive");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "five"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "six":
            {
                let status = document.getElementById("statusSix");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "six"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "seven":
            {
                let status = document.getElementById("statusSeven");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "seven"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
        case "eight":
            {
                let status = document.getElementById("statusEight");
                let statusValue = status.options[status.selectedIndex].value;
                switch (statusValue) {
                    case "Inactive":
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:red;font-weight:bold">Inactive</span>`;
                        break;
                    case "progress":
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:orange;font-weight:bold;">Processing</span>`;
                        break;
                    case "Active":
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:green;font-weight:bold">Active</span>`;
                        break;
                    default:
                        document.getElementById(
                            "eight"
                        ).innerHTML = `<span style="color:grey">Deleted</span>`;
                        break;
                }
            }
    }
}