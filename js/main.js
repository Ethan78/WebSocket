var sessionId="";
var name="";

//Socket connection and port
var url="192.168.10.102";
var port="8080";

$(document).ready(function()
{
	$("#form_submit,#form_send_message").submit(function(e)
	{
		e.preventDefault();
		join();
	});
});

var websocket;

/**
  *Connecting to the socket
**/
function join()
{
	//Check name
	if($("#input_name").val().trim().length<=0)
		alert("お名前を入力してください");
	else
	{
		name=$("#input_name").val().trim();
		$("#prompt_name_container").fadeOut(1000,function()
		{
			openSocket();
		});
	}
	return false;
}

/**
  *Open the socket connection
**/
function openSocket()
{
	//Ensures only one connection at a time
	if(websocket!==undefined && websocket.readyState!==websocket.CLOSED)
		return;
	//Create a new instance of the websocket
	websocket=new WebSocket("ws://"+url+":"+port+"/websocket/chat?name="+name);

	//Websocket listeners
	websocket.onopen=function(event)
	{
		$("#message_container").fadeIn();
		if(event.date===undefined)
			return;
	};

	websocket.onmessage=function(event)
	{
		parseMessage(event.data);
	};

	websocket.onclose==function(event)
	{
		alert("接続が閉じました");
	};
}

/**
  *Sending the chat message to server
**/
function send()
{
	var message=$("#input_message").val();
	if(message.trim().length>0)
		sendMessageToServer("message",message);
	else
		alert("メッセージを入力してください");
}

/**
  *Closing the socket connection
**/
function closeSocket()
{
	websocket.close();
	$("#message_container").fadeOut(600,function()
	{
		$("#prompt_name_container").fadeIn();
		sessionId="";
		name="";

		//Clear messages
		$("#messages").html("");
		$("#p.online_count").hide("");
	});
}

/**
  *Parsing the json message
**/
function parseMessage(message)
{
	var json=$.parseJSON(message);
	if(json.flag=="self")
		sessionId=json.sessionId;
	else if(json.flag=="new")
	{
		var new_name="貴方";
		var online_count=json.onlineCount;
		$("p.online_count").html(
			"Hello,<span class='green'>"+name+"</span><b>"
			+online_count+"</b>人がオンライン中").fadeIn();
		if(json.sessionId!=sessionId)
			new_name=json.name;
		var li="<li class='new'><span class='name'>"+new_name+"　</span>"+json.message+"</li>";
		$("#messages").append(li);
		$("#input_message").val("");
	}
	else if(json.flag=="message")
	{
		var from_name="You";
		if(json.sessionId!=sessionId)
			from_name=json.name;
		var li="<li><span class='name'>"+from_name+" さん</span>"
			+json.message+"</li>";
		appendChatMessage(li);
		$("#input_message").val("");
	}
	else if(json.flag=="exit")
	{
		var li="<li class='exit'><span class='name red>"+json.name
			+"</span>"+json.message+"</li>";
		var online_count=json.onlineCount;
		$("p.online_count").html("Hello,<span class='green'>"+name+"</span><b>"
			+online_count+"</b> 人がオンライン中");
		appendChatMessage(li);
	}
}

/**
  *Append chat message
**/
function appendChatMessage(li)
{
	$("#messages").append(li);
	//Scroll the list to the bottom
	$("#messages").scrollTop($("#messages").height());
}

/**
 *sending message to socket server
**/
function sendMessageToServer(flag,message)
{
	var json='{""}';
	//Prepare json
	var object=new Object();
	object.sessionId=sessionId;
	object.message=message;
	object.flag=flag;

	json=JSON.stringify(object);
	websocket.send(json);
}
