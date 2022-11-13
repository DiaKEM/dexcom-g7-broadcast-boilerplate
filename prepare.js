const fs = require('fs');

const fileName = "./smali-src/smali/com/diakem/dexcomg7broadcastboilerplate/MainActivity.smali";
const content = fs.readFileSync(fileName, 'utf8');


const replaceLineNumbers = str => str.replaceAll(/^\s+\.line \d+$/gm, '');
const replaceSet = {
  'Lcom/diakem/dexcomg7broadcastboilerplate/TxCommState;': 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxCommState;',
  'Lcom/diakem/dexcomg7broadcastboilerplate/TxServiceRecord;': 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxServiceRecord;',
  'Lcom/diakem/dexcomg7broadcastboilerplate/SensorReading;': 'Lcom/dexcom/coresdk/g7appcore/txservice/models/SensorReading;',
  'Lcom/diakem/dexcomg7broadcastboilerplate/GIU;': 'Lym/qj;',
  'Lcom/diakem/dexcomg7broadcastboilerplate/TUI;': 'Lym/kFw;',
  'Lcom/diakem/dexcomg7broadcastboilerplate/TrendArrow;': 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TrendArrow;'
};

const replaceBroadcastInvocation = str => str.replaceAll(/^\s+:try_end_0$/gm, `
    # Get G7CgmApplication from service store
    iget-object v7, p0, Lcom/dexcom/coresdk/g7appcore/persistence/repositories/TxServiceRoomRepository;->listener:Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventListener;
    check-cast v7, Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor;
    iget-object v7, v7, Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor;->listener:Lcom/dexcom/coresdk/dexappkit/persistence/eventmonitor/PersistenceEventMonitor$PersistenceEventMonitorListener;
    check-cast v7, Lym/GmR;
    iget-object v7, v7, Lym/GmR;->Iw:Lym/cLw;
    iget-object v8, v7, Lym/cLw;->vw:Lkotlinx/coroutines/CoroutineScope;
    check-cast v8, Lcom/dexcom/phoenix/G7CgmApplication;
    invoke-virtual {v8, v0}, Lcom/dexcom/phoenix/G7CgmApplication;->sendBroadcast(Landroid/content/Intent;)V
    :try_end_0
`);

const replaceMap = [
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/TxCommState;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxCommState;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/TxServiceRecord;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TxServiceRecord;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/SensorReading;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/SensorReading;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/GIU;', replace: 'Lym/qj;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/TUI;', replace: 'Lym/kFw;' },
  { search: 'Lcom/diakem/dexcomg7broadcastboilerplate/TrendArrow;', replace: 'Lcom/dexcom/coresdk/g7appcore/txservice/models/TrendArrow;' },
];

const replaceStaticReferences = str => replaceMap.reduce((acc, cur) => acc.replaceAll(cur.search, cur.replace), str);

const extract = content.match(/\.method public broadcastToAAPS[\s\S]*\.end method/g)[0];

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

fs.writeFileSync('./final-broadcasting.smali', docBlock + (replaceBroadcastInvocation(replaceStaticReferences(replaceLineNumbers(extract)))));
