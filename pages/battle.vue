<template>
    <div>
        <v-row dense>
            <v-col cols="1.5">
                <v-row dense>
                    <v-col>
                        自ステータス
                        <v-select
                            v-model="selectMy"
                            :items="Object.keys(statusList)"
                            label="ステータス"
                        />
                        <v-select
                            v-model="selectMyWeaponType"
                            :items="weaponNames"
                            label="武器種"
                            @change="clearWeapon(true)"
                        />
                        <v-select
                            v-model="selectMyWeapon"
                            :items="Object.keys(weaponList[selectMyWeaponType])"
                            label="武器"
                        />
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col>
                        敵ステータス
                        <v-select
                            v-model="selectEnemy"
                            :items="Object.keys(statusList)"
                            label="ステータス"
                        />
                        <v-select
                            v-model="selectEnemyWeaponType"
                            :items="weaponNames"
                            label="武器種"
                            @change="clearWeapon(false)"
                        />
                        <v-select
                            v-model="selectEnemyWeapon"
                            :items="Object.keys(weaponList[selectEnemyWeaponType])"
                            label="武器"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="1.5">
                <v-row dense>
                    <v-col>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th width="20%"></th>
                                    <th width="40%">自分</th>
                                    <th width="40%">敵</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in statusKeys" :key="item">
                                    <td>
                                        <v-icon>{{statusIcons[index]}}</v-icon><br>
                                        {{item}}
                                    </td>
                                    <td v-if="selectMyWeapon!=null">
                                        {{Number(statusList[selectMy].status[item])
                                        + Number(weaponList[selectMyWeaponType][selectMyWeapon].status.status[item])}}<br>
                                        (+{{weaponList[selectMyWeaponType][selectMyWeapon].status.status[item]}})
                                    </td>
                                    <td v-else>
                                        {{statusList[selectMy].status[item]}}</td>
                                    <td v-if="selectEnemyWeapon!=null">
                                        {{Number(statusList[selectEnemy].status[item])
                                        + Number(weaponList[selectEnemyWeaponType][selectEnemyWeapon].status.status[item])}}<br>
                                        (+{{weaponList[selectEnemyWeaponType][selectEnemyWeapon].status.status[item]}})
                                    </td>
                                    <td v-else>{{statusList[selectEnemy].status[item]}}</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-col>
                        <v-btn :disabled="isPlay()" v-on:click="playBattle()">
                            戦闘開始
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="9">
                <battle-log-vue :battleLogs="battleLogs"/>
            </v-col>
        </v-row>
        <v-row dense>
            <battle-config-tab
                :statusList="statusList"
                :weaponList="weaponList"
                :battleConf="battleConf"
                @editCharacter="editCharacter"
                @editWeapon="editWeapon"
                @editBaseConfig="editBaseConfig"
            />
        </v-row>
    </div>
</template>

