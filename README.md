# Dexcom G7 Broadcast Boilerplate

Boilerplate android project which offers Dexcom G7 broadcasting interface

## Introduction

Just checkout this repository and check `MainActivity`. This file includes the broadcasting method `sendReadings()`. For this the class and interfaces structure
of Dexcom G7 App itself is reconstructed:

* TxServiceRecord: Entity model to access single sensor readings - see `getSensorReadings()`
* SensorReading: Entity model which holds all information about a single sensor reading
* GIU: Integer wrapper 
* TIU: Timestamp wrapper
* TrendArrow: Enum entity for trend arrows

## How to use?

After debugging the sensor reading you can just access the interfaces and can adjust it here. To generate the corresponding smali-code just run:

```
./build-apk-and-disassemble.sh
```

This command will build an apk and generate the `.smali` ressources in directory `smali-src`.
