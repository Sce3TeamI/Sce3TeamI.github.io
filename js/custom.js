var sessionUsername;

function httpGetAsync(url, type, message, callback) {
    console.log("ok");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                document.body.className = 'ok';
                callback(request.responseText);
            } else {
                document.body.className = 'error';
            }
        }
    };
    request.open(type, url, true);
    request.send(message);
}

function userCallback(data) {
  console.log(data);
}

function tableCallback(data) {
    data = JSON.parse(data);
    console.log(Object.keys(data).length);
    var out = "<table>";
    out += " <tr> <th>id</th> <th>title</th> <th>body</th> </tr>"
    // For each objects in the JSON response, create a table entry with some properties (eg: id, title, body ect..)
    for (var i = 0; i < Object.keys(data).length; i++) {
        // TODO: When we'll use the actual API of our server, change these properties to the actual properties of the DB.
        out += "<tr><td>" +
            data[i].id +
            "</td><td>" +
            data[i].title +
            "</td><td>" +
            data[i].body +
            "</td></tr>";
        console.log(data[i]);
    }
    out += "</table>";
    document.getElementById("table").innerHTML = out;
}



function getAccountDetails() {
    var emailAddress = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var accountDetails = {
        "email": emailAddress,
        "password": password
    };
    httpGetAsync("api/loginuser?username="+email+"&password="+password, "GET", null, userCallback);
}

function getRefDetails() {
    var refTitle = document.getElementById('title').value;
    var refLink = document.getElementById('link').value;
    var refComment = document.getElementById('comment').value;

    var refDetails = {
        "refTitle": refTitle,
        "refLink": refLink,
        "refComment": refComment
    };
    document.getElementById('title').value = '';
    document.getElementById('link').value = '';
    document.getElementById('comment').value = '';

    console.log(refDetails);

}

function submitNewUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var newDetails = {
        "username": username,
        "password": password
    };

    httpGetAsync("api/createuser?username="+username+"&password="+password, "PUT", newDetails);
}

function submitRef() {
    var reference = getRefDetails();
    httpGetAsync("api/addreference?title="+reference.refTitle+"&link="+reference.refLink+"&notes="+reference.refComment, "PUT", reference);
}

function removeRef() {
    var reference = getRefDetails();
    httpGetAsync("api/removeRef?", "DELETE", reference);

}


function showAllRef() {
    var references = httpGetAsync("api/getUserReferences?username="+username, "GET", null, tableCallback);
    // The <table> listing is done in the tableCallback function
}
window.onload = showAllRef; // This ensures that showAllRef() shows the table info as soon as the main page loads


$(function() {
    $('#datetimepicker4').datetimepicker();
});
