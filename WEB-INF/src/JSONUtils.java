import org.json.JSONException;
import org.json.JSONObject;

public class JSONUtils
{
	private static final String FLAG_SELF="self";
	private static final String FLAG_NEW="new";
	private static final String FLAG_MESSAGE="message";
	private static final String FLAG_EXIT="exit";

	/**
	*Json when client needs it's own session details
	**/
	public String getClientDetailsJson(String sessionId,String message)
	{
		JSONObject json=null;
		try
		{
			json=new JSONObject();
			json.put("flag",FLAG_SELF);
			json.put("sessionId",sessionId);
			json.put("message",message);
		}
		catch(JSONException e)
		{
			e.printStackTrace();
		}
		return json.toString();
	}

	/**
	*Json to notify clients when a new user joins
	**/
	public String getNewClientJson(String sessionId,String name,String message,int onlineCount)
	{
		JSONObject json=null;
		try
		{
			json=new JSONObject();
			json.put("flag",FLAG_NEW);
			json.put("name",name);
			json.put("sessionId",sessionId);
			json.put("message",message);
			json.put("onlineCount",onlineCount);
		}
		catch(JSONException e)
		{
			e.printStackTrace();
		}
		return json.toString();
	}

	/**
	*Json when client exits the chat
	**/
	public String getClientExitJson(String sessionId,String name,String message,int onlineCount)
	{
		JSONObject json=null;
		try
		{
			json=new JSONObject();
			json.put("flag",FLAG_EXIT);
			json.put("name",name);
			json.put("sessionId",sessionId);
			json.put("message",message);
			json.put("onlineCount",onlineCount);
		}
		catch(JSONException e)
		{
			e.printStackTrace();
		}
		return json.toString();
	}

	/**
	*Json send message to all clients
	**/
	public String getSendAllMessageJson(String sessionId,String fromName,String message)
	{
		JSONObject json=null;
		try
		{
			json=new JSONObject();
			json.put("flag",FLAG_MESSAGE);
			json.put("sessionId",sessionId);
			json.put("name",fromName);
			json.put("message",message);
		}
		catch(JSONException e)
		{
			e.printStackTrace();
		}
		return json.toString();
	}
}
