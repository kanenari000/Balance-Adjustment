<template>
    <v-data-table
        :headers="headers"
        :items="bullets"
        dense
        :footer-props="{
            'items-per-page-options': [5]
        }"
    >
        <template v-slot:[`item.GrantCondition`]="{item}">
            <v-chip v-for="(condition, index) in item.GrantCondition" :key="index">
                {{condition}}
            </v-chip>
        </template>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>弾設定</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
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
                                        <v-col cols="4">
                                            <v-switch
                                                v-model="editedStatus.mysteryFlg"
                                                inset
                                                :label="`奥義フラグ: ${editedStatus.mysteryFlg.toString()}`"
                                            />
                                        </v-col>
                                        <v-col  cols="4">
                                            <v-text-field
                                                v-model="editedStatus.fixedDmg"
                                                :rules="[rules.numberInput]"
                                                label="固定ダメージ"
                                            />
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                v-model="editedStatus.attackRate"
                                                :rules="[rules.numberInput]"
                                                label="ダメージ倍率"
                                            />
                                        </v-col>
                                        <v-col  cols="12">
                                            <v-select
                                                v-model="editedStatus.grantCondition"
                                                :items="condtionList"
                                                label="付与効果"
                                                multiple
                                                chips
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
                        <v-card-text>※すべてのアイテムを削除することはできません</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="closeDelete">CANCEL</v-btn>
                            <v-btn
                                text
                                @click="deleteItemConfirm"
                                :disabled="bullets.length < 2"
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
import {Bullet} from '~/modules/battle/bullet.js';
export default {
    components: {
    },
    data(){
        return{
            headers:[
                {text: "Name", value:"Name"},
                {text: "奥義フラグ", value:"MysteryFlg"},
                {text: "固定ダメージ", value:"FixedDmg"},
                {text: "ダメージ倍率", value:"AttackRate"},
                {text: "付与効果", value:"GrantCondition"},
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            editedStatus: new Bullet(),
            editedStatusName: "",
            bullets: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            rules: {
                required: value => !!value || '値を入力してください',
                numberInput: value => isFinite(value) || '数値を入力してください',
                alreadyEntered: value => this.editedIndex!=-1 || !Object.keys(this.bulletList).includes(value) || '既に登録済みの名称です'
            },
        }
    },
    props: {
        bulletList: Object,
        condtionList: Array,
    },
    created () {
      this.initialize()
    },
    methods:{
        setBullet: function(key, bullet){
            return {
                "Name": key,
                "MysteryFlg": bullet.mysteryFlg,
                "FixedDmg": bullet.fixedDmg,
                "AttackRate": bullet.attackRate,
                "GrantCondition": bullet.grantCondition
            };
        },
        initialize: function(){
            // 保存されているステータス情報をセット
            Object.keys(this.bulletList).forEach(key =>{
                this.bullets.push(this.setBullet(key, this.bulletList[key]));
            });
        },
        close: function() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedStatus = new Bullet();
                this.editedStatusName = "";
                this.editedIndex = -1
            })
        },
        closeDelete: function() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedStatus = new Bullet();
                this.editedStatusName = "";
                this.editedIndex = -1
            })
        },
        save: function(){
            if(this.$refs.editForm.validate()) {
                // 数値項目が未入力の場合は0を代入 バグ防止のためこのタイミングで数値に変換しておく
                this.editedStatus.fixedDmg = this.editedStatus.fixedDmg==0? 0: Number(this.editedStatus.fixedDmg);
                this.editedStatus.attackRate = this.editedStatus.attackRate==0? 0: Number(this.editedStatus.attackRate);

                let editItem = this.setBullet(this.editedStatusName, this.editedStatus);

                if (this.editedIndex > -1) {
                    // 更新時の処理
                    Object.assign(this.bullets[this.editedIndex], editItem);
                }else{
                    // 新規作成時の処理
                    this.bullets.push(editItem);
                }
                this.$emit(
                    "editBulletConfig",
                    {
                        "key": this.editedStatusName,
                        "value": this.editedStatus,
                        "crud": "cu",
                    }
                );
                this.close();
            }
        },
        editItem: function(item) {
            this.editedIndex = this.bullets.indexOf(item);
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            this.editedStatus.mysteryFlg = item["MysteryFlg"];
            this.editedStatus.fixedDmg = item["FixedDmg"];
            this.editedStatus.attackRate = item["AttackRate"];
            this.editedStatus.grantCondition = item["GrantCondition"];

            this.dialog = true;
        },
        copyItem: function(item){
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            this.editedStatus.mysteryFlg = item["MysteryFlg"];
            this.editedStatus.fixedDmg = item["FixedDmg"];
            this.editedStatus.attackRate = item["AttackRate"];
            this.editedStatus.grantCondition = item["GrantCondition"];

            this.dialog = true;
        },
        deleteItem: function(item) {
            this.editedIndex = this.bullets.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm: function() {
            this.$emit(
                "editBulletConfig",
                {
                    "key": this.bullets[this.editedIndex]["Name"],
                    "value": null,
                    "crud": "d",
                }
            );

            this.bullets.splice(this.editedIndex, 1);
            this.closeDelete();
        },
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