package com.diakem.dexcomg7broadcastboilerplate.mocks;

import java.util.ArrayList;
import java.util.List;

/**
 * Smali alias: Lcom/dexcom/coresdk/g7appcore/txservice/models/TxServiceRecord;
 */
public class TxServiceRecord {
    public TxCommState txCommState;

    public List<SensorReading> getSensorReadings()
    {
        List<SensorReading> readings = new ArrayList<>();

        readings.add(new SensorReading());
        readings.add(new SensorReading());
        readings.add(new SensorReading());
        readings.add(new SensorReading());
        return readings;
    }
}
