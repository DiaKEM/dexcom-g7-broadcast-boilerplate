package com.diakem.dexcomg7broadcastboilerplate;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import java.util.List;

public class MainActivity extends AppCompatActivity {

    /**
     * Broadcast method boilerplate
     *
     * @param serviceRecord
     */
    public void broadcastToAAPS(TxServiceRecord serviceRecord) {
        try {
            // Check whether sensor is operational
            if (!serviceRecord.txCommState.name().equals("Nominal")) {
                Log.d("DIAKEM", "Communication state is not nominal - EXIT");
                return;
            }

            // Create main intent
            Intent mainIntent = new Intent();
            mainIntent.setPackage("info.nightscout.androidaps");
            mainIntent.setAction("com.dexcom.g7.EXTERNAL_BROADCAST");

            // Create main bundle
            Bundle mainBundle = new Bundle();

            // Get and iterate over readings
            List<SensorReading> sensorReadings = serviceRecord.getSensorReadings();
            for (int i = 0; i < sensorReadings.size(); i++) {
                // Create reading bundle
                Bundle sensorReadingBundle = new Bundle();
                SensorReading sensorReading = sensorReadings.get(i);

                Log.d(
                        "DIAKEM",
                        "Timestamp: " + sensorReading.sensorReadingTimestamp.Iw + " | " +
                            "Glucose value: " + sensorReading.egvValue.Iw + " | " +
                            "Algorithm state: " + sensorReading.getAlgorithmState()
                );

                // Check for invalid value
                if (sensorReading.egvValue.Iw > 400) {
                    Log.d("DIAKEM", "Glucose value is over 400 - EXIT");
                    continue;
                }

                // Set reading data into bundle
                sensorReadingBundle.putInt("glucoseValue", sensorReading.egvValue.Iw);
                sensorReadingBundle.putLong("timestamp", sensorReading.sensorReadingTimestamp.Iw / 1000);
                sensorReadingBundle.putString("trendArrow", sensorReading.trendArrow.name());

                // Put into main bundle
                mainBundle.putBundle(String.valueOf(i), sensorReadingBundle);
            }

            // Put glucose values collected in main bundle
            mainIntent.putExtra("glucoseValues", mainBundle);
        } catch (Exception e) {
            Log.e("DIAKEM", e.getMessage());
        }
    }
}