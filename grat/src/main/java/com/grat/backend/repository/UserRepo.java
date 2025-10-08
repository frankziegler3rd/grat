/**
 * grat – senior project
 * user repo
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import org.springframework.data.mongodb.repository;

public interface UserRepo extends MongoRepository<User, UUID> {
    
    public User findByEmail(String email);
}