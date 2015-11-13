package com.example.electro__rage.onshor;

import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by amr on 11/6/15.
 */
public class Post {
    String message,id;
    Integer user_id,number_of_ignores,number_of_shares;
    public Post(String message,Integer user_id,Integer number_of_ignores,Integer number_of_shares,String id){
        this.message= message;
        this.user_id=user_id;
        this.number_of_ignores= number_of_ignores;
        this.number_of_shares=number_of_shares;
        this.id= id;
    }
    public static List<NameValuePair> createPost(String content,Integer number_of_shares,Integer number_of_ignores){
        List<NameValuePair> post =  new ArrayList<NameValuePair>(2);
        post.add(new BasicNameValuePair("content",content));
        post.add(new BasicNameValuePair("number_of_ignores",number_of_ignores.toString()));
        post.add(new BasicNameValuePair("number_of_shares",number_of_shares.toString()));
        post.add(new BasicNameValuePair("user_id",User.id.toString()));
        return post;
    }
}
