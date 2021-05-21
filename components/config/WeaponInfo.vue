<template>
    <v-row >
        <v-col v-for="item in weaponNames" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        売却確率
                        <v-form v-for="(weapon, index) in cWeaponsInfoList[item]" :key="index">
                            <v-text-field
                                v-model="weapon.rate"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                    <v-col>
                        売却価格
                        <v-form v-for="(weapon, index) in cWeaponsInfoList[item]" :key="index">
                            <v-text-field
                                v-model="weapon.value"
                                :label="`ランク${index}`"
                            />
                        </v-form>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    components: {
    },
    data(){
        return{
            weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
        }
    },
    props: {
        weaponsInfoList: Object,
    },
    computed: {
        cWeaponsInfoList: {
            get(){
                return this.weaponsInfoList;
            },
            set(value) {
                this.$emit('update:weaponsInfoList', value);
            }
        },

    }
}
</script>