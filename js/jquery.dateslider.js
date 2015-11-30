function dateslide(direction){
	var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
	current_date = $('#content_right_left_date').html();
	var cd = new Date(Date.parse(current_date+', 2015'));
	if (direction == 'left'){
		cd.setDate(cd.getDate() - 1);
		nd = monthNames[cd.getMonth()]+" "+ cd.getDate()
		$('#content_right_left_date').html(nd)
	}
	else {
		cd.setDate(cd.getDate() + 1);
		nd = monthNames[cd.getMonth()]+" "+ cd.getDate()
		$('#content_right_left_date').html(nd)
	}
}