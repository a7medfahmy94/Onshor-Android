package com.example.electro__rage.onshor;

/**
 * Created by amr on 11/6/15.
 */
public class Post {
    String message;
    Integer user_id,number_of_ignores,number_of_shares;
    public Post(String message,Integer user_id,Integer number_of_ignores,Integer number_of_shares){
        this.message= message;
        this.user_id=user_id;
        this.number_of_ignores= number_of_ignores;
        this.number_of_shares=number_of_shares;
    }
}
