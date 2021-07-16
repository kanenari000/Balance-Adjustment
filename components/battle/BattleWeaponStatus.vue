<template>
    <v-data-table
        :headers="headers"
        :items="weapons"
        dense
        :footer-props="{
            'items-per-page-options': [5]
        }"
    >
        <template v-slot:[`item.Bullet`]="{item}">
            <v-chip v-for="(bullet, index) in item.Bullet" :key="index">
                {{bullet}}
            </v-chip>
        </template>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>武器ステータス</v-toolbar-title>
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
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="editedStatusName"
                                                :disabled="editedIndex!=-1"
                                                :rules="[rules.required, rules.alreadyEntered]"
                                                label="保存名"
                                            />
                                        </v-col>
                                        <v-col cols="12">
                                            <v-select
                                                v-model="editWeaponType"
                                                :items="weaponKeys"
                                                label="武器種"
                                            />
                                        </v-col>
                                        <v-col v-for="item in statusKeys" :key="item" cols="2">
                                            <v-text-field
                                                v-model="editedStatus.status.status[item]"
                                                :rules="[rules.numberInput]"
                                                :label="item"
                                            />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedStatus.ch"
                                                :rules="[rules.numberInput]"
                                                label="クリティカル補正"
                                            />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedStatus.mystery"
                                                :rules="[rules.numberInput]"
                                                label="奥義ダメージ補正"
                                            />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedStatus.mysteryRise"
                                                :rules="[rules.numberInput]"
                                                label="奥義ゲージ上昇量補正"
                                            />
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field
                                                v-model="editedStatus.attack"
                                                :rules="[rules.numberInput]"
                                                label="通常攻撃ダメージ補正"
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                                v-model="addBulletKey"
                                                :items="bulletList"
                                                :disabled="editWeaponType!='射撃'"
                                                label="追加弾名"
                                            />
                                        </v-col>
                                        <v-col>
                                            <v-btn
                                                @click="addBuleets()"
                                                :disabled="(editWeaponType!='射撃')||(addBulletKey==null)"
                                            >
                                                追加
                                            </v-btn>
                                        </v-col>
                                        <v-col>装填数：{{editedStatus.bullet.length}}</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-chip v-for="(bullet, index) in editedStatus.bullet"
                                                :key="index"
                                                close
                                                @click:close="deleteBullets(index)"
                                            >
                                                {{bullet}}
                                            </v-chip>
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
                        <v-card-text>※すべてのアイテムを削除することはできません</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="closeDelete">CANCEL</v-btn>
                            <v-btn
                                text
                                @click="deleteItemConfirm"
                                :disabled="weapons.length < 2"
                            >
                                OK
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
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
import {WeaponConfig} from '~/modules/battle/weaponConfig.js';
export default {
    components: {
    },
    data(){
        return{
            headers:[
                {text: "Name", value:"Name", width:"150"},
                {text: "武器種", value:"Weapon", width:"100"},
                {text: "STR", value:"STR", width:"70"},
                {text: "DEX", value:"DEX", width:"70"},
                {text: "DEF", value:"DEF", width:"70"},
                {text: "INT", value:"INT", width:"70"},
                {text: "PRE", value:"PRE", width:"70"},
                {text: "SPD", value:"SPD", width:"70"},
                {text: "MAX-HP", value:"MAX-HP", width:"70"},
                {text: "クリティカル補正", value:"CH", width:"70"},
                {text: "奥義ダメージ補正", value:"Mystery", width:"70"},
                {text: "奥義ゲージ上昇量補正", value:"MysteryRise", width:"70"},
                {text: "通常攻撃ダメージ補正", value:"Attack", width:"70"},
                {text: "装填弾", value:"Bullet", width:"400"},
                { text: 'Actions', value: 'actions', sortable: false , width:"150"}
            ],
            weaponKeys: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
            statusKeys: ["STR", "DEX", "DEF", "INT", "PRE", "SPD", "MAX-HP"],
            editedStatus: new WeaponConfig(0, 0, 0, 0, 0, 0, 0),
            editedStatusName: "",
            editWeaponType: "刀剣",
            weapons: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            rules: {
                required: value => !!value || '値を入力してください',
                numberInput: value => isFinite(value) || '数値を入力してください',
                alreadyEntered: value => this.editedIndex!=-1 || !Object.keys(this.weaponList[this.editWeaponType]).includes(value) || '既に登録済みの名称です'
            },
            addBulletKey: null,

        }
    },
    props: {
        weaponList: Object,
        bulletList: Array,
    },
    created () {
      this.initialize()
    },
    methods:{
        initialize: function(){
            // 保存されているステータス情報をセット
            for(let i=0; i< this.weaponKeys.length; i++){
                Object.keys(this.weaponList[this.weaponKeys[i]]).forEach(key =>{
                    this.weapons.push(
                        {
                            "Name": key,
                            "Weapon": this.weaponKeys[i],
                            "STR": this.weaponList[this.weaponKeys[i]][key].status.status["STR"],
                            "DEX": this.weaponList[this.weaponKeys[i]][key].status.status["DEX"],
                            "DEF": this.weaponList[this.weaponKeys[i]][key].status.status["DEF"],
                            "INT": this.weaponList[this.weaponKeys[i]][key].status.status["INT"],
                            "PRE": this.weaponList[this.weaponKeys[i]][key].status.status["PRE"],
                            "SPD": this.weaponList[this.weaponKeys[i]][key].status.status["SPD"],
                            "MAX-HP": this.weaponList[this.weaponKeys[i]][key].status.status["MAX-HP"],
                            "CH": this.weaponList[this.weaponKeys[i]][key].ch,
                            "Mystery": this.weaponList[this.weaponKeys[i]][key].mystery,
                            "MysteryRise": this.weaponList[this.weaponKeys[i]][key].mysteryRise,
                            "Attack": this.weaponList[this.weaponKeys[i]][key].attack,
                            "Bullet": this.weaponList[this.weaponKeys[i]][key].bullet
                        }
                    );
                });
            }
        },
        close: function() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedStatus = new WeaponConfig(0, 0, 0, 0, 0, 0, 0);
                this.editedStatusName = "";
                this.editedIndex = -1
            })
        },
        closeDelete: function() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedStatus = new WeaponConfig(0, 0, 0, 0, 0, 0, 0);
                this.editedStatusName = "";
                this.editedIndex = -1
            })
        },
        save: function(){
            if(this.$refs.editForm.validate()) {
                // 数値項目が未入力の場合は0を代入
                for(let i=0; i<this.statusKeys.length; i++){
                    if(0 == this.editedStatus.status.status[this.statusKeys[i]]){
                        this.editedStatus.status.status[this.statusKeys[i]] = 0;
                    }
                }
                if(0 == this.editedStatus.ch){
                    this.editedStatus.ch = 0;
                }
                if(0 == this.editedStatus.mystery){
                    this.editedStatus.mystery = 0;
                }
                if(0 == this.editedStatus.mysteryRise){
                    this.editedStatus.mysteryRise = 0;
                }
                if(0 == this.editedStatus.attack){
                    this.editedStatus.attack = 0;
                }
                // 武器種が射撃以外は弾を空配列にする
                if(this.editWeaponType != "射撃"){
                    this.editedStatus.bullet = [];
                }
                let editItem = {
                    "Name": this.editedStatusName,
                    "Weapon": this.editWeaponType,
                    "STR": this.editedStatus.status.status["STR"],
                    "DEX": this.editedStatus.status.status["DEX"],
                    "DEF": this.editedStatus.status.status["DEF"],
                    "INT": this.editedStatus.status.status["INT"],
                    "PRE": this.editedStatus.status.status["PRE"],
                    "SPD": this.editedStatus.status.status["SPD"],
                    "MAX-HP": this.editedStatus.status.status["MAX-HP"],
                    "CH": this.editedStatus.ch,
                    "Mystery": this.editedStatus.mystery,
                    "MysteryRise": this.editedStatus.mysteryRise,
                    "Attack": this.editedStatus.attack,
                    "Bullet": this.editedStatus.bullet
                };
                if (this.editedIndex > -1) {
                    // 更新時の処理
                    Object.assign(this.weapons[this.editedIndex], editItem);
                }else{
                    // 新規作成時の処理
                    this.weapons.push(editItem);
                }
                this.$emit(
                    "editWeapon",
                    {
                        "key": this.editedStatusName,
                        "value": this.editedStatus,
                        "crud": "cu",
                        "weapon": this.editWeaponType
                    }
                );
                this.close();
            }
        },
        editItem: function(item) {
            this.editedIndex = this.weapons.indexOf(item);
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            this.editWeaponType =item["Weapon"];
            for(let i=0; i<this.statusKeys.length; i++){
                this.editedStatus.status.status[this.statusKeys[i]] = item[this.statusKeys[i]];
            }
            this.editedStatus.ch = item["CH"];
            this.editedStatus.mystery = item["Mystery"];
            this.editedStatus.mysteryRise = item["MysteryRise"];
            this.editedStatus.attack = item["Attack"];
            this.editedStatus.bullet = item["Bullet"];

            this.dialog = true;
        },
        copyItem: function(item){
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            this.editWeaponType =item["Weapon"];
            for(let i=0; i<this.statusKeys.length; i++){
                this.editedStatus.status.status[this.statusKeys[i]] = item[this.statusKeys[i]];
            }
            this.editedStatus.ch = item["CH"];
            this.editedStatus.mystery = item["Mystery"];
            this.editedStatus.mysteryRise = item["MysteryRise"];
            this.editedStatus.attack = item["Attack"];
            this.editedStatus.bullet = item["Bullet"];

            this.dialog = true;
        },
        deleteItem: function(item) {
            this.editedIndex = this.weapons.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm: function() {
            this.$emit(
                "editWeapon",
                {
                    "key": this.weapons[this.editedIndex]["Name"],
                    "value": null,
                    "crud": "d",
                    "weapon": this.weapons[this.editedIndex]["Weapon"]
                }
            );

            this.weapons.splice(this.editedIndex, 1);
            this.closeDelete();
        },
        addBuleets: function(){
            // 選択した弾を追加
            this.editedStatus.bullet.push(this.addBulletKey);
        },
        deleteBullets: function(index){
            // 指定の弾を削除
            this.editedStatus.bullet.splice(index, 1);
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
<style>

</style>