<script>
import {BattleStatus} from '~/modules/battle/battleStatus.js';
import {BattleLog} from '~/modules/battle/battleLog.js';
import {WeaponConfig} from '~/modules/battle/weaponConfig.js'
import {BattleBaseConfig} from '~/modules/battle/batteleBaseConfig.js'
import BattleLogVue from '../components/battle/BattleLogVue.vue';
import BattleConfigTab from '../components/battle/BattleConfigTab.vue';
export default {
    components: {
        BattleLogVue,
        BattleConfigTab,
    },
    data(){
        return{
            statusKeys: ["STR", "DEX", "DEF", "INT", "PRE", "SPD", "MAX-HP"],
            statusIcons: [
                "mdi-sword", "mdi-hand", "mdi-shield", "mdi-doctor",
                "mdi-numeric-1-circle-outline", "mdi-run-fast", "mdi-heart"
            ],
            weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"], 
            statusList: {
                "デフォルト": new BattleStatus(100, 100, 100, 100, 100, 100, 100)
            },
            selectMy: "デフォルト",
            selectEnemy: "デフォルト",
            selectMyWeaponType: "刀剣",
            selectEnemyWeaponType: "刀剣",
            selectMyWeapon: null,
            selectEnemyWeapon: null,
            battleLogs: [],
            weaponList: {
                "刀剣": {"デフォルト": new WeaponConfig()},
                "長柄": {"デフォルト": new WeaponConfig()},
                "打撃": {"デフォルト": new WeaponConfig()},
                "射撃": {"デフォルト": new WeaponConfig()},
                "魔法": {"デフォルト": new WeaponConfig()},
            },
            battleConf: new BattleBaseConfig(),
        }
    },
    props: {
    },
    methods:{
        saveStaus: function(){
        // コンフィグ情報をローカルストレージに保存
        //   let saveJson = JSON.stringify(this.configInfo);
        //   localStorage.setItem("config-info", saveJson);
        },
        clearWeapon: function(isMine){
            // 武器種が変更された場合に選択中の武器をリセット
            if(isMine){
                this.selectMyWeapon = null;
            }else{
                this.selectEnemyWeapon = null;
            }
        },
        isPlay: function() {
            // 自分・敵ともに武器が選択されているか判定
            return (this.selectMyWeapon == null) || (this.selectEnemyWeapon == null);
        },
        playBattle: function(){
            // ログを初期化
            this.battleLogs = [];

            // 自分と敵の装備した武器を取得
            let myWeapon = this.weaponList[this.selectMyWeaponType][this.selectMyWeapon];
            let enemyWeapon = this.weaponList[this.selectEnemyWeaponType][this.selectEnemyWeapon];

            // 自分と敵のステータスを取得
            let myStatus = this.sumStatus(this.statusList[this.selectMy].status, myWeapon.status.status);
            let enemyStatus = this.sumStatus(this.statusList[this.selectEnemy].status, enemyWeapon.status.status);

            // 状態を定義
            // グローバル情報
            let tarn = 0;
            console.log(myStatus);

            // 自分
            let myLeftHp = myStatus["MAX-HP"];
            let myActionValue = 0;
            let myMysteryValue = 0;
            let myMystery = this.battleConf.mystery[this.selectMyWeaponType] + myWeapon.mystery;
            let mySpd = 50;
            let myCH = myStatus["DEX"] / enemyStatus["INT"] * (myWeapon.ch + this.battleConf.ch);
            let myMysRise = Math.floor(myStatus["DEX"] / enemyStatus["DEX"] * (myWeapon.mysteryRise + 10));
            let myPreSpd = 50;

            // 敵
            let enemyLeftHp = enemyStatus["MAX-HP"];
            let enemyActionValue = 0;
            let enemyMysteryValue = 0;
            let enemyMystery = this.battleConf.mystery[this.selectMyWeaponType] + enemyWeapon.mystery;
            let enemySpd = 50;
            let enemyCH = enemyStatus["DEX"] / myStatus["INT"] * (enemyWeapon.ch + this.battleConf.ch);
            let enemyMysRise = Math.floor(enemyStatus["DEX"] / myStatus["DEX"] * (enemyWeapon.mysteryRise + 10));
            let enemyPreSpd = 50;

            // 行動値を計算
            if(myStatus["SPD"] > enemyStatus["SPD"]){
                enemySpd = Math.floor(50 * enemyStatus["SPD"] / myStatus["SPD"]);
            }else {
                mySpd = Math.floor(50 * myStatus["SPD"] / enemyStatus["SPD"]);
            }
            if(myStatus["PRE"] > enemyStatus["PRE"]){
                enemyPreSpd = Math.floor(50 * enemyStatus["PRE"] / myStatus["PRE"]);
            }else {
                myPreSpd = Math.floor(50 * myStatus["PRE"] / enemyStatus["PRE"]);
            }
            let preFlg = true;
            // どちらかのHPが0になるまで無限ループ
            while(myLeftHp > 0 && enemyLeftHp > 0){
                // どちらかが初撃を与えるまではPREで行動
                // 主人公側の行動処理
                let logMsg = "";
                if(preFlg){                    
                    [myActionValue, myMysteryValue, enemyLeftHp, logMsg, preFlg] = this.excuteAction(
                        myActionValue, myPreSpd, myMysteryValue, myStatus["STR"], enemyStatus["DEF"],
                        myMystery, myMysRise, myCH, myWeapon.attack, myStatus["PRE"], preFlg, enemyLeftHp, true
                    );
                }else{
                    [myActionValue, myMysteryValue, enemyLeftHp, logMsg, preFlg] = this.excuteAction(
                        myActionValue, mySpd, myMysteryValue, myStatus["STR"], enemyStatus["DEF"],
                        myMystery, myMysRise, myCH, myWeapon.attack, 0, preFlg, enemyLeftHp, true
                    );
                }
                // ログ出力
                let battleLog = new BattleLog(tarn, myLeftHp, myActionValue, myMysteryValue, enemyLeftHp, enemyActionValue, enemyMysteryValue, logMsg);
                this.battleLogs.push(battleLog);

                if(enemyLeftHp <= 0){
                    break;
                }
                // 敵側の行動処理
                logMsg = "";
                if(preFlg){
                    [enemyActionValue, enemyMysteryValue, myLeftHp, logMsg, preFlg] = this.excuteAction(
                        enemyActionValue, enemyPreSpd, enemyMysteryValue, enemyStatus["STR"], myStatus["DEF"],
                        enemyMystery, enemyMysRise, enemyCH, enemyWeapon.attack, enemyStatus["PRE"], preFlg, myLeftHp, false
                    );
                }else{
                    [enemyActionValue, enemyMysteryValue, myLeftHp, logMsg, preFlg] = this.excuteAction(
                        enemyActionValue, enemySpd, enemyMysteryValue, enemyStatus["STR"], myStatus["DEF"],
                        enemyMystery, enemyMysRise, enemyCH, enemyWeapon.attack, 0, preFlg, myLeftHp, false
                    );
                }
                // ログ出力
                battleLog = new BattleLog(tarn, myLeftHp, myActionValue, myMysteryValue, enemyLeftHp, enemyActionValue, enemyMysteryValue, logMsg);
                this.battleLogs.push(battleLog);

                tarn++;
            }

        },
        sumStatus: function(base, weapon){
            // 基礎ステータスと武器ステータスを合計したステータスを返却する
            return {
                "STR": Number(base["STR"]) + Number(weapon["STR"]),
                "DEX": Number(base["DEX"]) + Number(weapon["DEX"]),
                "DEF": Number(base["DEF"]) + Number(weapon["DEF"]),
                "INT": Number(base["INT"]) + Number(weapon["INT"]),
                "PRE": Number(base["PRE"]) + Number(weapon["PRE"]),
                "SPD": Number(base["SPD"]) + Number(weapon["SPD"]),
                "MAX-HP": Number(base["MAX-HP"]) + Number(weapon["MAX-HP"])
            };
        },
        calcDamage: function(str, def, ch, weapon, pre){
            // クリティカルダメージの算出
            let chDmg = 1;
            if(ch > 1) {
                chDmg += ch;
            }else if(Math.random() < ch){
                chDmg = 2;
            }

            // ダメージの乱数値
            let dmgRnd = Math.floor(Math.random() * this.battleConf.attackRand * 100) / 100 * str

            // ダメージを計算
            let dmg = (str + pre > def) ? str + pre - def: 0; 
            dmg = (dmg + dmgRnd + this.battleConf.attack) * weapon * chDmg;

            return Math.floor(dmg);
        },
        calcMystery: function(str, mystery, def){
            // 奥義ダメージの計算
            let dmgRnd = Math.floor(Math.random() * this.battleConf.mysteryRand * 100) / 100 * str;
            
            return Math.floor((str + dmgRnd) * mystery   - def / 5);
        },
        excuteAction: function(actionValue, spd, mysteryValue, myStr, enemyDef, mystery, mysteryRise, ch, weapon, pre, preFlg, leftHp, myFlg){
            actionValue += spd;
            let logMsg = "";
            let me = myFlg ? "自分": "敵"
            let enemy = myFlg ? "敵": "自分"

            // 行動値ゲージが100になったら攻撃行動を実施する
            if(actionValue >= 100){
                preFlg = false;
                actionValue -= 100;
                let dmg = 0;
                // 奥義ゲージが100以上なら奥義を発動し、そうでないなら通常攻撃
                if(mysteryValue >= 100){
                    mysteryValue -= 100;
                    dmg = this.calcMystery(myStr, mystery, enemyDef);
                    logMsg = "奥義発動！！ "
                }else{
                    mysteryValue += mysteryRise;
                    dmg = this.calcDamage(myStr, enemyDef, ch, weapon, pre);
                }
                logMsg += me + " の攻撃 " + enemy + " に " + String(dmg) + " のダメージ！";
                leftHp -= dmg;
                if(leftHp <= 0) {
                    logMsg += " " + me + " の勝利！！"
                }
            }
            return [actionValue, mysteryValue, leftHp, logMsg, preFlg];
        },
        editCharacter: function(editInfo){
            // CRUDに合わせて処理を分岐
            if((editInfo["crud"] == "cu")){
                console.log(editInfo["value"]);
                // 新規・更新
                this.$set(this.statusList, editInfo["key"], editInfo["value"]);
            }else if(editInfo["crud"]== "d"){
                // 削除
                // 削除対象が選択されている場合は別のものを選択する
                let keyList = this.statusList;
                delete keyList[editInfo["key"]];
                let firstKey = Object.keys(keyList)[0];
                if(this.selectMy == editInfo["key"]){
                    this.selectMy = firstKey;
                }
                if(this.selectEnemy == editInfo["key"]){
                    this.selectEnemy = firstKey;
                }
                // 削除する
                delete this.statusList[editInfo["key"]];
            }
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.statusList);
            localStorage.setItem("status-list", saveJson);
        },
        editWeapon: function(editInfo){
            // CRUDに合わせて処理を分岐
            if((editInfo["crud"] == "cu")){
                console.log(editInfo["value"]);
                // 新規・更新
                this.$set(this.weaponList[editInfo["weapon"]], editInfo["key"], editInfo["value"]);
            }else if(editInfo["crud"]== "d"){
                // 削除
                // 削除対象が選択されている場合は選択を解除する
                if((this.selectMyWeaponType == editInfo["weapon"])
                    && (this.selectEnemyWeapon == editInfo["key"])){
                    this.selectMyWeapon = null;
                }
                if((this.selectEnemyWeaponType == editInfo["weapon"])
                    && (this.selectEnemyWeapon == editInfo["key"])){
                    this.selectEnemyWeapon = null;
                }
                // 削除する
                delete this.weaponList[editInfo["weapon"]][editInfo["key"]];
            }
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.weaponList);
            localStorage.setItem("weapon-list", saveJson);
        },
        editBaseConfig: function(editInfo){
            this.battleConf = editInfo;
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.battleConf);
            localStorage.setItem("battle-conf", saveJson);
        }
    },
    mounted(){
        // ローカルストレージから設定情報を読み取る
        // ローカルストレージにない場合はデフォルトの設定として新規インスタンスを生成
        
        // キャラクターステータス
        this.statusList = JSON.parse(localStorage.getItem("status-list"));
        if (this.statusList == null){
            this.statusList = {
                "デフォルト": new BattleStatus(100, 100, 100, 100, 100, 100, 1000),
                "デフォルト2": new BattleStatus(80, 140, 110, 50, 60, 90, 1200)
            };
        }
        let firstKey = Object.keys(this.statusList)[0];
        this.selectMy = firstKey;
        this.selectEnemy = firstKey;

        // 武器ステータス
        this.weaponList = JSON.parse(localStorage.getItem("weapon-list"));
        if(this.weaponList == null) {
            this.weaponList = {
                "刀剣": {"デフォルト": new WeaponConfig()},
                "長柄": {"デフォルト": new WeaponConfig()},
                "打撃": {"デフォルト": new WeaponConfig()},
                "射撃": {"デフォルト": new WeaponConfig()},
                "魔法": {"デフォルト": new WeaponConfig()},
            };
        }

        this.battleConf = JSON.parse(localStorage.getItem("battle-conf"));
        if(this.battleConf == null) {
            this.battleConf = new BattleBaseConfig();
        }

    },
}
</script>
<style>

</style>