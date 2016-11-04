var sessionUsername;

function httpGetAsync(url, type, message, callback) {
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
        out += "<tr id='refID'><td>" +
            data[i].id +
            "</td><td>" +
            data[i].title +
            "</td><td>" +
            data[i].body +
            "</td><td> <button id='editButton' data-toggle='modal' data-target='#modalEdit'> Edit </button> </td><td>" +
            "</td><td> <button> Remove </button> </td><td>"
            "</td></tr>";
        console.log(data[i]);
    }
    out += "</table>";
    document.getElementById("table").innerHTML = out;
}



function getAccountDetails() {
    console.log("this works");
    var emailAddress = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var accountDetails = {
        "email": emailAddress,
        "password": password
    };
    httpGetAsync("api/loginuser?username="+encodeURIComponent(email)+"&password="+encodeURIComponent(password), "GET", null, userCallback);
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

    httpGetAsync("api/createUser?username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password), "PUT", newDetails);
}

function addRef() {
    var reference = getRefDetails();
    httpGetAsync("https://jsonplaceholder.typicode.com/posts", "PUT", reference);
}



function editRef() {
  // Copy/Pasted the content of getRefDetails() bcs we don't have time anymore.
  // Ugly but it works
    var refTitle = document.getElementById('title').value;
    var refLink = document.getElementById('link').value;
    var refComment = document.getElementById('comment').value;
    var refID = document.getElementById('referenceID').value;
    var reference = {
        "refTitle": refTitle,
        "refLink": refLink,
        "refComment": refComment,
        "refID": refID
    };

    httpGetAsync("https://jsonplaceholder.typicode.com/posts", "PUT", reference);
}

function removeRef() {
    var reference = getRefDetails();
    httpGetAsync("api/removeRef?", "DELETE", reference);

}


function showAllRef() {
    var references = httpGetAsync("api/getUserReferences?username="+encodeURIComponent(username), "GET", null, tableCallback);
    // The <table> listing is done in the tableCallback function
}
window.onload = showAllRef; // This ensures that showAllRef() shows the table info as soon as the main page loads


$(function() {
    $('#datetimepicker4').datetimepicker();
});
