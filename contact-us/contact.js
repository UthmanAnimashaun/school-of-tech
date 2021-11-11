$('document').ready(function() {
/* handle form validation */
$("#contact-form").validate({
rules:
{
name: {
required: true,
},
email: {
required: true,
email: true
},
subject: {
required: true,
},
msg: {
required: true,
},
},
messages:
{

name:{
required: "please provide your full name",
},
email: {
required: "please enter a valid email address",
},
subject:{
required: "please enter a subject",
},
msg:{
required: "please enter your message",
},
},
submitHandler: submitForm
});
/* handle form submit */
function submitForm() {
var data = $("#contact-form").serialize();
$.ajax({
type : 'POST',
url : 'ajaxcontact.php',
data : data,
beforeSend: function() {
$("#error").fadeOut();
$("#send_btn").html('<img src="../assets/img/ajax-loader3.gif" height="11" width="16" />');
},
success:function(response) {
if(response.indexOf('invalid email') > 0){
$("#error").fadeIn(1000, function(){
$("#error").html('<div class="alert alert-danger">  Email address is invalid !</div>');
$("#send_btn").html('Send Message <i class="fa fa-paper-plane"></i>');
});
}

else if(response.indexOf('message sent') > 0){
$("#send_btn").html('<img src="../assets/img/ajax-load.gif" height="16" width="16" />');
setTimeout('$("#contact-form").fadeOut(500, function(){ $(".contact_container").load("welcome.php"); }); ',3000);
} else {
$("#error").fadeIn(1000, function(){
$("#error").html('<div class="alert alert-danger"> Error occurred, please try again later  !</div>');
$("#send_btn").html('Send Message <i class="fa fa-paper-plane"></i>');
});
}
}
});
return false;
}
});