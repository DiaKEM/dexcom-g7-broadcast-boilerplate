package com.diakem.dexcomg7broadcastboilerplate.mocks;

/**
 * Smali alias: Lcom/dexcom/coresdk/g7appcore/txservice/models/SensorReading;
 */
public class SensorReading {
    public GIU egvValue;
    public GIU predictiveEgv;
    public int adjustedPredictiveEgvValue;
    public boolean isBackfilled;
    public int rate;
    public TUI sensorReadingTimestamp;
    public TrendArrow trendArrow;

    public AlgorithmState getAlgorithmState() {
        return new AlgorithmState();
    }

    public SensorState getSensorState(){
        return new SensorState();
    }

    public long getSessionStartTime(){
        return 1L;
    }

    public String getTxSw() {
        return "X";
    }
}
