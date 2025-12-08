/**
 * grat – senior project
 * shift repo
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.repository;

import com.grat.backend.model.Shift;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.UUID;
import java.util.List;
import java.time.LocalDateTime;

/**
 * For defining queries by keyword in the shift DB.
 */
public interface ShiftRepo extends MongoRepository<Shift, String> {
    
    List<Shift> findByUid(String uid);
    List<Shift> findByUidAndClockInBetween(String uid, LocalDateTime start, LocalDateTime end); 
}
