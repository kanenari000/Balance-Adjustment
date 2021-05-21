
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
            "金属": [0, 0, 0],
            "木材": [0, 0, 0],
            "皮革": [0, 0, 0]
        };
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
            "広告": [false, false, false, false],
            "イベントスペース": [false, false, false, false]
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
    // CSV用の文字列に変換して返却する
    toCsvStr(){
        let result = "";
        let weaponName = ["刀剣", "長柄", "魔法", "射撃", "打撃"];
        let materialName = ["金属", "木材", "皮革"];
        // 武器所持数
        for(let i=0; i<5; i++){
            for(let j=0; j<6; j++){
                result += String(this.weaponSet[weaponName[i]][j]) + ",";
            }
        }
        // 素材所持数
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                result += String(this.materialSet[materialName[i]][j]) + ",";
            }
        }
        // 陳列武器数
        for(let i=0; i<5; i++){
            for(let j=0; j<6; j++){
                result += String(this.shopWeaponSet[weaponName[i]][j]) + ",";
            }
        }
        // 店強化段階
        result += String(this.shopRateStage["空調"]) + "," + String(this.shopRateStage["清掃用具"]) + ",";
        result += String(this.shopValueStage["一品物陳列棚"]) + "," + String(this.shopValueStage["置物"]) + ",";
        for(let i=0; i<4; i++){
            result += String(this.shopLimitStage["広告"][i]) + ",";
        }
        for(let i=0; i<4; i++){
            result += String(this.shopLimitStage["イベントスペース"][i]) + ",";
        }
        return result;
    }
    toCsvHeader(){
        let result = "";
        let weaponName = ["刀剣", "長柄", "魔法", "射撃", "打撃"];
        let materialName = ["金属", "木材", "皮革"];
        // 武器所持数
        for(let i=0; i<5; i++){
            for(let j=0; j<6; j++){
                result += "所持数_" + weaponName[i] + "Lv" + j + ",";
            }
        }
        // 素材所持数
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                result += "所持数_" + materialName[i] + "Lv" + [j] + ",";
            }
        }
        // 陳列武器数
        for(let i=0; i<5; i++){
            for(let j=0; j<6; j++){
                result += "陳列数_" + weaponName[i] + "Lv" + [j] + ",";
            }
        }
        // 店強化段階
        result += "空調Lv" + "," + "清掃用具Lv" + ",";
        result += "一品物陳列棚Lv" + "," + "置物Lv" + ",";
        for(let i=0; i<4; i++){
            result += "広告Lv" + i +  ",";
        }
        for(let i=0; i<4; i++){
            result += "イベントスペースLv"+ i + ",";
        }
        return result;
    }



}