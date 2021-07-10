
// 射撃武器の弾の設定
export class Bullet{
    // 奥義フラグ true=奥義/false=通常攻撃
    mysteryFlg;
    // 固定ダメージ
    fixedDmg;
    // ダメージ倍率
    attackRate;
    // 付与効果 効果のkeyをリストで保持
    grantCondition;

    // コンストラクタ
    constructor(){
        this.mysteryFlg = false;
        this.fixedDmg = 0;
        this.attackRate = 1;
        this.grantCondition = [];
    }

}