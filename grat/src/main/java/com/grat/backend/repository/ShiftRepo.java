/**
 * grat – senior project
 * shift repo
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import org.springframework.data.mongodb.repository;

public interface ShiftRepo extends MongoRepository<Shift, UUID> {}