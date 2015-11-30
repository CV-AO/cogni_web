<head>
<!-- global site css -->
<link rel="stylesheet" type="text/css" href="style.css">
<!-- font replacement -->
<link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
<!-- cdn url for ajax -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<!-- jquery/css for the modals -->
<script src="js/jquery.modal.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" href="js/jquery.modal.css" type="text/css" media="screen" />
<link rel="stylesheet" href="css/modal_dropdown.css" type="text/css" media="screen" />
<!-- special js/css for delete account modal--> 
<script src="js/jquery.modalsix.js" type="text/javascript" charset="utf-8"></script>
<!-- special js/css for the reset toy modal -->
<script src="js/jquery.modalseven.js" type="text/javascript" charset="utf-8"></script>
<!-- styles needed by jScrollPane -->
<link type="text/css" href="js/jquery.jscrollpane.css" rel="stylesheet" media="all" />
<!-- the mousewheel plugin - optional to provide mousewheel support -->
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
<!-- the jScrollPane script -->
<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript">
$(function()
{
	$('.scroll-pane').jScrollPane();
	$('.scroll-pane-arrows').jScrollPane(
		{
			showArrows: true,
			horizontalGutter: 10
		}
	);
});
</script>

</head>
<body>
<div id="wrapper">

		<div id="header">
		<div id="header_">
			<div id="header_logo">
			
			</div>
			<div id="header_menu">
				<ul>
					<li class="header_menu_current"><a href="index.php" title="Dashboard">Dashboard</a></li>
					<li><a href="profiles.php" title="Profiles">Profiles</a></li>
					<li><a href="account.php" title="Account">Account</a></li>
					<li><a href="" title="FAQ">FAQ</a></li>
					<li><a href="" title="Contact">Contact</a></li>
					<li class="header_menu_circle"><a href="" title="Sign Out">Sign Out</a></li>
					<li class="header_menu_circle"><a href="" title="Order">Order</a></li>
				</ul>
			</div>
		</div>
		</div>