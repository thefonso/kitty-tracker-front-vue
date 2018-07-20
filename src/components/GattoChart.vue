<template>
  <!-- second chart group -->
  <div class="chart-block" style="padding-top:50px">
    <div ref="line" style="vertical-align: middle; display: inline-block; width: 50%; height: 30px;"></div>
    <div ref="column" style="vertical-align: middle;display: inline-block; width: 50%; height: 30px;"></div>
  </div>
</template>

<script>

  export default {

    name: 'app',
    data() {
      return {
      }
    },
    mounted () {
      /**
       * Line Chart #2
       */
      AmCharts.makeChart( this.$refs.line, {
        "type": "serial",
        "dataProvider": [ {
          "day": 1,
          "value": 120
        }, {
          "day": 2,
          "value": 54
        }, {
          "day": 3,
          "value": -18
        }, {
          "day": 4,
          "value": -12
        }, {
          "day": 5,
          "value": -51
        }, {
          "day": 6,
          "value": 12
        }, {
          "day": 7,
          "value": 56
        }, {
          "day": 8,
          "value": 113
        }, {
          "day": 9,
          "value": 142
        }, {
          "day": 10,
          "value": 125
        } ],
        "categoryField": "day",
        "autoMargins": false,
        "marginLeft": 0,
        "marginRight": 5,
        "marginTop": 0,
        "marginBottom": 0,
        "graphs": [ {
          "valueField": "value",
          "showBalloon": false,
          "lineColor": "#ffbf63",
          "negativeLineColor": "#289eaf"
        } ],
        "valueAxes": [ {
          "gridAlpha": 0,
          "axisAlpha": 0,
          "guides": [ {
            "value": 0,
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
      AmCharts.makeChart( this.$refs.column, {
        "type": "serial",
        "dataProvider": [ {
          "day": 1,
          "value": -5
        }, {
          "day": 2,
          "value": 3
        }, {
          "day": 3,
          "value": 7
        }, {
          "day": 4,
          "value": -3
        }, {
          "day": 5,
          "value": 3
        }, {
          "day": 6,
          "value": 4
        }, {
          "day": 7,
          "value": 6
        }, {
          "day": 8,
          "value": -3
        }, {
          "day": 9,
          "value": -2
        }, {
          "day": 10,
          "value": 6
        } ],
        "categoryField": "day",
        "autoMargins": false,
        "marginLeft": 0,
        "marginRight": 0,
        "marginTop": 0,
        "marginBottom": 0,
        "graphs": [ {
          "valueField": "value",
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
  }
</script>

<style>
  .amcharts-chart-div a{
    text-indent: -9999px;
    outline: none;
  }
</style>
