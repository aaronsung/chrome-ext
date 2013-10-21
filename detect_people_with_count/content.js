var first = true;

function highlighter()
{
	var target = "Tang.*Chung";

	try
	{
		var regex = new RegExp(target, "i");
		var count = 0;

		var divs = document.querySelectorAll("div.storyContent");
		for(var i = 0; i < divs.length; i++)
		{
			if( regex.test(divs[i].innerHTML) )
			{
				divs[i].style.border = "2px solid red";
				count++;

				if(first)
				{
					first = false;
					divs[i].scrollIntoView();
				}
			}
		}

		if(count == 0)
			console.log("Nothing");
		else
			console.log("" + count);

		chrome.extension.sendRequest(
			{"count": count},
			function(response) {}
		);
	}
	catch(e)
	{
		alert(e);
	}


	setTimeout(highlighter, 2000);		// periodic call at every 2 seconds.
}

highlighter();
