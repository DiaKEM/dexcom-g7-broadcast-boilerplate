const fs = require('fs');

const fileName = "./smali-src/smali/com/diakem/dexcomg7broadcastboilerplate/MainActivity.smali";
const content = fs.readFileSync(fileName, 'utf8');
const replaceMap = [
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/TxCommState;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxCommState;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/TxServiceRecord;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxServiceRecord;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/SensorReading;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/SensorReading;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/GIU;', replace: 'Lkz/ᫍࡪ;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/TUI;', replace: 'Lkz/ࡦ࡭;' },
  { search: '->Iw:I', replace: '->࡬:I' },
  { search: '->Iw:J', replace: '->ᪿ:J' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/TrendArrow;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TrendArrow;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/AlgorithmState;', replace: 'Lcom/dexcom/coresdk/transmitterG7/G7AlgorithmState;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/mocks/SensorState;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/SensorState;' },
];
const docBlock = `
# broadcastToAAPS()
#
# Broadcast sensor readings to Android APS
#
# @author Selcuk Kekec <khskekec@gmail.com>
# @org DiaKEM
# @url https://github.com/DiaKEM/dexcom-g7-apk-patcher
# @date ${(new Date()).toISOString()}
`;
const replaceStaticReferences = str => replaceMap.reduce((acc, cur) => acc.replaceAll(cur.search, cur.replace), str);

// 1. Replace line numbers totally
const replaceLineNumbers = str => str.replaceAll(/^\s+\.line \d+$/gm, '');

// 2. Inject procedure to retrieve Application instance
const replaceBroadcastInvocation = str => {
    const intentVariable = /[n][e][w]-instance (v\d), Landroid\/content\/Intent;$/gm.exec(str);

    return str.replaceAll(/^\s+:try_end_0$/gm, `
    # Get G7CgmApplication from service store
    iget-object v7, p0, Lcom/dexcom/coresdk/g7appcore/persistence/repositories/TxServiceRoomRepository;->listener:Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventListener;
    check-cast v7, Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor;
    iget-object v7, v7, Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor;->listener:Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor$PersistenceEventMonitorListener;
    check-cast v7, Lkz/ࡰ࡯ᫌ;
    iget-object v7, v7, Lkz/ࡰ࡯ᫌ;->᫐:Lcom/dexcom/dexcomone/utils/alerts/AlertEngineLiveDataHub;
    iget-object v8, v7, Lcom/dexcom/dexcomone/utils/alerts/AlertEngineLiveDataHub;->appScope:Lkotlinx/coroutines/CoroutineScope;
    check-cast v8, Lcom/dexcom/phoenix/G7CgmApplication;
    invoke-virtual {v8, ${intentVariable[1]}}, Lcom/dexcom/phoenix/G7CgmApplication;->sendBroadcast(Landroid/content/Intent;)V
    :try_end_0
    `);
};

// 3. Replace static references and map local class names to target class names used in dexcom app
const extract = content.match(/\.method public broadcastToAAPS[\s\S]*\.end method/g)[0];

// 4. Write file
fs.writeFileSync('./final-broadcasting.smali', docBlock + (replaceBroadcastInvocation(replaceStaticReferences(replaceLineNumbers(extract)))));
