/**
 * grat – senior project
 * user repo
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.repository;

import com.grat.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

/**
 * For defining queries (by keyword) in the user DB.
 */
@Repository
public interface UserRepo extends MongoRepository<User, UUID> {
    
    public User findByEmail(String email);
}
