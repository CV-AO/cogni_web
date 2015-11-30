<?php include 'header.php';?>
<div id="internal_content">
<div id="account_container">
	<div id="account_container_box_one">
		<div id="account_container_box_one_left"></div>
		<div id="account_container_box_one_right"><h1>Personal Info<h1></div>
	</div>
	<div id="account_container_box_two">
		<div id="account_container_box_two_left">Name:</div>
		<div id="account_container_box_two_right"><input type="text" placeholder=""></div>
	</div>
	<div id="account_container_box_three">
		<div id="account_container_box_three_left">Email:</div>
		<div id="account_container_box_three_right"><input type="text" placeholder=""></div>
	</div>
	<div id="account_container_box_four">
		<div id="account_container_box_four_right">	
			  	<div class="accountCheckbox">
  		<input type="checkbox" value="1" id="accountCheckboxInput" name="" />
	  	<label for="accountCheckboxInput"></label>
  	</div>Subscribe to CogniToys email updates
		</div>
	</div>
	<div id="account_container_box_five">
		<div id="account_container_box_five_right"><input type="submit" value="Save" id="account_save_one"/></div>
	</div>
	<div id="account_container_box_six">
		<div id="account_container_box_six_left"></div>
		<div id="account_container_box_six_right"><h1>Change Password</h1></div>
	</div>
	<div id="account_container_box_seven">
		<div id="account_container_box_seven_left">Current Password:</div>
		<div id="account_container_box_seven_right"><input type="text" placeholder=""></div>
	</div>
	<div id="account_container_box_eight">
		<div id="account_container_box_eight_left">New Password:</div>
		<div id="account_container_box_eight_right"><input type="text" placeholder=""></div>
	</div>
	<div id="account_container_box_nine">
		<div id="account_container_box_nine_left">Confirm Password:</div>
		<div id="account_container_box_nine_right"><input type="text" placeholder=""></div>
	</div>
	<div id="account_container_box_ten">
		<div id="account_container_box_ten_right"><input type="submit" value="Save" id="account_save_two"/></div>
	</div>
	<div id="account_container_box_eleven">
	<!-- modal for delete account -->
					<div id="ex6" style="display:none;">
						<h2>Are You Sure?</h2>
						<div id="ex64_content">
							<div id="ex6_one">
								All history, profiles, and personal information associated with your account will be deleted.
							</div>
							<div id="ex6_two">
								Any CogniToys that your account is linked to will be reset.
							</div>
							<div id="ex6_three">
								<div id="ex6_three_left"><input id="modal_account_delete_button" type="submit" value="DELETE" /></div>
								<div id="ex6_three_right"><a href="" rel="modalsix:close" class=""><input id="modal_account_cancel_button" type="submit" value="CANCEL" onclick="window.location='#close-modalsix';" /></a></div>
							</div>
						</div>
					</div><!-- end modal for delete account -->
					
		<a href="#ex6" rel="modalsix:open" title="Delete Account">Delete Account</a>
	</div>
</div>
</div>
<?php include 'footer.php'; ?>