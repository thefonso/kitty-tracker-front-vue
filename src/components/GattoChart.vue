<template>
  <!-- second chart group -->
  <div class="chart-block" style="padding-top:50px">
    <div ref="line" style="vertical-align: middle; display: inline-block; width: 50%; height: 30px;"></div>
    <div ref="column" style="vertical-align: middle;display: inline-block; width: 50%; height: 30px;"></div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    props: ['message'],
    name: 'app',
    created(){
      this.getFeedingsAgain(this.message);
      this.getMedicationsAgain(this.message);
    },
    updated(){
      this.getFeedingsAgain(this.message);
      this.getMedicationsAgain(this.message);
    },
    data() {
      return {
        chartCatID: this.message,
        catFeedingsAgain: [],
        catMedicationsAgain: [],
      }
    },
    watch: {
      catFeedingsAgain: function() {
        AmCharts.makeChart( this.$refs.line, {
          "type": "serial",
          "dataProvider": this.catFeedingsAgain,
          "categoryField": "created",
          "autoMargins": false,
          "marginLeft": 0,
          "marginRight": 5,
          "marginTop": 0,
          "marginBottom": 0,
          "graphs": [ {
            "valueField": "weight_after_food",
            "showBalloon": false,
            "lineColor": "#ffbf63",
            "negativeLineColor": "#289eaf"
          } ],
          "valueAxes": [ {
            "gridAlpha": 0,
            "axisAlpha": 0,
            "guides": [ {
              "weight_after_food": 0,
              "lineAlpha": 0.1
            } ]
          } ],
          "categoryAxis": {
            "gridAlpha": 0,
            "axisAlpha": 0,
            "startOnAxis": true
          }
        });
      },
      catMedicationsAgain: function(){
        AmCharts.makeChart( this.$refs.column, {
          "type": "serial",
          "dataProvider": this.catMedicationsAgain,
          "categoryField": "created",
          "autoMargins": false,
          "marginLeft": 0,
          "marginRight": 0,
          "marginTop": 0,
          "marginBottom": 0,
          "graphs": [ {
            "valueField": "dosage",
            "type": "column",
            "fillAlphas": 1,
            "showBalloon": false,
            "lineColor": "#ffbf63",
            "negativeFillColors": "#289eaf",
            "negativeLineColor": "#289eaf"
          } ],
          "valueAxes": [ {
            "gridAlpha": 0,
            "axisAlpha": 0
          } ],
          "categoryAxis": {
            "gridAlpha": 0,
            "axisAlpha": 0
          }
        } );
      }
    },
    mounted () {
      /**
       * Line Chart #2
       */
      // TODO: line = weight(waf) / day(created?)
      AmCharts.makeChart( this.$refs.line, {
        "type": "serial",
        "dataProvider": [ {
          "created": 1,
          "weight_after_food": 120
        }, {
          "created": 2,
          "weight_after_food": 54
        }, {
          "created": 3,
          "weight_after_food": -18
        }, {
          "created": 4,
          "weight_after_food": -12
        }, {
          "created": 5,
          "weight_after_food": -51
        }, {
          "created": 6,
          "weight_after_food": 12
        }, {
          "created": 7,
          "weight_after_food": 56
        }, {
          "created": 8,
          "weight_after_food": 113
        }, {
          "created": 9,
          "weight_after_food": 142
        }, {
          "created": 10,
          "weight_after_food": 125
        } ],
        "categoryField": "created",
        "autoMargins": false,
        "marginLeft": 0,
        "marginRight": 5,
        "marginTop": 0,
        "marginBottom": 0,
        "graphs": [ {
          "valueField": "weight_after_food",
          "showBalloon": false,
          "lineColor": "#ffbf63",
          "negativeLineColor": "#289eaf"
        } ],
        "valueAxes": [ {
          "gridAlpha": 0,
          "axisAlpha": 0,
          "guides": [ {
            "weight_after_food": 0,
            "lineAlpha": 0.1
          } ]
        } ],
        "categoryAxis": {
          "gridAlpha": 0,
          "axisAlpha": 0,
          "startOnAxis": true
        }
      } );

      /**
       * Column Chart #2
       */
      // TODO: column = dose(dosage) / day(created?)
      AmCharts.makeChart( this.$refs.column, {
        "type": "serial",
        "dataProvider": [ {
          "created": 1,
          "dosage": -5
        }, {
          "created": 2,
          "dosage": 3
        }, {
          "created": 3,
          "dosage": 7
        }, {
          "created": 4,
          "dosage": -3
        }, {
          "created": 5,
          "dosage": 3
        }, {
          "created": 6,
          "dosage": 4
        }, {
          "created": 7,
          "dosage": 6
        }, {
          "created": 8,
          "dosage": -3
        }, {
          "created": 9,
          "dosage": -2
        }, {
          "created": 10,
          "dosage": 6
        } ],
        "categoryField": "created",
        "autoMargins": false,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "graphs": [ {
          "valueField": "dosage",
          "type": "column",
          "fillAlphas": 1,
          "showBalloon": false,
          "lineColor": "#ffbf63",
          "negativeFillColors": "#289eaf",
          "negativeLineColor": "#289eaf"
        } ],
        "valueAxes": [ {
          "gridAlpha": 0,
          "axisAlpha": 0
        } ],
        "categoryAxis": {
          "gridAlpha": 0,
          "axisAlpha": 0
        }
      } );
    },
    methods:{
      getFeedingsAgain(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/feedings/?cat__slug&cat__name=${value}`)
          .then(response => {console.log("getFeedingsAgain: ");console.log(response.data.results);
            this.catFeedingsAgain = response.data.results
          })
          .catch(error => console.log(error));
      },
      getMedicationsAgain(value) {
        axios.get(`${process.env.KITTY_URL}/api/v1/medications/?cat__slug=&cat__name=${value}`)
          .then(response => {console.log("catMedicationsAgain: ");console.log(response.data.results);
            this.catMedicationsAgain = response.data.results})
          .catch(error => console.log(error));
      },
    }
  }
</script>

<style>
  .amcharts-chart-div a{
    text-indent: -9999px;
    outline: none;
  }
</style>
