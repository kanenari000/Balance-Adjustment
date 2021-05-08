
// 武器情報クラス
export class WeaponInfo{
    // 販売確率
    rate;
    // 販売価格
    value;
    // 武器生成時のレシピ
    recipe;

    // コンストラクタ
    // metal, wood, leather は length=3 の配列
    constructor(rate, value, metal, wood, leather){
        this.rate = rate;
        this.value = value;
        this.recipe = {
            "金属": metal,
            "木材": wood,
            "皮革": leather
        };
    }


}