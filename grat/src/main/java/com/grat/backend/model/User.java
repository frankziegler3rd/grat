/**
 * grat – senior project
 * user model
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.model;

import java.util.UUID;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The User domain object. IS exposed to client, but because I didn't have time to implement a user DTO.
 */
@Document(collection = "users")
public class User {
    
    @Id
    private String id;

    @JsonProperty("fname")
    private String fName;

    @JsonProperty("lname")
    private String lName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("hpass")
    private String hPass;

    public User(String id, String fName, String lName, String email, String hPass) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.hPass = hPass;
    }

    public String getId() { return id; }

    public void setId(String id) { this.id = id; }

    public String getFName() { return fName; }

    public void setFName(String fName) { this.fName = fName; }

    public String getLName() { return lName; }

    public void setLName(String lName) { this.lName = lName; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getHpassword() { return hPass; }

    public void setHpassword(String hPass) { this.hPass = hPass; }
}
