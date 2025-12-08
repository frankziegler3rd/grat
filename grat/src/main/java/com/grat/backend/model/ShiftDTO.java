/**
 * grat – senior project
 * shift DTO
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

package com.grat.backend.model;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Represents the shift object in the format sent by client. Forces all identification and ownership logic out of the frontend.
 */
public class ShiftDTO {

    @JsonProperty("position")
    private String position;

    @JsonProperty("location")
    private String location;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @JsonProperty("clock_in")
    private LocalDateTime clockIn;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS")
    @JsonProperty("clock_out")
    private LocalDateTime clockOut;

    @JsonProperty("cash_tips")
    private double cashTips;

    @JsonProperty("card_tips")
    private double cardTips;

    @JsonProperty("metrics")
    private Map<String, Object> metrics;

    public ShiftDTO(String position, String location, LocalDateTime clockIn, LocalDateTime clockOut, double cashTips, double cardTips, Map<String, Object> metrics) {
        this.position = position;
        this.location = location;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.cashTips = cashTips;
        this.cardTips = cardTips;
        this.metrics = metrics;
    }

    public String getPosition() { return position; }

    public void setPosition(String position) { this.position = position; }

    public String getLocation() { return location; }

    public void setLocation(String location) { this.location = location; }

    public LocalDateTime getClockIn() { return clockIn; }

    public void setClockIn(LocalDateTime clockIn) { this.clockIn = clockIn; }

    public LocalDateTime getClockOut() { return clockOut; }

    public void setClockOut(LocalDateTime clockOut) { this.clockOut = clockOut; }

    public double getCashTips() { return cashTips; }

    public void setCashTips(double cashTips) { this.cashTips = cashTips; }

    public double getCardTips() { return cardTips; }

    public void setCardTips(double cardTips) { this.cardTips = cardTips; }

    public Map<String, Object> getMetrics() { return metrics; }

    public void setMetrics(Map<String, Object> metrics) { this.metrics = metrics; }

    public Object getMetricValueByMetric(String metric) {
        return metrics.get(metric);
    }
}
