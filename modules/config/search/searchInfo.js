import {Status} from "../common/status"
import {SearchMaterials} from "./searchMaterials"
import {Combo} from "../common/combo"

// 探索の設定内容を管理するクラス
export class SearchInfo{
    // 探索時に成長するステータス
    status;
    // 探索時に入手できる素材
    materials;
    // コンボ設定
    combo;

    // コンストラクタ
    constructor(){
        this.status = {
            "刀剣": new Status(0, 0, 0, 0, 0, 1),
            "長柄": new Status(0, 0, 0, 0, 0, 1),
            "打撃": new Status(0, 0, 0, 0, 0, 1),
            "射撃": new Status(0, 0, 0, 0, 0, 1),
            "魔法": new Status(0, 0, 0, 0, 0, 1)
        };

        this.materials = {
            "刀剣": [
                new SearchMaterials([5, 0, 0], [0, 0, 0], [0, 0, 0]),
                new SearchMaterials([10, 0, 0], [0, 0, 0], [0, 0, 0]),
                new SearchMaterials([15, 5, 0], [0, 0, 0], [0, 0, 0]),
                new SearchMaterials([20, 10, 0], [0, 0, 0], [0, 0, 0]),
                new SearchMaterials([25, 15, 5], [0, 0, 0], [0, 0, 0]),
                new SearchMaterials([30, 20, 10], [0, 0, 0], [0, 0, 0]),
            ],
            "長柄": [
                new SearchMaterials([0, 0, 0], [5, 0, 0], [0, 0, 0]),
                new SearchMaterials([0, 0, 0], [10, 0, 0], [0, 0, 0]),
                new SearchMaterials([0, 0, 0], [15, 5, 0], [0, 0, 0]),
                new SearchMaterials([0, 0, 0], [20, 10, 0], [0, 0, 0]),
                new SearchMaterials([0, 0, 0], [25, 15, 5], [0, 0, 0]),
                new SearchMaterials([0, 0, 0], [30, 20, 10], [0, 0, 0]),
            ],
            "打撃": [
                new SearchMaterials([1, 0, 0], [3, 0, 0], [0, 0, 0]),
                new SearchMaterials([3, 0, 0], [5, 0, 0], [2, 0, 0]),
                new SearchMaterials([4, 1, 0], [7, 3, 0], [4, 1, 0]),
                new SearchMaterials([5, 3, 0], [10, 5, 0], [5, 2, 0]),
                new SearchMaterials([6, 4, 1], [13, 7, 3], [6, 4, 1]),
                new SearchMaterials([8, 5, 3], [15, 10, 5], [7, 5, 2]),
            ],
            "射撃": [
                new SearchMaterials([0, 0, 0], [2, 0, 0], [3, 0, 0]),
                new SearchMaterials([0, 0, 0], [3, 0, 0], [7, 0, 0]),
                new SearchMaterials([0, 0, 0], [5, 2, 0], [10, 3, 0]),
                new SearchMaterials([0, 0, 0], [7, 3, 0], [13, 7, 0]),
                new SearchMaterials([0, 0, 0], [8, 5, 2], [17, 10, 3]),
                new SearchMaterials([0, 0, 0], [10, 7, 3], [20, 13, 7]),
            ],
            "魔法": [
                new SearchMaterials([1, 0, 0], [1, 0, 0], [3, 0, 0]),
                new SearchMaterials([3, 0, 0], [3, 0, 0], [5, 0, 0]),
                new SearchMaterials([4, 1, 0], [4, 1, 0], [7, 3, 0]),
                new SearchMaterials([5, 3, 0], [5, 3, 0], [10, 5, 0]),
                new SearchMaterials([6, 4, 1], [6, 4, 1], [13, 7, 3]),
                new SearchMaterials([8, 5, 3], [8, 5, 3], [15, 10, 5]),
            ],
        };
        this.combo = new Combo(0.3, 3);
    }


}