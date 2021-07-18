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
                :bulletList="bulletList"
                :condtionList="condtionList"
                @editCharacter="editCharacter"
                @editWeapon="editWeapon"
                @editCondtionConfig="editCondtionConfig"
                @editBaseConfig="editBaseConfig"
                @editBulletConfig="editBulletConfig"
            />
        </v-row>
    </div>
</template>

<script>
import {BattleStatus} from '~/modules/battle/battleStatus.js';
import {BattleLog} from '~/modules/battle/battleLog.js';
import {WeaponConfig} from '~/modules/battle/weaponConfig.js';
import {BattleBaseConfig} from '~/modules/battle/batteleBaseConfig.js';
import {Condition} from '~/modules/battle/condition.js';
import {Bullet} from '~/modules/battle/bullet.js';
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
            condtionList: {"デフォルト": new Condition()},
            bulletList: {"デフォルト": new Bullet()},
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
            // 数値型に修正
            myWeapon = this.weaponConf2Num(myWeapon);
            enemyWeapon = this.weaponConf2Num(enemyWeapon);
            let myBuletts = (myWeapon.bullet == null)? null: myWeapon.bullet.concat();
            let enemyBullets = (enemyWeapon.bullet == null)? null: enemyWeapon.bullet.concat();
            
            // 自分と敵のステータスを取得
            let myStatus = this.sumStatus(this.statusList[this.selectMy].status, myWeapon.status.status);
            let enemyStatus = this.sumStatus(this.statusList[this.selectEnemy].status, enemyWeapon.status.status);

            // 状態を定義
            // グローバル情報
            let turn = 0;

            // 自分
            let myLeftHp = myStatus["MAX-HP"];
            let myActionValue = 0;
            let myMysteryValue = 0;
            let myMystery = Number(this.battleConf.mystery[this.selectMyWeaponType]) + myWeapon.mystery;
            let mySpd = 50;
            let myCH = myStatus["DEX"] / enemyStatus["INT"] * (myWeapon.ch + Number(this.battleConf.ch));
            let myMysRise = this.selectMyWeaponType=="魔法" ?
                Math.floor(myStatus["INT"] / enemyStatus["INT"] * (myWeapon.mysteryRise + 30))
                : Math.floor(myStatus["DEX"] / enemyStatus["DEX"] * (myWeapon.mysteryRise + 10));
            let myPreSpd = 50;

            // 敵
            let enemyLeftHp = enemyStatus["MAX-HP"];
            let enemyActionValue = 0;
            let enemyMysteryValue = 0;
            let enemyMystery = Number(this.battleConf.mystery[this.selectMyWeaponType]) + enemyWeapon.mystery;
            let enemySpd = 50;
            let enemyCH = enemyStatus["DEX"] / myStatus["INT"] * (enemyWeapon.ch + Number(this.battleConf.ch));
            let enemyMysRise = this.selectEnemyWeaponType=="魔法" ?
                Math.floor(enemyStatus["INT"] / myStatus["INT"] * (enemyWeapon.mysteryRise + 30))
                : Math.floor(enemyStatus["DEX"] / myStatus["DEX"] * (enemyWeapon.mysteryRise + 10));
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
            let myStr = this.selectMyWeaponType=="魔法"? myStatus["INT"]: myStatus["STR"];
            let enemyStr = this.selectEnemyWeaponType=="魔法"? enemyStatus["INT"]: enemyStatus["STR"];

            // 自分
            let m = {
                "AV": myActionValue,
                "PSPD": myPreSpd,
                "MV": myMysteryValue,
                "W": myWeapon,
                "WT": this.selectMyWeaponType,
                "M": myMystery,
                "MR": myMysRise,
                "CH": myCH,
                "WA": myWeapon.attack,
                "STR": myStr,
                "PRE": myStatus["PRE"],
                "DEF": myStatus["DEF"],
                "STATUS": myStatus,
                "SPD": mySpd,
                "HP": myLeftHp,
                "C": [],
                "B": myBuletts
            };
            // 敵
            let e = {
                "AV": enemyActionValue,
                "PSPD": enemyPreSpd,
                "MV": enemyMysteryValue,
                "W": enemyWeapon,
                "WT": this.selectEnemyWeaponType,
                "M": enemyMystery,
                "MR": enemyMysRise,
                "CH": enemyCH,
                "WA": enemyWeapon.attack,
                "STR": enemyStr,
                "PRE": enemyStatus["PRE"],
                "DEF": enemyStatus["DEF"],
                "STATUS": enemyStatus,
                "SPD": enemySpd,
                "HP": enemyLeftHp,
                "C": [],
                "B": enemyBullets
            };
            
            // どちらかのHPが0になるまで無限ループ
            while(m["HP"] > 0 && e["HP"] > 0){
                // ターン開始状態の状態管理
                if((m["C"].length>0) || (e["C"].length>0)){
                    let myLog = "自分の状態：";
                    let enemyLog = "敵の状態：";
                    for(let i=0; i<m["C"].length; i++){
                        myLog += "[ " + m["C"][i]["name"] + " ]";
                    }
                    for(let i=0; i<e["C"].length; i++){
                        enemyLog += "[ " + e["C"][i]["name"] + " ]";
                    }
                    this.battleLogs.push(new BattleLog(turn, m["HP"], m["AV"], m["MV"], e["HP"], e["AV"], e["MV"], [myLog, enemyLog]));
                }

                // 主人公側の行動処理
                let logMsg = "";
                [m, e, preFlg, logMsg] = this.judgePreNomal(m, e, preFlg, true);
                // ログ出力
                this.battleLogs.push(new BattleLog(turn, m["HP"], m["AV"], m["MV"], e["HP"], e["AV"], e["MV"], logMsg));

                if(e["HP"] <= 0){
                    break;
                }
                // 敵側の行動処理
                [e, m, preFlg, logMsg] = this.judgePreNomal(e, m, preFlg, false);
                // ログ出力
                this.battleLogs.push(new BattleLog(turn, m["HP"], m["AV"], m["MV"], e["HP"], e["AV"], e["MV"], logMsg));

                turn++;
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
        calcDamage: function(str, def, ch, weapon, pre, bullet=""){
            // クリティカルダメージの算出
            let chDmg = 1;
            if(ch > 1) {
                chDmg += ch;
            }else if(Math.random() < ch){
                chDmg = 2;
            }
            // 弾が指定されている場合情報の取得
            let bulletRate = (bullet=="")? 1: this.bulletList[bullet].attackRate;
            let bulletVal = (bullet=="")? 0: this.bulletList[bullet].fixedDmg;

            // 攻撃力に弾のダメージ倍率を乗算
            str *= bulletRate;

            // ダメージの乱数値
            let dmgRnd = Math.floor(Math.random() * Number(this.battleConf.attackRand) * 100) / 100 * str
            
            // ダメージを計算
            let dmg = (str + pre > def) ? str + pre - def: 0; 
            dmg = (dmg + dmgRnd + Number(this.battleConf.attack)) * weapon * chDmg + bulletVal;

            return Math.floor(dmg);
        },
        calcMystery: function(str, mystery, def, bullet=""){
            // 弾が指定されている場合情報の取得
            let bulletRate = (bullet=="")? 1: this.bulletList[bullet].attackRate;
            let bulletVal = (bullet=="")? 0: this.bulletList[bullet].fixedDmg;
            
            // 攻撃力に弾のダメージ倍率を乗算
            str *= bulletRate;

            // 奥義ダメージの計算
            let dmgRnd = Math.floor(Math.random() * Number(this.battleConf.mysteryRand) * 100) / 100 * str;
            let dmg = Math.floor((str + dmgRnd) * mystery - def / 5) + bulletVal;
            return dmg>0? dmg: 0;
        },
        judgeConditionTurn: function(m, myFlg, target){
            let logMsgList = [];
            let me = target? "自分": "敵";
            me += "の状態：";
            for(let i=0; i<m["C"].length; i++){
                if(m["C"][i]["myFlg"] == myFlg){
                    m["C"][i]["turn"]--;
                    if(
                        (this.condtionList[m["C"][i]["name"]].statusRate["HP"]!=0) ||
                        (this.condtionList[m["C"][i]["name"]].statusValue["HP"]!=0))
                    {
                        // HP変化の状態が付与されている場合はここで清算
                        let dmg = m["STATUS"]["MAX-HP"] * Number(this.condtionList[m["C"][i]["name"]].statusRate["HP"]);
                        dmg -= Number(this.condtionList[m["C"][i]["name"]].statusValue["HP"]);
                        logMsgList.push(me + m["C"][i]["name"] + " の効果で " + dmg + "ダメージ");
                        m["HP"] -= dmg;
                    }
                    if(m["C"][i]["turn"] == 0){
                        logMsgList.push(me + m["C"][i]["name"] + " が解除された");
                        m["C"].splice(i, 1);
                        i--;
                    }
                }
            }
            return [m, logMsgList];
        },
        judgePreNomal: function(m, e, preFlg, myFlg){
            // 状態が付与されている場合、ターンを経過させる
            let logMsgList = [];
            let actionLog = [];

            // 射撃だけ別処理にするため、処理対象の武器種を取得
            if(m["WT"] == "射撃"){
                // 装填している弾がない場合はリロード、ある場合は攻撃を実施
                if(m["B"].length == 0){
                    let targetWeapon = myFlg? this.selectMyWeapon: this.selectEnemyWeapon;
                    let bullets = this.weaponList["射撃"][targetWeapon].bullet.concat();
                    m["B"] = bullets;
                    let logMsg = myFlg? "自分": "敵";
                    logMsg += " のターン 残弾数0のためリロード！"
                    logMsgList.push(logMsg);
                }else{
                    [m, e, actionLog, preFlg, myFlg] = this.excuteBulletAction(m, e, preFlg, myFlg);
                }
            }else{
                [m, e, actionLog, preFlg] = this.excuteAction(m, e, preFlg, myFlg);
            }
            
            return [m, e, preFlg, logMsgList.concat(actionLog)];
        },
        excuteAction: function(m, e, preFlg, myFlg){
            m["AV"] += m["SPD"];

            let pre = preFlg? m["PRE"]: 0;
            let logMsgList = [];
            let logMsg = "";
            let me = myFlg ? "自分": "敵"
            let enemy = myFlg ? "敵": "自分"
            let preLogMsg = me + " の攻撃 " + enemy + " に ";
            let sufLogMsg = " のダメージ！";
            // 行動値ゲージが100になったら攻撃行動を実施する
            if(m["AV"] >= 100){
                preFlg = false;
                m["AV"] -= 100;
                let dmg = 0;
                // 奥義ゲージが100以上なら奥義を発動し、そうでないなら通常攻撃
                if(m["MV"] >= 100){
                    m["MV"] -= 100;
                    dmg = this.calcMystery(m["STR"], m["M"], e["DEF"]);
                    logMsg = "奥義発動！！ "
                }else{
                    if("魔法" == m["WT"]){
                        // 魔法の場合は通常攻撃無
                    }else if("打撃" == m["WT"]){
                        // 打撃武器の場合は連続攻撃の判定を実施
                        let commboNum = 1;
                        for(let i=1; i>=0; i--){
                            if(Math.random() < Number(this.battleConf.comboRate[i])){
                                commboNum = i+2;
                                break;
                            }
                        }
                        logMsg = commboNum==1? "": String(commboNum) + "Hit！"
                        for(let i=0; i< commboNum; i++){
                            dmg += this.calcDamage(m["STR"], e["DEF"], m["CH"], m["WA"], pre);
                        }
                    }else{
                        dmg = this.calcDamage(m["STR"], e["DEF"], m["CH"], m["WA"], pre);
                    }
                    m["MV"] += m["MR"];
                }
                logMsg += (0==dmg) ? "": preLogMsg + String(dmg) + sufLogMsg;
                logMsgList.push(logMsg);
                e["HP"] -= dmg;
                if(e["HP"] <= 0) {
                    let winLogMsg = " " + me + " の勝利！！";
                    logMsgList.push(winLogMsg);
                }
            }
            return [m, e, logMsgList, preFlg];
        },
        excuteBulletAction: function(m, e, preFlg, myFlg){
            let mylogs =[], enemyLogs = [];
            let logMsg = "";
            m["AV"] += m["SPD"];

            // 状態の解除判定
            [m, mylogs] = this.judgeConditionTurn(m, myFlg, myFlg);
            [e, enemyLogs] = this.judgeConditionTurn(e, myFlg, !myFlg);
            let logMsgList = mylogs.concat(enemyLogs);
            // 状態を考慮してステータスを再計算
            [m, e] = this.getCharaStatus(m, e);


            let me = myFlg ? "自分": "敵"
            let enemy = myFlg ? "敵": "自分"
            let preLogMsg = me + " の攻撃 " + enemy + " に ";
            let sufLogMsg = " のダメージ！";
            // 敵のHP判定
            if(e["HP"] <= 0) {
                let winLogMsg = " " + me + " の勝利！！"
                logMsgList.push(winLogMsg);
                return [m, e, logMsgList, preFlg, myFlg];
            }
            
            // 行動値ゲージが100になったら攻撃行動を実施する
            if(m["AV"] >= 100){
                m["AV"] -= 100;
                let pre = preFlg? m["PRE"]: 0;
                preFlg = false;
                let bullet = m["B"][0];
                m["B"].splice(0, 1);
                // 状態を判定して付与
                let conditions = this.bulletList[bullet].grantCondition;
                for(let i=0; i<conditions.length; i++){
                    let condtion = this.condtionList[conditions[i]];
                    let randNum = Math.random();
                    if(condtion.rate > randNum){
                        if(condtion.target){
                            let tmpLogMsg = me + "に[ " + conditions[i] + " ]を付与";
                            logMsgList.push(tmpLogMsg);
                            m["C"].push({
                                "name": conditions[i],
                                "turn":condtion.turn,
                                "myFlg": myFlg
                            });
                        }else{
                            let tmplogMsg = enemy + "に[" + conditions[i] + "]を付与";
                            logMsgList.push(tmplogMsg);
                            e["C"].push({
                                "name": conditions[i],
                                "turn":condtion.turn,
                                "myFlg": myFlg
                            });
                        }
                    }
                }
                if(conditions.length != 0){
                    // 状態が新たに付与された場合は、ステータスを再計算する
                    [m, e] = this.getCharaStatus(m, e);
                }
                let dmg = 0;
                // 奥義ゲージが100以上なら奥義を発動し、そうでないなら通常攻撃
                if(this.bulletList[bullet].mysteryFlg){
                    dmg = this.calcMystery(m["STR"], m["M"], e["DEF"], bullet);
                    logMsg += "奥義弾 " + bullet + "！！ ";
                }else{
                    logMsg += "通常弾 " + bullet + " ";
                    dmg = this.calcDamage(m["STR"], e["DEF"], m["CH"], m["WA"], pre, bullet);
                }
                logMsg += (0==dmg) ? "": preLogMsg + String(dmg) + sufLogMsg;
                logMsgList.push(logMsg);
                e["HP"] -= dmg;
                if(e["HP"] <= 0) {
                    let winLogMsg = " " + me + " の勝利！！"
                    logMsgList.push(winLogMsg);
                }
            }
            return [m, e, logMsgList, preFlg, myFlg];
        },
        getCharaStatus: function(m, e){
            // 状態が何も付与されていない場合そのまま返却
            if((m["C"].length == 0) && (e["C"].length == 0)){
                return [m, e];
            }

            let mRate = this.makeConditionStatus(1);
            let eRate = this.makeConditionStatus(1);
            let mValue = this.makeConditionStatus(0);
            let eValue = this.makeConditionStatus(0);
            let statusKeys = ["HP", "STR", "DEX", "DEF", "INT", "PRE", "SPD"];
            // 付与されている状態によるステータス変化の合計を計算
            for(let i=0; i<m["C"].length; i++){
                statusKeys.forEach(key =>{
                    mRate[key] += Number(this.condtionList[m["C"][i]["name"]].statusRate[key]);
                    mValue[key] += Number(this.condtionList[m["C"][i]["name"]].statusValue[key]);
                });
            }
            for(let i=0; i<e["C"].length; i++){
                statusKeys.forEach(key =>{
                    eRate[key] += Number(this.condtionList[e["C"][i]["name"]].statusRate[key]);
                    eValue[key] += Number(this.condtionList[e["C"][i]["name"]].statusValue[key]);
                });
            }
            // 行動値をリセット
            if(m["STATUS"]["SPD"] > e["STATUS"]["SPD"]){
                m["SPD"] = 50;
                e["SPD"] = Math.floor(50 * e["STATUS"]["SPD"] / m["STATUS"]["SPD"]);
            }else {
                e["SPD"] = 50;
                m["SPD"] = Math.floor(50 * m["STATUS"]["SPD"] / e["STATUS"]["SPD"]);
            }

            let mDex = m["STATUS"]["DEX"] * mRate["DEX"] + mValue["DEX"];
            let mInt = m["STATUS"]["INT"] * mRate["INT"] + mValue["INT"];
            let eDex = e["STATUS"]["DEX"] * eRate["DEX"] + eValue["DEX"];
            let eInt = e["STATUS"]["INT"] * eRate["INT"] + eValue["INT"];
            
            // 状態を考慮したステータスを再計算
            m = this.calcNowStatus(m, mRate, mValue, mDex, mInt, eDex, eInt);
            e = this.calcNowStatus(e, eRate, eValue, eDex, eInt, mDex, mInt);

            return [m, e];
        },
        makeConditionStatus: function(num){
            return {
                "HP": num,
                "STR": num,
                "DEX": num,
                "DEF": num,
                "INT": num,
                "PRE": num,
                "SPD": num
            };
        },
        calcNowStatus: function(m, mRate, mValue, mDex, mInt, eDex, eInt){

            let mStr = m["STATUS"]["STR"] * mRate["STR"] + mValue["STR"];

            m["CH"] = mDex / eInt * (m["W"].ch + Number(this.battleConf.ch));
            m["MR"] = (m["WT"]=="魔法") ?
                Math.floor(mInt / eInt * (m["W"].mysteryRise + 30))
                : Math.floor(mDex / eDex * (m["W"].mysteryRise + 10));
            m["STR"] = (m["WT"]=="魔法")? mInt: mStr;
            m["DEF"] = m["STATUS"]["DEF"] * mRate["DEF"] + mValue["DEF"];
            m["PRE"] = m["STATUS"]["PRE"] * mRate["PRE"] + mValue["PRE"];
            
            // SPDはステータスではなく、行動値に効果するものとする
            m["SPD"] = m["SPD"] * mRate["SPD"] + mValue["SPD"];

            return m;
        },
        editCharacter: function(editInfo){
            // CRUDに合わせて処理を分岐
            if((editInfo["crud"] == "cu")){
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
        editCondtionConfig: function(editInfo){
            // CRUDに合わせて処理を分岐
            if((editInfo["crud"] == "cu")){
                // 新規・更新
                this.$set(this.condtionList, editInfo["key"], editInfo["value"]);
            }else if(editInfo["crud"]== "d"){
                // 削除
                delete this.condtionList[editInfo["key"]];
            }
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.condtionList);
            localStorage.setItem("battle-condtion", saveJson);
        },
        editBulletConfig: function(editInfo){
            // CRUDに合わせて処理を分岐
            if((editInfo["crud"] == "cu")){
                // 新規・更新
                this.$set(this.bulletList, editInfo["key"], editInfo["value"]);
            }else if(editInfo["crud"]== "d"){
                // 削除
                delete this.bulletList[editInfo["key"]];
            }
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.bulletList);
            localStorage.setItem("battle-bullet", saveJson);
        },
        editBaseConfig: function(editInfo){
            this.battleConf = editInfo;
            // ローカルストレージに保存
            let saveJson = JSON.stringify(this.battleConf);
            localStorage.setItem("battle-conf", saveJson);
        },
        weaponConf2Num: function(weapon){
            weapon.ch = Number(weapon.ch);
            weapon.mystery = Number(weapon.mystery);
            weapon.mysteryRise = Number(weapon.mysteryRise);
            weapon.attack = Number(weapon.attack);
            return weapon;
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

        // バトル全般設定
        this.battleConf = JSON.parse(localStorage.getItem("battle-conf"));
        if(this.battleConf == null) {
            this.battleConf = new BattleBaseConfig();
        }

        // バフデバフなどの状態設定
        this.condtionList = JSON.parse(localStorage.getItem("battle-condtion"));
        if(this.condtionList == null) {
            this.condtionList = {
                "デフォルト": new Condition()
            };
        }

        // 弾設定
        this.bulletList = JSON.parse(localStorage.getItem("battle-bullet"));
        if(this.bulletList == null) {
            this.bulletList = {
                "デフォルト": new Bullet()
            };
        }

    },
}
</script>
<style>

</style>