package com.example.electro__rage.onshor;

/**
 * Created by amr on 10/26/15.
 */



import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class HTTPPostActivity  {

    static String base_url="http://192.168.1.3:3000/";


    public static void makePostRequest(String url, List<NameValuePair> nameValuePair) {
        HttpClient httpClient = new DefaultHttpClient();
        // replace with your url
        HttpPost httpPost = new HttpPost(base_url+url);

        //Encoding POST data
        try {
            httpPost.setEntity(new UrlEncodedFormEntity(nameValuePair));
        } catch (UnsupportedEncodingException e) {
            // log exception
            e.printStackTrace();
        }

        //making POST request.
        try {
            HttpResponse response = httpClient.execute(httpPost);
            // write response to log
            Log.d("Http Post Response:", response.toString());
        } catch (ClientProtocolException e) {
            // Log exception
            e.printStackTrace();
        } catch (IOException e) {
            // Log exception
            e.printStackTrace();
        }
    }

}