<template>
    <v-data-table
        :headers="headers"
        :items="conditions"
        dense
        :footer-props="{
            'items-per-page-options': [5]
        }"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>状態設定</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="1000px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" color="primary">
                            NEW ITEM
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>{{ formTitle }}</v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-form ref="editForm">
                                    <v-row>
                                        <v-col cols="8">
                                            <v-text-field
                                                v-model="editedConditionName"
                                                :disabled="editedIndex!=-1"
                                                :rules="[rules.required, rules.alreadyEntered]"
                                                label="保存名"
                                            />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedCondition.turn"
                                                :rules="[rules.numberInput]"
                                                label="時間"
                                            />                                            
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedCondition.rate"
                                                :rules="[rules.numberInput]"
                                                label="確率"
                                            />                                            
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-card>
                                                <v-card-subtitle>攻撃側変化割合</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.myStatusRate[item]"
                                                                :rules="[rules.numberInput]"
                                                                :label="item"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                        <v-col>
                                            <v-card>
                                                <v-card-subtitle>攻撃側変化固定値</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.myStatusValue[item]"
                                                                :rules="[rules.numberInput]"
                                                                :label="item"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-card>
                                                <v-card-subtitle>防御側変化割合</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.enemyStatusRate[item]"
                                                                :rules="[rules.numberInput]"
                                                                :label="item"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                        <v-col>
                                            <v-card>
                                                <v-card-subtitle>防御側変化固定値</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.enemyStatusValue[item]"
                                                                :rules="[rules.numberInput]"
                                                                :label="item"
                                                            />
                                                        </v-col>
                                                    </v-row>
                                                </v-card-text>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="close">CANCEL</v-btn>
                            <v-btn text @click="save">SAVE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">削除しますか？</v-card-title>
                        <v-card-text>※すべての状態、もしくは弾に設定済みの状態を削除することはできません</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="closeDelete">CANCEL</v-btn>
                            <v-btn
                                text
                                @click="deleteItemConfirm"
                                :disabled="isDeletable()"
                            >
                                OK
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:header>
            <thead>
                <tr>
                    <th colspan="1" width="200"></th>
                    <th colspan="7">攻撃側変化割合</th>
                    <th colspan="7">攻撃側変化固定値</th>
                    <th colspan="7">防御側変化割合</th>
                    <th colspan="7">防御側変化固定値</th>
                    
                </tr>
            </thead>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small class="mr-2" @click="copyItem(item)">
                mdi-content-copy
            </v-icon>
            <v-icon small class="mr-2" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
    </v-data-table>
</template>

