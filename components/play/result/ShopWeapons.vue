<template>
    <v-card>
        <v-card-title>{{itemName}} </v-card-title>
        <v-list>
            <template v-for="(item, index) in rankPossessions">
                <v-list-item :key=index>
                    <v-list-item-action>
                        <v-icon>mdi-numeric-{{index}}-box-outline</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            Rank{{index}} : {{item}}
                        </v-list-item-title>
                        <v-col><v-btn fab small><v-icon>mdi-minus</v-icon></v-btn></v-col>
                        <v-col><v-btn fab small><v-icon>mdi-plus</v-icon></v-btn></v-col>
                    </v-list-item-content>
                </v-list-item>
                <v-divider
                    :inset="inset"
                    :key=index
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

  }
}
</script>