

// 探索で入手できる素材の設定
export class SearchMaterials{
    // ランク別の素材数
    materialList;

    // コンストラクタ
    // 引数はいずれも length=3 の配列
    constructor(metal, wood, leather){
        this.materialList = {
            "金属": metal,
            "木材": wood,
            "皮革": leather
        };
    }


}