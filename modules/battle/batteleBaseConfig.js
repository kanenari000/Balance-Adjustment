
// 戦闘時の基礎設定
export class BattleBaseConfig{
    // クリティカル補正固定値
    ch;
    // 奥義ダメージ補正固定値
    mystery;
    // 通常攻撃ダメージ基礎値
    attack;
    // 奥義ダメージ乱数
    mysteryRand;
    // 通常攻撃乱数
    attackRand;
    // 打撃武器の連撃発生率
    comboRate;

    // コンストラクタ
    constructor(){
        this.ch = 0.2;
        this.mystery = {
            "刀剣": 5,
            "長柄": 6,
            "打撃": 5,
            "射撃": 3,
            "魔法": 8,
        };
        this.attack = 10;
        this.mysteryRand = 0.05;
        this.attackRand = 0.1;
        this.comboRate = [0.4, 0.2];
    }

}