<template>
    <v-col>
        <v-tabs
            fixed-tabs
            v-model="battleTab"
        >
            <v-tab>キャラクターステータス</v-tab>
            <v-tab>武器ステータス</v-tab>
            <v-tab>バトル設定</v-tab>
        </v-tabs>
        <v-tabs-items v-model="battleTab">
            <v-tab-item>
                <battle-character-status
                    :statusList="statusList"
                    @editCharacter="editCharacter"
                />
            </v-tab-item>
            <v-tab-item>
                <battle-weapon-status
                    :weaponList="weaponList"
                    @editWeapon="editWeapon"
                />
            </v-tab-item>
            <v-tab-item>
                <battle-config-base />
            </v-tab-item>
        </v-tabs-items>
    </v-col>
</template>

<script>
import BattleCharacterStatus from './BattleCharacterStatus.vue'
import BattleConfigBase from './BattleConfigBase.vue'
import BattleWeaponStatus from './BattleWeaponStatus.vue'
export default {
    components: {
        BattleCharacterStatus,
        BattleWeaponStatus,
        BattleConfigBase
    },
    data(){
        return{
            battleTab: null,
        }
    },
    props: {
        statusList: Object,
        weaponList: Object,
    },
    methods:{
        editCharacter: function(editInfo){
            this.$emit("editCharacter", editInfo);
        },
        editWeapon: function(editInfo){
            this.$emit("editWeapon", editInfo);
        },

    },
    mounted(){

    },
}
</script>
<style>

</style>