<script>
import {Condition} from '~/modules/battle/condition.js';
export default {
    components: {
    },
    data(){
        return{
            headers:[
                {text: "Name", value:"Name", width:"200"},
                {text: "HP", value:"MyRateHP"},
                {text: "STR", value:"MyRateSTR"},
                {text: "DEX", value:"MyRateDEX"},
                {text: "DEF", value:"MyRateDEF"},
                {text: "INT", value:"MyRateINT"},
                {text: "PRE", value:"MyRatePRE"},
                {text: "SPD", value:"MyRateSPD"},
                {text: "HP", value:"MyValueHP"},
                {text: "STR", value:"MyValueSTR"},
                {text: "DEX", value:"MyValueDEX"},
                {text: "DEF", value:"MyValueDEF"},
                {text: "INT", value:"MyValueINT"},
                {text: "PRE", value:"MyValuePRE"},
                {text: "SPD", value:"MyValueSPD"},
                {text: "HP", value:"EnemyRateHP"},
                {text: "STR", value:"EnemyRateSTR"},
                {text: "DEX", value:"EnemyRateDEX"},
                {text: "DEF", value:"EnemyRateDEF"},
                {text: "INT", value:"EnemyRateINT"},
                {text: "PRE", value:"EnemyRatePRE"},
                {text: "SPD", value:"EnemyRateSPD"},
                {text: "HP", value:"EnemyValueHP"},
                {text: "STR", value:"EnemyValueSTR"},
                {text: "DEX", value:"EnemyValueDEX"},
                {text: "DEF", value:"EnemyValueDEF"},
                {text: "INT", value:"EnemyValueINT"},
                {text: "PRE", value:"EnemyValuePRE"},
                {text: "SPD", value:"EnemyValueSPD"},
                {text: "時間", value:"Turn"},
                {text: "確率", value:"rate"},
                { text: 'Actions', value: 'actions', sortable: false , width: "150"}
            ],
            statusKeys: ["HP", "STR", "DEX", "DEF", "INT", "PRE", "SPD"],
            editedCondition: new Condition(),
            editedConditionName: "",
            conditions: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            rules: {
                required: value => !!value || '値を入力してください',
                numberInput: value => isFinite(value) || '数値を入力してください',
                alreadyEntered: value => this.editedIndex!=-1 || !Object.keys(this.condtionList).includes(value) || '既に登録済みの名称です'
            },
        }
    },
    props: {
        condtionList: Object,
        bulletList: Object,
    },
    created () {
        this.initialize();
    },
    methods:{
        initialize: function(){
            // 保存されているステータス情報をセット
            Object.keys(this.condtionList).forEach(key =>{
                this.conditions.push(this.makeTableData(key, this.condtionList[key]));
            });

        },
        close: function() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedCondition = new Condition();
                this.editedConditionName = "";
                this.editedIndex = -1
            })
        },
        closeDelete: function() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedCondition = new Condition();
                this.editedConditionName = "";
                this.editedIndex = -1;
            })
        },
        save: function(){
            if(this.$refs.editForm.validate()) {
                let editItem = this.makeTableData(this.editedConditionName, this.editedCondition);
                if (this.editedIndex > -1) {
                    // 更新時の処理
                    Object.assign(this.conditions[this.editedIndex], editItem);
                }else{
                    // 新規作成時の処理
                    this.conditions.push(editItem);
                }
                this.$emit(
                    "editCondtionConfig",
                    {
                        "key": this.editedConditionName,
                        "value": this.editedCondition,
                        "crud": "cu"
                    }
                );
                this.close();
            }
        },
        editItem: function(item) {
            // インデックスを指定
            this.editedIndex = this.conditions.indexOf(item);
            this.copyItem(item);
        },
        copyItem: function(item){
            // 更新内容をセット
            this.editedConditionName = item["Name"];
            for(let i=0; i<this.statusKeys.length; i++){
                this.editedCondition.myStatusRate[this.statusKeys[i]] = item["MyRate" + this.statusKeys[i]];
                this.editedCondition.myStatusValue[this.statusKeys[i]] = item["MyValue" + this.statusKeys[i]];
                this.editedCondition.enemyStatusRate[this.statusKeys[i]] = item["EnemyRate" + this.statusKeys[i]];
                this.editedCondition.enemyStatusValue[this.statusKeys[i]] = item["EnemyValue" + this.statusKeys[i]];
            }
            this.editedCondition.turn = item["Turn"];
            this.editedCondition.rate = item["rate"];

            this.dialog = true;
        },
        deleteItem: function(item) {
            this.editedIndex = this.conditions.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm: function() {
            this.$emit(
                "editCondtionConfig",
                {
                    "key": this.conditions[this.editedIndex]["Name"],
                    "value": null,
                    "crud": "d",
                }
            );

            this.conditions.splice(this.editedIndex, 1);
            this.closeDelete();
        },
        checkZeros: function(value){
            return 0==value ? 0: value;
        },
        isDeletable: function(){
            if((!this.dialogDelete) || (this.editedIndex == -1)){
                return true;
            }
            let deleteFlg = false;
            // 削除対象が武器に設定されている場合削除キャンセル
            Object.keys(this.bulletList).forEach(key =>{
                if(this.bulletList[key].grantCondition.includes(this.conditions[this.editedIndex]["Name"])){
                    deleteFlg = true;
                }
            });
            // 状態設定の件数が1件以下の場合は削除できない
            deleteFlg = (this.conditions.length<2)? true: deleteFlg;

            return deleteFlg;
        },
        makeTableData: function(key, value){
            return {
                "Name": key,
                "MyRateHP": this.checkZeros(value.myStatusRate["HP"]),
                "MyRateSTR": this.checkZeros(value.myStatusRate["STR"]), 
                "MyRateDEX": this.checkZeros(value.myStatusRate["DEX"]),
                "MyRateDEF": this.checkZeros(value.myStatusRate["DEF"]),
                "MyRateINT": this.checkZeros(value.myStatusRate["INT"]),
                "MyRatePRE": this.checkZeros(value.myStatusRate["PRE"]),
                "MyRateSPD": this.checkZeros(value.myStatusRate["SPD"]),
                "MyValueHP": this.checkZeros(value.myStatusValue["HP"]),
                "MyValueSTR": this.checkZeros(value.myStatusValue["STR"]),
                "MyValueDEX": this.checkZeros(value.myStatusValue["DEX"]),
                "MyValueDEF": this.checkZeros(value.myStatusValue["DEF"]),
                "MyValueINT": this.checkZeros(value.myStatusValue["INT"]),
                "MyValuePRE": this.checkZeros(value.myStatusValue["PRE"]),
                "MyValueSPD": this.checkZeros(value.myStatusValue["SPD"]),
                "EnemyRateHP": this.checkZeros(value.enemyStatusRate["HP"]),
                "EnemyRateSTR": this.checkZeros(value.enemyStatusRate["STR"]),
                "EnemyRateDEX": this.checkZeros(value.enemyStatusRate["DEX"]),
                "EnemyRateDEF": this.checkZeros(value.enemyStatusRate["DEF"]),
                "EnemyRateINT": this.checkZeros(value.enemyStatusRate["INT"]),
                "EnemyRatePRE": this.checkZeros(value.enemyStatusRate["PRE"]),
                "EnemyRateSPD": this.checkZeros(value.enemyStatusRate["SPD"]),
                "EnemyValueHP": this.checkZeros(value.enemyStatusValue["HP"]),
                "EnemyValueSTR": this.checkZeros(value.enemyStatusValue["STR"]),
                "EnemyValueDEX": this.checkZeros(value.enemyStatusValue["DEX"]),
                "EnemyValueDEF": this.checkZeros(value.enemyStatusValue["DEF"]),
                "EnemyValueINT": this.checkZeros(value.enemyStatusValue["INT"]),
                "EnemyValuePRE": this.checkZeros(value.enemyStatusValue["PRE"]),
                "EnemyValueSPD": this.checkZeros(value.enemyStatusValue["SPD"]),
                "Turn": this.checkZeros(value.turn),
                "rate": this.checkZeros(value.rate)
            };
        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },
    mounted(){

    },
}
</script>
<style scoped>
.v-data-table >>> th:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 9999;
    background: #1E1E1E;
}
.v-data-table >>> td:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 9999;
    background: #1E1E1E;
}

</style>