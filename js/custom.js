function getAccountDetails() {
  var emailAddress = document.getElementById('inputEmail').value;
  var password = document.getElementById('inputPassword').value;

  var accountDetails =
  {
    "email":emailAddress,
    "password": password
  };

}

function getRefDetails() {
  var refTitle = document.getElementById('title').value;
  var refLink = document.getElementById('link').value;
  var refComment = document.getElementById('comment').value;

  var refDetails =
  {
    "refTitle": refTitle,
    "refLink": refLink,
    "refComment": refComment
  };
  document.getElementById('title').value='';
  document.getElementById('link').value='';
  document.getElementById('comment').value='';

  console.log(refDetails);

}

function submitRef() {
  var reference = getRefDetails();
  // todo: PUT a new reference via Jay's RESTful API
}

function removeRef() {
  var reference = getRefDetails();
  // todo: DELETE a reference (using its unique id) via the RESTful API 
}

function submitNewUser() {
  var username = document.getElementById('username').value;
  // var lastName = document.getElementById('last_name').value;
  // var emailAddress = document.getElementById('email').value;
  var password = document.getElementById('password').value;


  var newDetails =
  {
    "username": username,
    "password": password
  };
  
  // todo: PUT a new user via the API
}
  
function showAllRef() {
  // todo: GET all the references via the API
  // todo: for each reference in references -> <li> the reference </li> or smthing
}


$(function () {
                $('#datetimepicker4').datetimepicker();
            });
