
// 射撃武器の弾の設定
export class Condition{
    // ステータス上昇効果量(割合)
    statusRate;
    // ステータス上昇効果量（固定値）
    statusValue;
    // 対象
    target;
    // 効果ターン
    turn;
    // 付与率
    rate;

    // コンストラクタ
    constructor(){
        // デフォではステータス効果は0、効果ターン1、確率50%としておく
        this.statusRate = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.statusValue = this.setStatus(0, 0, 0, 0, 0, 0, 0);
        this.target = true;
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