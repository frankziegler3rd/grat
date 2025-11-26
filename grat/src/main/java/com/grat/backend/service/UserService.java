/**
 * grat – senior project
 * user services
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.service;

import com.grat.backend.model.User;
import com.grat.backend.repository.UserRepo;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserService {

    private final PasswordEncoder passEncoder;
    private final UserRepo userRepo;
    private final Map<String, String> sessions = new HashMap<>();

    @Autowired
    public UserService(PasswordEncoder passEncoder, UserRepo userRepo) {
        this.passEncoder = passEncoder;
        this.userRepo = userRepo;
    }

    public User authenticateUser(String email, String rawPass) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            return null;
        }
        return passEncoder.matches(rawPass, user.getHpassword()) ? user : null;
    }

    public User registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            return null;
        }
        user.setId(UUID.randomUUID().toString());
        user.setHpassword(passEncoder.encode(user.getHpassword()));
        return userRepo.save(user);
    }

    public void startSessionForUser(String token, String uid) {
        sessions.put(token, uid);
    }

    public String getUserIDFromToken(String token) {
        return sessions.get(token);
    }

    public boolean checkIfValidSession(String token) {
        return sessions.containsKey(token);
    }

    public void endSessionForUser(String token) {
        sessions.remove(token);
    }
}
