// マップの基本情報
export class MapInfo{
    // 倍率
    rate;
    // 区分
    eventType;
    // 現在地点かどうか
    isActive;

    // コンストラクタ
    constructor(rate, eventType){
        this.rate = rate;
        this.eventType = eventType;
        this.isActive = false;
    }

}