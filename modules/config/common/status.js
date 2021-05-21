
// キャラクターのパラメータとなるステータスを定義する
export class Status{
    // 攻撃力
    strength;
    // 命中率
    dexterity;
    // 防御力
    defense;
    // 賢さ
    intelligence;
    // 先制
    preemption;
    // スピード
    speed;

    // コンストラクタ
    constructor(strength, dexterity, defense, intelligence, preemption, speed){
        this.strength = strength;
        this.dexterity = dexterity;
        this.defense = defense;
        this.intelligence = intelligence;
        this.preemption = preemption;
        this.speed = speed;
    }

    // キャラクターのステータスを引数の値だけ加算
    addCharaStatus(strength, dexterity, defense, intelligence, preemption, speed){
        this.strength += strength;
        this.dexterity += dexterity;
        this.defense += defense;
        this.intelligence += intelligence;
        this.preemption += preemption;
        this.speed += speed;
    }

    // キャラクターのステータスをリセット（=0）
    resetCharaStatus(){
        this.strength = 1;
        this.dexterity = 1;
        this.defense = 1;
        this.intelligence = 1;
        this.preemption = 1;
        this.speed = 1;
    }

    toCsvStr(){
        return this.strength + "," + this.dexterity + "," + this.defense + "," + this.intelligence + "," + this.preemption + "," + this.speed + ",";
    }


}