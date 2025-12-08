/**
 * grat – senior project
 * shifts service
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.service;

import com.grat.backend.model.Shift;
import com.grat.backend.model.ShiftDTO;
import com.grat.backend.repository.ShiftRepo;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

/**
 * Handles all logic (implementation) of basic Shift CRUD operations using the related repository.
 */
@Service
public class ShiftService {
    
    private final ShiftRepo shiftRepo;

    public ShiftService(ShiftRepo shiftRepo) {
        this.shiftRepo = shiftRepo;
    }

    // needs to have a return value here -- either shift itself or boolean for success
    public void addShift(ShiftDTO dto, String uid) {
        Shift shift = new Shift();
        
        shift.setUid(uid);
        shift.setId(UUID.randomUUID());
        shift.setPosition(dto.getPosition());
        shift.setLocation(dto.getLocation());
        shift.setClockIn(dto.getClockIn());
        shift.setClockOut(dto.getClockOut());
        shift.setCashTips(dto.getCashTips());
        shift.setCardTips(dto.getCardTips());
        shift.setMetrics(dto.getMetrics());

        shiftRepo.save(shift);
    }

    public List<Shift> getShiftsBetween(String uid, LocalDateTime start, LocalDateTime end) {
        return shiftRepo.findByUidAndClockInBetween(uid, start, end);
    }

    public List<Shift> findAllShiftsByUserId(String uid) {
        return shiftRepo.findByUid(uid);
    }
    
    public void deleteShift(String sid) {
        if(shiftRepo.existsById(sid)) {
            shiftRepo.deleteById(sid);
        }
        else {
            System.out.println("no shift found with this id");
        }
    }
    
    public void updateShift(String uid, String sid, ShiftDTO dto) {
        Optional<Shift> opShift = shiftRepo.findById(sid);
        if(opShift.isPresent()) {
            Shift shiftToUpdate = opShift.get();
            if(shiftToUpdate.getUid().equals(uid)) {
                shiftToUpdate.setPosition(dto.getPosition());
                shiftToUpdate.setLocation(dto.getLocation());
                shiftToUpdate.setClockIn(dto.getClockIn());
                shiftToUpdate.setClockOut(dto.getClockOut());
                shiftToUpdate.setCashTips(dto.getCashTips());
                shiftToUpdate.setCardTips(dto.getCardTips());
                shiftToUpdate.setMetrics(dto.getMetrics());
                shiftRepo.save(shiftToUpdate);
            }
        }
    }
}
