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

public interface ShiftRepo extends MongoRepository<Shift, UUID> {
	List<Shift> findByUid(String uid);
	List<Shift> findByUidAndClockInBetween(String uid, LocalDateTime clockIn, LocalDateTime clockOut); 
}
