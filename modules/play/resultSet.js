
// 実行結果サマリー
export class ResultSet{
    // 各武器種ごとのランク別所持数
    weaponSet;
    // 各素材ごとのランク別所持数
    materialSet;
    // 店舗に陳列している武器数
    shopWeaponSet;
    // 店の強化段階(販売確率)
    shopRateStage;
    // 店の強化段階(販売価格)
    shopValueStage;
    // 店の強化段階（期間限定）
    shopLimitStage;
    // 各マス区分の選択回数
    mapTypeSelect;
    // 訓練武器種の選択回数
    trainingSelect;
    // 探索武器種の選択回数
    searchSelect;
    // 一品物の製造状況
    weaponProgress;

    // コンストラクタ
    constructor(){
        this.resetResultSet();
    }

    // 実行結果をリセット（=0）
    resetResultSet(){
        this.weaponSet = {
            "刀剣": [0, 0, 0, 0, 0, 0],
            "長柄": [0, 0, 0, 0, 0, 0],
            "魔法": [0, 0, 0, 0, 0, 0],
            "射撃": [0, 0, 0, 0, 0, 0],
            "打撃": [0, 0, 0, 0, 0, 0]
        };
        this.materialSet = {
            "金属": [100, 100, 100],
            "木材": [100, 100, 100],
            "皮革": [100, 100, 100]
        };
        // this.materialSet = {
        //     "金属": [0, 0, 0],
        //     "木材": [0, 0, 0],
        //     "皮革": [0, 0, 0]
        // };
        this.shopWeaponSet = {
            "刀剣": [0, 0, 0, 0, 0, 0],
            "長柄": [0, 0, 0, 0, 0, 0],
            "魔法": [0, 0, 0, 0, 0, 0],
            "射撃": [0, 0, 0, 0, 0, 0],
            "打撃": [0, 0, 0, 0, 0, 0]
        };
        this.shopRateStage = {
            "空調": 0,
            "清掃用具": 0
        };
        this.shopValueStage = {
            "一品物陳列棚": 0,
            "置物": 0
        };
        this.shopLimitStage = {
            "広告": [0, 0, 0, 0],
            "イベントスペース": [0, 0, 0, 0]
        };
        this.mapTypeSelect = {
            "無色": 0,
            "青": 0,
            "黄": 0,
            "赤": 0,
            "濃赤": 0
        }
        this.trainingSelect = {
            "刀剣": 0,
            "長柄": 0,
            "魔法": 0,
            "射撃": 0,
            "打撃": 0
        };
        this.searchSelect = {
            "刀剣": 0,
            "長柄": 0,
            "魔法": 0,
            "射撃": 0,
            "打撃": 0
        };
        this.weaponProgress = {
            "刀剣": [0, 0, 0, 0, 0, 0],
            "長柄": [0, 0, 0, 0, 0, 0],
            "魔法": [0, 0, 0, 0, 0, 0],
            "射撃": [0, 0, 0, 0, 0, 0],
            "打撃": [0, 0, 0, 0, 0, 0]
        };
    }



}