import {Status} from "../common/status"
import {Combo} from "../common/combo"

// 訓練の設定内容を管理するクラス
export class TrainingInfo{
    // 訓練時に成長するステータス
    status;

    // 訓練時に成長するステータスの乱数補正最大値
    statusCorrection;

    // コンボ設定
    combo;

    // コンストラクタ
    constructor(){
        this.status = {
            "刀剣": new Status(5, 1, 1, 1, 1, 1),
            "長柄": new Status(1, 5, 1, 1, 1, 1),
            "打撃": new Status(1, 1, 5, 1, 1, 1),
            "射撃": new Status(1, 1, 1, 5, 1, 1),
            "魔法": new Status(1, 1, 1, 1, 5, 1)
        };

        this.statusCorrection = {
            "刀剣": new Status(3, 0, 0, 0, 0, 0),
            "長柄": new Status(0, 3, 0, 0, 0, 0),
            "打撃": new Status(0, 0, 3, 0, 0, 0),
            "射撃": new Status(0, 0, 0, 3, 0, 0),
            "魔法": new Status(0, 0, 0, 0, 3, 0)
        };

        this.combo = new Combo(0.2, 3);
    }


}