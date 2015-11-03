package com.example.electro__rage.onshor;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by amr on 11/3/15.
 */
public class Device {
    public static int id,number_of_ignores;
    public static String gcm_registration_id="###",device_id;
    public Device(JSONObject json) throws JSONException {
        number_of_ignores= json.getInt("number_of_ignores");
        gcm_registration_id= json.getString("gcm_registration_id");
        device_id= json.getString("device_id");
    }

    // to be implemented
    public static String getLongitude(){
        return "longitude";
    }
    public static String getLatitude(){
        return "latitude";
    }

}
