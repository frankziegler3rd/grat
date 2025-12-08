/**
 * grat – senior project
 * user controller
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.controller;

import com.grat.backend.service.UserService;
import com.grat.backend.model.User;
import com.grat.backend.model.LoginRequest;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.http.ResponseEntity;
import java.util.UUID;
import java.util.Map;

/**
 * All endpoints for serving user-based queries exist here, depends on UserService class.
 * TODO: Delete user, update user.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest lr) {
        User authUser = userService.authenticateUser(lr.getEmail(), lr.getRawPassword());
        if(authUser == null)
            return ResponseEntity.badRequest().body("Email not found or password incorrect.");
        
        String token = UUID.randomUUID().toString();
        userService.startSessionForUser(token, authUser.getId());
        System.out.println(token);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User regUser = userService.registerUser(user);
        return regUser == null ? ResponseEntity.badRequest().body("Email already registered.") : ResponseEntity.ok("User registered");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("token") String token) {
        if (userService.getUserIDFromToken(token) != null) {
            userService.endSessionForUser(token);
            return ResponseEntity.ok("User logged out");
        }
        return ResponseEntity.badRequest().body("No session with this token exists.");
    }

    /**
     * this is just for testing the api connectivity. 
     */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("pong");
    }
}
