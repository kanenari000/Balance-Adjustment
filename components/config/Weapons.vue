<template>
    <v-row >
        <v-col v-for="weapon in weaponNames" :key="weapon">
            <v-card>
                <v-card-title>{{weapon}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        基礎値
                        <status-set :status.sync="cWeaponStatus[weapon]" />
                    </v-col>
                    <v-col>
                        補正値
                        <status-set :status.sync="cStatusCorrection[weapon]" />
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import StatusSet from '~/components/config/StatusSet.vue';
export default {
  components: {
    StatusSet,
  },
  data(){
    return{
        weaponNames: ["刀剣", "長柄", "打撃", "射撃", "魔法"],
    }
    },
    props: {
        weaponStatus: Object,
        statusCorrection: Object,
    },
    computed: {
        cWeaponStatus: {
            get(){
                return this.weaponStatus;
            },
            set(value) {
                this.$emit('update:weaponStatus', value);
            }
        },
        cStatusCorrection: {
            get(){
                return this.statusCorrection;
            },
            set(value) {
                this.$emit('update:statusCorrection', value);
            }
        },

    }
}
</script>