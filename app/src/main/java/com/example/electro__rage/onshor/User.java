package com.example.electro__rage.onshor;



import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/*
 * Created by amr on 11/6/15.
 */
public class User {
    public static String gcm_registration_id="red wedding",device_id;
    public static Integer number_of_shares,number_of_ignores,id=-1;
    public static Double longitude,latitude,radius=10.0;
    public static void setUser(JSONObject json) throws JSONException {
        if(json.has("id")) {
            id = Integer.parseInt(json.getString("id"));
        }
        gcm_registration_id = json.getString("gcm_registration_id");
        number_of_shares = Integer.parseInt(json.getString("number_of_shares"));
        number_of_ignores = Integer.parseInt(json.getString("number_of_ignores"));
        longitude = Double.parseDouble(json.getString("longitude"));
        latitude = Double.parseDouble(json.getString("latitude"));
    }
    public static void setUser(String gcm_registration_id1,Integer number_of_shares1,Integer number_of_ignores1,Double longitude1,Double latitude1){
        gcm_registration_id = gcm_registration_id1;
        number_of_shares = number_of_shares1;
        number_of_ignores = number_of_ignores1;
        longitude= longitude1 ;
        latitude= latitude1;
    }
    public static List<NameValuePair> toArray(){
        List<NameValuePair> nameValuePair = new ArrayList<NameValuePair>(2);
        nameValuePair.add(new BasicNameValuePair("gcm_registration_id",gcm_registration_id));
        nameValuePair.add(new BasicNameValuePair("radius",radius.toString()));
        nameValuePair.add(new BasicNameValuePair("device_id",device_id));
        nameValuePair.add(new BasicNameValuePair("number_of_shares",number_of_shares.toString()));
        nameValuePair.add(new BasicNameValuePair("number_of_ignores",number_of_ignores.toString()));
        nameValuePair.add(new BasicNameValuePair("longitude",longitude.toString() ));
        nameValuePair.add(new BasicNameValuePair("latitude", latitude.toString()));
        return nameValuePair;
    }
}
