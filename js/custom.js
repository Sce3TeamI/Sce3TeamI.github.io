var sessionUsername;

/*function httpGetAsync(url, type, message, callback) {
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
}*/

/*Chris did this within the html
function getAccountDetails() {
    console.log("this works");
    var emailAddress = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var accountDetails = {
        "email": emailAddress,
        "password": password
    };
    httpGetAsync("api/loginuser?username="+encodeURIComponent(email)+"&password="+encodeURIComponent(password), "GET", null, userCallback);
}*/

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

    return refDetails;

}

/*Chris also did this within the html
function submitNewUser() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var newDetails = {
        "username": username,
        "password": password
    };

    httpGetAsync("api/createUser?username="+encodeURIComponent(username)+"&password="+encodeURIComponent(password), "GET", newDetails);
}*/

function addRef() {
    var reference = getRefDetails();
    $.get("api/addReference?title=" + encodeURIComponent(reference.refTitle) + "&link=" + encodeURIComponent(reference.refLink) + "&notes=" +
        encodeURIComponent(reference.refComment) + "&user=" + encodeURIComponent(sessionUsername), function(data) {
        })
}



function editRef() {
  // Copy/Pasted the content of getRefDetails() bcs we don't have time anymore.
  // Ugly but it works
    // var refTitle = document.getElementById('title').value;
    // var refLink = document.getElementById('link').value;
    // var refComment = document.getElementById('comment').value;
    // var refID = document.getElementById('referenceID').value;
    // var reference = {
    //     "refTitle": refTitle,
    //     "refLink": refLink,
    //     "refComment": refComment,
    //     "refID": refID
    // };

    var title = document.getElementById('title').value;
    var link = document.getElementById('link').value;
    var notes = document.getElementById('comment').value;
    var id = document.getElementById('referenceID').value;
    $.get("api/editReference?citationID=" + encodeURIComponent(id) + "&title=" +
        encodeURIComponent(title) + "&link=" + encodeURIComponent(link) + "&notes=" +
        encodeURIComponent(notes) + "&user=" + encodeURIComponent(sessionUsername), function(data) {

            })
}

function removeRef() {
    var reference = getRefDetails();
    $.get("api/removeReference?citationID" + + encodeURIComponent(id), function(data) {

    });
}


function showAllRef() {
    $.get("api/getUserReferences?username="+encodeURIComponent(sessionUsername), function(data) {
      console.log(data);
      data = JSON.parse(data);
      console.log(data);
      //console.log(Object.keys(data).length);
      var out = "<table>";
      out += " <tr> <th>id</th> <th>title</th> <th>link</th> <th>notes</th> </tr>"
      // For each objects in the JSON response, create a table entry with some properties (eg: id, title, body ect..)
      for (var i = 0; i < Object.keys(data).length; i++) {
          // TODO: When we'll use the actual API of our server, change these properties to the actual properties of the DB.
          out += "<tr id='refID'><td>" +
              data[i].citationID +
              "</td><td>" +
              data[i].title +
              "</td><td>" +
              data[i].link +
              "</td><td>" +
              data[i].notes +
              "</td><td> <button id='editButton' data-toggle='modal' data-target='#modalEdit'> Edit </button> </td><td>" +
              "</td><td> <button> Remove </button> </td><td>"
              "</td></tr>";
          console.log(data[i]);
      }
      out += "</table>";
      document.getElementById("table").innerHTML = out;
    });
    // The <table> listing is done in the tableCallback function
}
// window.onload = showAllRef; // This ensures that showAllRef() shows the table info as soon as the main page loads


$(function()
{
    $.get("api/getLoggedInUser", function(data)
    {
        sessionUsername = data;
        showAllRef();
    });
});