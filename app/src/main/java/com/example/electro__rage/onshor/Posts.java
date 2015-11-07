package com.example.electro__rage.onshor;

import android.os.Bundle;
import android.util.Log;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by amr on 11/6/15.
 */
public class Posts {
    public static List<Post> posts= new LinkedList();
    public static Boolean addPost(String content,Integer user_id,Integer number_of_ignores,Integer number_of_shares){
        Post post= new Post(content,user_id,number_of_ignores,number_of_shares);
        return posts.add(post);
    }
    public static Boolean addPost(Bundle data){
        try {
            if (data.getString("type").equals("post")) {
                String message = data.getString("message");
                Integer user_id = Integer.parseInt(data.getString("user_id"));
                Integer number_of_ignores = Integer.parseInt(data.getString("number_of_ignores"));
                Integer number_of_shares = Integer.parseInt(data.getString("number_of_shares"));
                Post post = new Post(message, user_id, number_of_ignores, number_of_shares);
                return posts.add(post);
            }
        }catch(Exception e){
            Log.i("error", e.toString());
        }
       return false;
    }
    public static Post getFirst(){
        return posts.get(0);
    }
}
