
// 行動ログを定義する
export class BattleLog{
    tarn;
    myLeftHp;
    myActionValue;
    myMysteryValue;
    enemyLeftHp;
    enemyActionValue;
    enemyMysteryValue;
    logMessage;

    // コンストラクタ
    constructor(tarn, myLeftHp, myActionValue, myMysteryValue, enemyLeftHp, enemyActionValue, enemyMysteryValue, logMessage){
        this.tarn = tarn;
        this.myLeftHp = myLeftHp;
        this.myActionValue = myActionValue;
        this.myMysteryValue = myMysteryValue;
        this.enemyLeftHp = enemyLeftHp;
        this.enemyActionValue = enemyActionValue;
        this.enemyMysteryValue = enemyMysteryValue;
        this.logMessage = logMessage;
    }

}