/**
 * grat – senior project
 * shift model
 * 
 * @author frank ziegler
 * @version 1.0.0
 */

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "shifts")
public class Shift {

    @Id
    private UUID id;

    @Field(name = "date")
    private LocalDate date;

    @Field(name = "clock_in")
    private LocalTime clockIn;

    @Field(name = "clock_out")
    private LocalTime clockOut;

    @Field(name = "cash_tips")
    private double cashTips;

    @Field(name = "card_tips")
    private double cardTips;

    @Field(name = "metrics")
    private Map<String, Object> metrics;

    public Shift(UUID id, LocalDate date, LocalTime clockIn, LocalTime clockOut, double cashTips, double cardTips, Map<String, Object> metrics) {
        this.id = id;
        this.date = date;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.cashTips = cashTips;
        this.cardTips = cardTips;
        this.metrics = metrics;
    }

    public UUID getId() { return id; }

    public void setId() { this.id = id; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }

    public LocalTime getClockIn() { return clockIn; }

    public void setClockIn(LocalTime clockIn) { this.clockIn = clockIn; }

    public LocalTime getClockOut() { return clockOut; }

    public void setClockOut(LocalTime clockOut) { this.clockOut = clockOut; }

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