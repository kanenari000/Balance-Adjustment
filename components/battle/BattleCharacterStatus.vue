<template>
    <v-data-table
        :headers="headers"
        :items="statuses"
        dense
        :footer-props="{
            'items-per-page-options': [5]
        }"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>キャラクターステータス</v-toolbar-title>
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
                                        <v-col v-for="item in statusKeys" :key="item" cols="4">
                                            <v-text-field
                                                v-model="editedStatus.status[item]"
                                                :rules="[rules.numberInput]"
                                                :label="item"
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
                                :disabled="statuses.length < 2"
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
import {BattleStatus} from '~/modules/battle/battleStatus.js';
export default {
    components: {
    },
    data(){
        return{
            headers:[
                {text: "Name", value:"Name"},
                {text: "STR", value:"STR"},
                {text: "DEX", value:"DEX"},
                {text: "DEF", value:"DEF"},
                {text: "INT", value:"INT"},
                {text: "PRE", value:"PRE"},
                {text: "SPD", value:"SPD"},
                {text: "MAX-HP", value:"MAX-HP"},
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            statusKeys: ["STR", "DEX", "DEF", "INT", "PRE", "SPD", "MAX-HP"],
            editedStatus: new BattleStatus(0, 0, 0, 0, 0, 0, 0),
            editedStatusName: "",
            statuses: [],
            dialog: false,
            dialogDelete: false,
            editedIndex: -1,
            rules: {
                required: value => !!value || '値を入力してください',
                numberInput: value => isFinite(value) || '数値を入力してください',
                alreadyEntered: value => this.editedIndex!=-1 || !Object.keys(this.statusList).includes(value) || '既に登録済みの名称です'
            },
        }
    },
    props: {
        statusList: Object,
    },
    created () {
      this.initialize()
    },
    methods:{
        initialize: function(){
            // 保存されているステータス情報をセット
            Object.keys(this.statusList).forEach(key =>{
                this.statuses.push(
                    {
                        "Name": key,
                        "STR": this.statusList[key].status["STR"],
                        "DEX": this.statusList[key].status["DEX"],
                        "DEF": this.statusList[key].status["DEF"],
                        "INT": this.statusList[key].status["INT"],
                        "PRE": this.statusList[key].status["PRE"],
                        "SPD": this.statusList[key].status["SPD"],
                        "MAX-HP": this.statusList[key].status["MAX-HP"],
                    }
                );
            });
        },
        close: function() {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        closeDelete: function() {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        save: function(){
            if(this.$refs.editForm.validate()) {
                // 数値項目が未入力の場合は0を代入
                for(let i=0; i<this.statusKeys.length; i++){
                    if(0 == this.editedStatus.status[this.statusKeys[i]]){
                        this.editedStatus.status[this.statusKeys[i]] = 0;
                    }
                }
                let editItem = {
                    "Name": this.editedStatusName,
                    "STR": this.editedStatus.status["STR"],
                    "DEX": this.editedStatus.status["DEX"],
                    "DEF": this.editedStatus.status["DEF"],
                    "INT": this.editedStatus.status["INT"],
                    "PRE": this.editedStatus.status["PRE"],
                    "SPD": this.editedStatus.status["SPD"],
                    "MAX-HP": this.editedStatus.status["MAX-HP"]
                };
                if (this.editedIndex > -1) {
                    // 更新時の処理
                    Object.assign(this.statuses[this.editedIndex], editItem)
                }else{
                    // 新規作成時の処理
                    this.statuses.push(editItem);
                }
                this.$emit(
                    "editCharacter",
                    {
                        "key": this.editedStatusName,
                        "value": this.editedStatus,
                        "crud": "cu"
                    }
                );
                this.close();
            }
        },
        editItem: function(item) {
            this.editedIndex = this.statuses.indexOf(item);
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            for(let i=0; i<this.statusKeys.length; i++){
                this.editedStatus.status[this.statusKeys[i]] = item[this.statusKeys[i]];
            }
            this.dialog = true;
        },
        copyItem: function(item){
            // 更新内容をセット
            this.editedStatusName = item["Name"];
            for(let i=0; i<this.statusKeys.length; i++){
                this.editedStatus.status[this.statusKeys[i]] = item[this.statusKeys[i]];
            }
            this.dialog = true;
        },
        deleteItem: function(item) {
            this.editedIndex = this.statuses.indexOf(item);
            this.dialogDelete = true;
        },
        deleteItemConfirm: function() {
            this.$emit(
                "editCharacter",
                {
                    "key": this.statuses[this.editedIndex]["Name"],
                    "value": null,
                    "crud": "d"
                }
            );

            this.statuses.splice(this.editedIndex, 1);
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