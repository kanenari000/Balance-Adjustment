<template>
    <v-card>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="inputDay"
                    :rules="daysRules"
                    label="大会予約日"
                ></v-text-field>
            </v-col>
            <v-col>
                <v-btn
                    v-on:click="addBattles"
                    color="primary"
                >
                    予約
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-sheet color="teal" shaped>
                    <v-chip v-for="appointDay in battleDays"
                        :key="appointDay"
                        close
                        @click:close="deleteBattles(appointDay)"
                    >
                        {{appointDay}} 日目
                    </v-chip>
                </v-sheet>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    data(){
    return{
        inputDay: null,
        daysRules: [
            v => this.isAbleDaysNum(v) || "0~280 の数値を入力してください",
        ],
    }
    },
    props: {
        battleDays: Array,
    },
    methods:{
        isAbleDaysNum: function(value){
            if(isNaN(value)){
                return false;
            }
            if(!value){
                return true;
            }
            return ((value > 0) && (value < 281));
        },
        addBattles: function(){
            if(!this.inputDay){
                return;
            }
            if(this.isAbleDaysNum(this.inputDay)){
                this.$emit("setBattleDays", {"isAdd": true, "day": this.inputDay});
                this.inputDay = "";
            }
        },
        deleteBattles: function(value){
            this.$emit("setBattleDays", {"isAdd": false, "day": value});
        }
    },

}
</script>