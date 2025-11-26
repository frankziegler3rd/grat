/**
 * grat – senior project
 * shifts service
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.service;

import com.grat.backend.model.Shift;
import com.grat.backend.repository.ShiftRepo;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ShiftService {
    
    private final ShiftRepo shiftRepo;

    public ShiftService(ShiftRepo shiftRepo) {
        this.shiftRepo = shiftRepo;
    }

    // needs to have a return value here -- either shift itself or boolean for success
    public void addShift(Shift shift, String uid) {
        shift.setId(UUID.randomUUID());
        shift.setUid(uid);
        shiftRepo.save(shift);
    }

    public List<Shift> getShiftsBetween(String uid, LocalDateTime start, LocalDateTime end) {
    	return shiftRepo.findByUidAndClockInBetween(uid, start, end);
    }

    // delete a shift?
    // edit or update a shift? 

}
