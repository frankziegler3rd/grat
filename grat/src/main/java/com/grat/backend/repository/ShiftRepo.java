/**
 * grat – senior project
 * shift repo
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.UUID;

public interface ShiftRepo extends MongoRepository<Shift, UUID> {}