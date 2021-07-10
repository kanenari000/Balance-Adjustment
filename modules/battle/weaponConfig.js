import {BattleStatus} from "./battleStatus"
// 武器の基礎設定
export class WeaponConfig{
    // クリティカル補正値
    ch;
    // 奥義ダメージ補正値
    mystery;
    // 奥義ゲージ上昇量補正値
    mysteryRise;
    // 通常攻撃ダメージ補正値
    attack;
    // 射撃武器専用
    bullet;
    // 武器装備時のステータス
    status;

    // コンストラクタ
    constructor(){
        this.ch = 0.2;
        this.mystery = 2;
        this.mysteryRise = 2;
        this.attack = 1;
        this.bullet = null;
        this.status = new BattleStatus(10, 0, 0, 0, 0, 0, 0);
    }

    // バレット・ステータス以外の属性を数値型に変換
    weaponConf2Num(){
        this.ch = Number(this.ch);
        this.mystery = Number(this.mystery);
        this.mysteryRise = Number(this.mysteryRise);
        this.attack = Number(this.attack);
    }

}