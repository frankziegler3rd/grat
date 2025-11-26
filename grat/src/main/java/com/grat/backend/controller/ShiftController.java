/**
 * grat – senior project
 * shifts controller
 * 
 * @author frank ziegler
 * @version 1.0.0
 */
package com.grat.backend.controller;

import com.grat.backend.service.ShiftService;
import com.grat.backend.service.UserService;
import com.grat.backend.model.Shift;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/shifts")
public class ShiftController {

    private final ShiftService shiftService;
    private final UserService userService;

    public ShiftController(ShiftService shiftService, UserService userService) {
        this.userService = userService;
        this.shiftService = shiftService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addNewShift(@RequestHeader("Authorization") String authHeader, @RequestBody Shift shift) {
	    String token = authHeader.replace("Bearer ", "");
        String uid = userService.getUserIDFromToken(token);
        // should ideally check if this ^ fails
        // maybe another day

        shiftService.addShift(shift, uid); // should ideally return fail or success
        return ResponseEntity.ok("Shift added");
        
    }

    @GetMapping("/{date}")
    public ResponseEntity<?> getShiftsBetween(@RequestHeader("token") String token, @PathVariable String date) {
        String uid = userService.getUserIDFromToken(token);
        LocalDate ldate = LocalDate.parse(date);
        LocalDateTime ldateStart = ldate.atStartOfDay();
        LocalDateTime ldateEnd = ldate.atTime(23, 59, 59);

        List<Shift> shifts = shiftService.getShiftsBetween(uid, ldateStart, ldateEnd);
        return ResponseEntity.ok(shifts);

    }
}
