var nav = document.getElementById('navigation');
var navButton = document.getElementById('navigationButton');

navButton.addEventListener("click", function(e) {
	if(nav.className == "navigation" || nav.className == "navigation navigationClose")
	{
		nav.className = 'navigation navigationOpen';
	}
	else
	{
		nav.className = 'navigation navigationClose';	
	}
});

