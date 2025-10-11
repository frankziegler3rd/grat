/**
 * grat – senior project
 * login request format
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.model;

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