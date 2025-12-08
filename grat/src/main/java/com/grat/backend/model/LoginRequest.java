/**
 * grat – senior project
 * login request DTO
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.model;

/**
 * Represents the format of a login request from the client.
 */
public class LoginRequest {

    private String email;
    private String rawPassword;

    public LoginRequest(String email, String rawPassword) {
        this.email = email;
        this.rawPassword = rawPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRawPassword() {
        return rawPassword;
    }

    public void setRawPassword(String rawPassword) {
        this.rawPassword = rawPassword;
    }
}
