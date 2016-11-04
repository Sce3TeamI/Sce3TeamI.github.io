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

function tableCallback(data) {
    data = JSON.parse(data);
    console.log(Object.keys(data).length);
    var out = "<table>";
    out += " <tr> <th>id</th> <th>title</th> <th>body</th> </tr>"
    for (var i = 0; i < Object.keys(data).length; i++) {
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

function submitRef() {
    var reference = getRefDetails();
    // todo: PUT a new reference via Jay's RESTful API
    httpGetAsync("https://jsonplaceholder.typicode.com/posts", "PUT", reference);
}

function removeRef() {
    var reference = getRefDetails();
    // todo: DELETE a reference (using its unique id) via the RESTful API
    httpGetAsync("https://jsonplaceholder.typicode.com/posts", "DELETE", reference);

}

function submitNewUser() {
    var username = document.getElementById('username').value;
    // var lastName = document.getElementById('last_name').value;
    // var emailAddress = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    var newDetails = {
        "username": username,
        "password": password
    };

    // todo: PUT a new user via the API
    httpGetAsync("https://jsonplaceholder.typicode.com/posts", "PUT", newDetails);

}


function showAllRef() {
    // GET all the references via the API
    var references = httpGetAsync("https://jsonplaceholder.typicode.com/posts", "GET", null, tableCallback);

    
    // todo: for each reference in references -> <li> the reference </li> or smthing
}
window.onload = showAllRef; // This ensures that showAllRef() shows a table as soon as the main page loads


$(function() {
    $('#datetimepicker4').datetimepicker();
});
