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
                <v-dialog v-model="dialog" max-width="750px">
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
                                        <v-col>
                                            <v-text-field
                                                v-model="editedConditionName"
                                                :disabled="editedIndex!=-1"
                                                :rules="[rules.required, rules.alreadyEntered]"
                                                label="保存名"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-card>
                                                <v-card-subtitle>変化割合値</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.statusRate[item]"
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
                                                <v-card-subtitle>変化固定値</v-card-subtitle>
                                                <v-card-text>
                                                    <v-row>
                                                        <v-col v-for="item in statusKeys" :key="item">
                                                            <v-text-field
                                                                v-model="editedCondition.statusValue[item]"
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
                                            <p>対象</p>
                                            <v-radio-group
                                                v-model="editedCondition.target"
                                                mandatory
                                                row
                                            >
                                                <v-radio label="攻撃側" :value="true" />
                                                <v-radio label="防御側" :value="false" />
                                            </v-radio-group>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field
                                                v-model="editedCondition.turn"
                                                :rules="[rules.numberInput]"
                                                label="時間"
                                            />                                            
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field
                                                v-model="editedCondition.rate"
                                                :rules="[rules.numberInput]"
                                                label="確率"
                                            />                                            
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
                    <th colspan="7">変化割合値</th>
                    <th colspan="7">変化固定値</th>                    
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
                {text: "HP", value:"RateHP"},
                {text: "STR", value:"RateSTR"},
                {text: "DEX", value:"RateDEX"},
                {text: "DEF", value:"RateDEF"},
                {text: "INT", value:"RateINT"},
                {text: "PRE", value:"RatePRE"},
                {text: "SPD", value:"RateSPD"},
                {text: "HP", value:"ValueHP"},
                {text: "STR", value:"ValueSTR"},
                {text: "DEX", value:"ValueDEX"},
                {text: "DEF", value:"ValueDEF"},
                {text: "INT", value:"ValueINT"},
                {text: "PRE", value:"ValuePRE"},
                {text: "SPD", value:"ValueSPD"},
                {text: "対象", value: "Target"},
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
                this.editedCondition.statusRate[this.statusKeys[i]] = item["Rate" + this.statusKeys[i]];
                this.editedCondition.statusValue[this.statusKeys[i]] = item["Value" + this.statusKeys[i]];
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
            return 0==value ? 0: Number(value);
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
                "RateHP": this.checkZeros(value.statusRate["HP"]),
                "RateSTR": this.checkZeros(value.statusRate["STR"]), 
                "RateDEX": this.checkZeros(value.statusRate["DEX"]),
                "RateDEF": this.checkZeros(value.statusRate["DEF"]),
                "RateINT": this.checkZeros(value.statusRate["INT"]),
                "RatePRE": this.checkZeros(value.statusRate["PRE"]),
                "RateSPD": this.checkZeros(value.statusRate["SPD"]),
                "ValueHP": this.checkZeros(value.statusValue["HP"]),
                "ValueSTR": this.checkZeros(value.statusValue["STR"]),
                "ValueDEX": this.checkZeros(value.statusValue["DEX"]),
                "ValueDEF": this.checkZeros(value.statusValue["DEF"]),
                "ValueINT": this.checkZeros(value.statusValue["INT"]),
                "ValuePRE": this.checkZeros(value.statusValue["PRE"]),
                "ValueSPD": this.checkZeros(value.statusValue["SPD"]),
                "Target": value.target? "攻撃側": "防御側",
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


</style>