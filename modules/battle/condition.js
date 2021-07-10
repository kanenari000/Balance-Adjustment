
// 射撃武器の弾の設定
export class Condition{
    // 自分のステータス上昇効果量(割合)
    myStatusRate;
    // 自分のステータス上昇効果量（固定値）
    myStatusValue;
    // 敵のステータス上昇効果量(割合)
    enemyStatusRate;
    // 敵のステータス上昇効果量(固定値)
    enemyStatusValue;
    // 効果ターン
    turn;
    // 付与率
    rate;

    // コンストラクタ
    constructor(){
        // デフォではステータス効果は0、効果ターン1、確率50%としておく
        this.myStatusRate = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.myStatusValue = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.enemyStatusRate = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.enemyStatusValue = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.turn = 1;
        this.rate = 0.5;
    }

    // ステータス変化効果についてのsetter
    setStatus(hp, str, dex, def, int, pre, spd){
        return {
            "HP": hp,
            "STR": str,
            "DEX": dex,
            "DEF": def,
            "INT": int,
            "PRE": pre,
            "SPD": spd
        };
    }

}