<template>
  <!--<div class="hello" ref="chartdiv"></div>-->
  <div id="chartdiv" style="width: 100%; height: 400px;"></div>
</template>

<script>
  import * as am4core from "@amcharts/amcharts4/core";
  import * as am4charts from "@amcharts/amcharts4/charts";

  // import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  // am4core.useTheme(am4themes_animated);

  export default {
    name: 'HelloWorld',
    data: {
      message: 'Hello, Vue + amCharts!'
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    width: 100%;
    height: 250px;
  }
</style>
