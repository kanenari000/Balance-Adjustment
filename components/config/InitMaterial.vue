<template>
    <v-row >
        <v-col v-for="item in materialItems" :key="item">
            <v-card>
                <v-card-title>{{item}}</v-card-title>
                <v-card-actions>
                    <v-col>
                        <v-form v-for="index in [0, 1, 2]" :key="index">
                            <v-text-field
                                v-model="cInitMaterialSet[item][index]"
                                :label="`ランク${index+1}`"
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
            materialItems: ["金属", "木材", "皮革"],
        }
    },
    props: {
        initMaterialSet: Object,
    },
    computed: {
        cInitMaterialSet: {
            get(){
                return this.initMaterialSet;
            },
            set(value) {
                this.$emit('update:initMaterialSet', value);
            }
        },
    }
}
</script>