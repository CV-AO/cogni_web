function validEmail(email){
	re = /.+@.+\..+/i
	return re.test(email);
}

function submitContactSuccess(){
	$('.excontact_content').hide()
	$('.excontact_success').show()
	setTimeout(function() {	$.modal.close();$('.excontact_content').show();$('.excontact_success').hide();}, 1200);
}

function vetFormInput(type){
	var ret = 'please enter all fields'
	if (type == 'contact_form'){
		name = document.getElementById('name_input').value
		email = document.getElementById('email_input').value
		message = document.getElementById('contact_message').value
		if (name && validEmail(email) && message){ //all fields entered, email fits
			ret='go'
		}
	}else if (type == 'suggestcontent_form'){
		var selection = $('#suggestcontentdropdown option:selected').text();
		comment = document.getElementById('sccommentbox').value
		if (selection && comment){
			ret = 'go'
		}
	}else if (type == 'suggestjoke_form'){
		intro = document.getElementById('sjcommentbox').value
		question = document.getElementById('sjquestionbox').value
		punchline = document.getElementById('sjpunchlinebox').value
		if (intro && question && punchline){
			ret = 'go'
		}
	}else if (type == 'suggestknockknock_form'){
		intro = document.getElementById('kknamebox').value
		question = document.getElementById('kkwhobox').value
		punchline = document.getElementById('kkpunchlinebox').value
		if (intro && question && punchline){
			ret = 'go'
		}
	}
	return(ret)
}

function submitMailForm(type){
	event.preventDefault();

	vet = vetFormInput(type)
	//vet the input
	if (vet == 'go'){ //all fields entered, email fits
		var formdata = $('#'+type).serialize();
		$.ajax({
	    	type: 'POST',
	    	url: $('#'+type).attr('action'),
	    	data: formdata
		}).done(function(response) {
			console.log('success')
			console.log(response)
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
		console.log(vet)
	}

}

$( document ).ready(function() {
    $('.excontact_success').hide();
});