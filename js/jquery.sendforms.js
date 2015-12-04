function validEmail(email){
	re = /.+@.+\..+/i
	return re.test(email);
}

function submitContactSuccess(){
	$('#excontact_content').hide()
	$('#excontact_success').show()
	setTimeout(function() {	$.modal.close();$('#excontact_content').show();$('#excontact_success').hide();}, 1200);
}

function submitContact(){
	event.preventDefault();
	name = document.getElementById('name_input').value
	email = document.getElementById('email_input').value
	message = document.getElementById('contact_message').value
	//vet the input
	if (name && validEmail(email) && message){ //all fields entered, email fits
		var formdata = $('#contact_form').serialize();
		$.ajax({
	    	type: 'POST',
	    	url: $('#contact_form').attr('action'),
	    	data: formdata
		}).done(function(response) {
			console.log('success')
			submitContactSuccess()
		}).fail(function(data) {
		console.log('failing')
	    if (data.responseText !== '') {
	        console.log(data.responseText); 	
	    } else {
	        console.log('Oops! An error occured and your message could not be sent.');
	    }
		});
	} else { //invaid input, not sent to server for efficiency
		console.log('please enter all fields')
	}

}

$( document ).ready(function() {
    $('#excontact_success').hide();
});