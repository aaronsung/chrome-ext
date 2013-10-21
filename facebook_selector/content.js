var previousInput = null;

function highlighter(str, isSet)
{
	try
	{
		var regex = new RegExp(str, "i");
		var count = 0;
		var first = true;

		var divs = document.querySelectorAll("div.storyContent");
		for(var i = 0; i < divs.length; i++)
		{
			if(isSet)
			{
				divs[i]["style"]["display"] = "none";
				if( regex.test(divs[i].innerHTML) )
				{
					divs[i]["style"]["display"] = "";
					count++;
				}
			}
			else
			{
				divs[i]["style"]["display"] = "";
			}
		}

		if(count == 0)
			console.log("Nothing\n");

		return count;
	}
	catch(e)
	{
		alert(e);
	}

	return -1;
}


chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse)
	{
		var count = 0;

		if(request.command && request.command == "highlight")
		{
			if(previousInput != null)
				highlighter(previousInput, false);
	
			if(request.name != "None")
				previousInput = request.name;
			else
				previousInput = null;

			if(request.name != "None")
				count = highlighter(request.name, true);
		}

		var response = {};
		response["count"] = new String(count);
		sendResponse(response);
	}
);
