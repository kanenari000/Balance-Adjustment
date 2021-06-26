
// キャラクターのパラメータとなるステータスを定義する
export class BattleStatus{
    status;

    // コンストラクタ
    constructor(strength, dexterity, defense, intelligence, preemption, speed, hp){
        this.status = {
            "STR": strength,
            "DEX": dexterity,
            "DEF": defense,
            "INT": intelligence,
            "PRE": preemption,
            "SPD": speed,
            "MAX-HP": hp
        }
    }

}