<template>
    <v-col>
        <v-tabs
            fixed-tabs
            v-model="battleTab"
        >
            <v-tab>キャラクターステータス</v-tab>
            <v-tab>武器ステータス</v-tab>
            <v-tab>弾設定</v-tab>
            <v-tab>状態設定</v-tab>
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
                    :bulletList="Object.keys(bulletList)"
                    @editWeapon="editWeapon"
                />
            </v-tab-item>
            <v-tab-item>
                <battle-bullet-config
                    :bulletList="bulletList"
                    :condtionList="Object.keys(condtionList)"
                    @editBulletConfig="editBulletConfig"
                />
            </v-tab-item>
            <v-tab-item>
                <battle-condition
                    :bulletList="bulletList"
                    :condtionList="condtionList"
                    @editCondtionConfig="editCondtionConfig"
                />
            </v-tab-item>
            <v-tab-item>
                <battle-config-base
                    :battleConf="battleConf"
                    @editBaseConfig="editBaseConfig"
                />
            </v-tab-item>
        </v-tabs-items>
    </v-col>
</template>

<script>
import BattleBulletConfig from './BattleBulletConfig.vue'
import BattleCharacterStatus from './BattleCharacterStatus.vue'
import BattleCondition from './BattleCondition.vue'
import BattleConfigBase from './BattleConfigBase.vue'
import BattleWeaponStatus from './BattleWeaponStatus.vue'
export default {
    components: {
        BattleCharacterStatus,
        BattleWeaponStatus,
        BattleConfigBase,
        BattleCondition,
        BattleBulletConfig
    },
    data(){
        return{
            battleTab: null,
        }
    },
    props: {
        statusList: Object,
        weaponList: Object,
        battleConf: Object,
        condtionList: Object,
        bulletList: Object,
    },
    methods:{
        editCharacter: function(editInfo){
            this.$emit("editCharacter", editInfo);
        },
        editWeapon: function(editInfo){
            this.$emit("editWeapon", editInfo);
        },
        editBulletConfig: function(editInfo){
            this.$emit("editBulletConfig", editInfo);
        },
        editCondtionConfig: function(editInfo){
            this.$emit("editCondtionConfig", editInfo);
        },
        editBaseConfig: function(editInfo){
            this.$emit("editBaseConfig", editInfo);
        },
        editBulletConfig: function(editInfo){
            this.$emit("editBulletConfig", editInfo);
        }

    },
    mounted(){

    },
}
</script>
<style>

</style>