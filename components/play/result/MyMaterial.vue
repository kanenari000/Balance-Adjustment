<template>
    <v-card>
        <v-card-title>{{itemName}} </v-card-title>
        <v-list>
            <template v-for="(item, index) in rankPossessions">
                <v-list-item :key="`first-${index}`">
                    <v-list-item-action>
                        <v-icon>mdi-numeric-{{index}}-box-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Rank{{index}} : {{item}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider
                    :inset="inset"
                    :key="`second-${index}`"
                ></v-divider>
            </template>
        </v-list>
    </v-card>
</template>
<script>
export default {
    data(){
    return{
        inset: true,
    }
    },
    props: {
        itemName: String,
        rankPossessions: Array,
    },
    methods:{
    },
}
</script>