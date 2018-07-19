<template>
  <div class="hello" ref="chartdiv"></div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";
  import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  am4core.useTheme(am4themes_animated);

  export default {
    name: 'GattoChart',
    mounted() {
      let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = [{
        "country": "Lithuania",
        "litres": 501.9
      }, {
        "country": "Czech Republic",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia",
        "litres": 139.9
      }, {
        "country": "Austria",
        "litres": 128.3
      }, {
        "country": "UK",
        "litres": 99
      }, {
        "country": "Belgium",
        "litres": 60
      }, {
        "country": "The Netherlands",
        "litres": 50
      }];
//axis
      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.title.text = "Countries";

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Litres sold (M)";

//series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = "Sales";
      series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
      series.columns.template.fill = am4core.color("#104547");
      series.dataFields.valueY = "litres";
      series.dataFields.categoryX = "country";

      let series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = "Units";
      series2.stroke = am4core.color("#CDA2AB");
      series2.strokeWidth = 3;
      series2.dataFields.valueY = "units";
      series2.dataFields.categoryX = "country";

    },

    beforeDestroy() {
      if (this.chart) {
        this.chart.dispose();
      }
    }
  }
</script>

<style scoped>
  .hello {
    width: 100%;
    height: 200px;
  }
</style>
