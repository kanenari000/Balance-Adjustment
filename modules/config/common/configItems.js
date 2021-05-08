import {TrainingInfo} from "../training/trainingInfo"
import {SearchInfo} from "../search/searchInfo"
import {Status} from "../common/status"
import {ShopInfo} from "../common/shopInfo"
import {WeaponInfo} from "../common/weaponInfo"

// 設定内容を管理するクラス
export class ConfigItems{
    // 訓練時関連情報
    trainingInfo;
    // 探索時関連情報
    searchInfo;
    // キャラクターのステータス成長補正
    statusCorrection;
    // マップ区分出現率
    // 0:青, 1:黄, 2:赤, 3:濃赤, 4:無色
    typeRateList;
    // マップ倍率
    mapRateList;
    // 店強化設定
    shopInfoList;
    // 武器情報
    weaponsInfoList;
    // 一品物製造段階
    weaponProgress;

    // コンストラクタ
    constructor(){
        this.trainingInfo = new TrainingInfo();
        this.searchInfo = new SearchInfo();
        this.statusCorrection = new Status(1, 1, 1, 1, 1, 1);
        this.typeRateList = [15, 15, 15, 15, 40];
        this.mapRateList = [0.0, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 2.0];
        this.shopInfoList = {
            "空調": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000), new ShopInfo(1.0, 20000)
            ],
            "清掃用具": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000), new ShopInfo(1.0, 20000)
            ],
            "一品物陳列棚": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000), new ShopInfo(1.0, 20000)
            ],
            "置物": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000), new ShopInfo(1.0, 20000)
            ],
            "広告": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000), new ShopInfo(1.0, 20000)
            ],
            "イベントスペース": [
                new ShopInfo(0.1, 1000), new ShopInfo(0.2, 3000), new ShopInfo(0.4, 7000),
                new ShopInfo(0.7, 15000),new ShopInfo(1.0, 20000)
            ],
        };
        this.weaponsInfoList = {
            "刀剣": [
                new WeaponInfo(0.3, 500, [4, 0, 0], [1, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.25, 1000, [5, 0, 0], [1, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.2, 2000, [0, 6, 0], [0, 2, 0], [0, 2, 0]),
                new WeaponInfo(0.15, 3000, [0, 8, 0], [0, 2, 0], [0, 2, 0]),
                new WeaponInfo(0.1, 5000, [0, 0, 10], [0, 0, 3], [0, 0, 3]),
                new WeaponInfo(0.05, 10000, [0, 0, 12], [0, 0, 3], [0, 0, 3])
            ],
            "長柄": [
                new WeaponInfo(0.3, 500, [3, 0, 0], [4, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.25, 1000, [4, 0, 0], [5, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.2, 2000, [0, 5, 0], [0, 6, 0], [0, 2, 0]),
                new WeaponInfo(0.15, 3000, [0, 6, 0], [0, 8, 0], [0, 2, 0]),
                new WeaponInfo(0.1, 5000, [0, 0, 8], [0, 0, 10], [0, 0, 3]),
                new WeaponInfo(0.05, 10000, [0, 0, 10], [0, 0, 12], [0, 0, 3])
            ],
            "打撃": [
                new WeaponInfo(0.3, 500, [1, 0, 0], [3, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.25, 1000, [1, 0, 0], [4, 0, 0], [1, 0, 0]),
                new WeaponInfo(0.2, 2000, [0, 2, 0], [0, 5, 0], [0, 2, 0]),
                new WeaponInfo(0.15, 3000, [0, 2, 0], [0, 6, 0], [0, 2, 0]),
                new WeaponInfo(0.1, 5000, [0, 0, 3], [0, 0, 8], [0, 0, 3]),
                new WeaponInfo(0.05, 10000, [0, 0, 3], [0, 0, 10], [0, 0, 3])
            ],
            "射撃": [
                new WeaponInfo(0.3, 500, [1, 0, 0], [2, 0, 0], [2, 0, 0]),
                new WeaponInfo(0.25, 1000, [1, 0, 0], [3, 0, 0], [3, 0, 0]),
                new WeaponInfo(0.2, 2000, [0, 2, 0], [0, 3, 0], [0, 3, 0]),
                new WeaponInfo(0.15, 3000, [0, 2, 0], [0, 4, 0], [0, 4, 0]),
                new WeaponInfo(0.1, 5000, [0, 0, 3], [0, 0, 5], [0, 0, 5]),
                new WeaponInfo(0.05, 10000, [0, 0, 3], [0, 0, 7], [0, 0, 7])
            ],
            "魔法": [
                new WeaponInfo(0.3, 500, [1, 0, 0], [1, 0, 0], [2, 0, 0]),
                new WeaponInfo(0.25, 1000, [1, 0, 0], [1, 0, 0], [3, 0, 0]),
                new WeaponInfo(0.2, 2000, [0, 2, 0], [0, 2, 0], [0, 3, 0]),
                new WeaponInfo(0.15, 3000, [0, 2, 0], [0, 2, 0], [0, 4, 0]),
                new WeaponInfo(0.1, 5000, [0, 0, 3], [0, 0, 3], [0, 0, 5]),
                new WeaponInfo(0.05, 10000, [0, 0, 3], [0, 0, 3], [0, 0, 7])
            ]
        };
        this.weaponProgress = 10;
    }


}