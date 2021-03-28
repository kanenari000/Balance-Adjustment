
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
    // スピード
    speed;

    // コンストラクタ
    constructor(strength, dexterity, defense, intelligence, speed){
        this.strength = strength;
        this.dexterity = dexterity;
        this.defense = defense;
        this.intelligence = intelligence;
        this.speed = speed;
    }

    // キャラクターのステータスを引数の値だけ加算
    addCharaStatus(strength, dexterity, defense, intelligence, speed){
        this.strength += strength;
        this.dexterity += dexterity;
        this.defense += defense;
        this.intelligence += intelligence;
        this.speed += speed;
    }

    // キャラクターのステータスをリセット（=0）
    resetCharaStatus(){
        this.strength = 0;
        this.dexterity = 0;
        this.defense = 0;
        this.intelligence = 0;
        this.speed = 0;
    }


}