package com.diakem.dexcomg7broadcastboilerplate;

/**
 * Smali alias: Lcom/dexcom/coresdk/g7appcore/txservice/models/TxCommState;
 */
public enum TxCommState {
    Nominal("Nominal");
    public final String name;
    private TxCommState(String label) {
        this.name = label;
    }
}
