"use strict";
let thecenter = [-3.0769167874644965, 118.01858018012717],
  thezoom = 4.5;
const FF = {
    titleCase: (e) => {
      let t = e.toLowerCase().split(" ");
      for (let e = 0; e < t.length; e++)
        t[e] = t[e][0].toUpperCase() + t[e].slice(1);
      return t.join(" ");
    },
    randomInteger: (e, t) => Math.floor(Math.random() * (t - e + 1)) + e,
    humReads: d3.format(","),
    timestampToString: (e, t = 1) => {
      let a,
        o = new Date(e),
        r = o.getFullYear(),
        n = o.getMonth() + 1 < 10 ? "0" + (o.getMonth() + 1) : o.getMonth() + 1,
        i = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][o.getMonth()],
        s = o.getDate(),
        l = o.getHours(),
        d = o.getMinutes(),
        c = o.getSeconds();
      return (
        1 == t
          ? (a = s + " " + i + " " + r + " " + l + ":" + d + ":" + c)
          : 2 == t && (a = r + "-" + n + "-" + s),
        a
      );
    },
  },
  map = L.map("mapid", {
    center: thecenter,
    zoom: thezoom,
    zoomDelta: 0.2,
    zoomSnap: 0.1,
    zoomControl: !1,
    layerControl: !1,
    scrollWheelZoom: !1,
    attributionControl: !1,
    minZoom: 2,
    maxZoom: 19,
    renderer: L.canvas(),
  });
let _geojson,
  _provBounds,
  _provGeo,
  _kabkotGeo,
  _bnpbJsonData,
  __OURARRAY,
  __CATEGORIES,
  _kabkotIdGeoRef = {},
  _points = [];
async function getData() {
  await d3
    .json(base_url + "assets/json/IDN-adm2-resize-2016.json")
    .then((e) => {
      (_kabkotGeo = e),
        e.features.forEach((e, t) => {
          _kabkotIdGeoRef[e.properties.IDKABUPATE] = e.geometry;
        });
    }),
    await d3.json(base_url + "assets/json/bnpb.json").then((e) => {
      _bnpbJsonData = e;
    }),
    drawcircle(_bnpbJsonData),
    drawKabkot(_kabkotGeo),
    CalldataChart();
}
function drawprov() {
  d3.json(base_url + "assets/json/IDN-adm1-resize-2016.json").then((e) => {
    (_provGeo = L.geoJson(e, {
      style: function (e) {
        return {
          weight: 0.4,
          opacity: 1,
          className: "provgeo",
          fillOpacity: 1,
          color: "#acdffe",
          fillColor: "transparent",
        };
      },
    }).addTo(map)).bringToBack();
  });
}
function drawKabkot(e) {
  function t(e) {
    let t = e.target;
    t.setStyle({ weight: 1, color: "#fff", dashArray: "", fillOpacity: 0.7 }),
      $("#our_tooltip").show(),
      $("#our_tooltip").html(
        FF.titleCase(t.feature.properties.KABKOT) +
          ", " +
          FF.titleCase(t.feature.properties.PROVINSI) +
          "<br/><table class='mt-2'><tr><td>Positif</td><td>:</td><td>" +
          t.feature.properties.positif +
          "</td></tr><tr><td>Deaths</td><td> : </td><td>" +
          t.feature.properties.positif_md +
          "</td></tr><tr><td>Recovers</td><td>:</td><td>" +
          t.feature.properties.positif_sembuh +
          "</td></tr><tr><td>Last Updated</td><td>:</td><td>" +
          t.feature.properties.lastupdate +
          "</td></tr></table>"
      ),
      L.Browser.ie || L.Browser.opera || L.Browser.edge || t.bringToFront();
  }
  function a(e) {
    _geojson.resetStyle(e.target), $("#our_tooltip").hide();
  }
  (_geojson = L.geoJson(e, {
    style: function (e) {
      return {
        weight: 0.1,
        opacity: 1,
        fillOpacity: 1,
        color: "#acdffe",
        fillColor: "transparent",
      };
    },
    onEachFeature: function (e, o) {
      o.on({ mouseover: t, mouseout: a });
    },
  }).addTo(map)).bringToBack();
}
function drawcircle(e) {
  e.sort(function (e, t) {
    return parseInt(e.positif) > parseInt(t.positif) ? -1 : 1;
  }),
    e.forEach((e) => {
      let t, a, o, r, n, i;
      (t = parseInt(e.id)),
        (i = e.kabupaten),
        (a = parseInt(e.positif)),
        (o = parseInt(e.positif_md)),
        (r = parseInt(e.positif_sembuh)),
        (n = FF.timestampToString(e.tgl));
      for (let e = 0; e < _kabkotGeo.features.length; e++)
        _kabkotGeo.features[e].properties.IDKABUPATE == t &&
          ((_kabkotGeo.features[e].properties.kabkot_nm = i),
          (_kabkotGeo.features[e].properties.positif = a),
          (_kabkotGeo.features[e].properties.positif_md = o),
          (_kabkotGeo.features[e].properties.positif_sembuh = r),
          (_kabkotGeo.features[e].properties.lastupdate = n));
      let s = _kabkotIdGeoRef[t];
      if (s) {
        let e =
            "MultiPolygon" == s.type
              ? turf.multiPolygon(s.coordinates)
              : turf.polygon(s.coordinates),
          o = turf.bbox(e);
        !(function (t, a, r) {
          if (t)
            for (let t = 1; t <= parseInt(a); t++) {
              let t = [];
              do {
                let a = turf.randomPoint(1, { bbox: o }),
                  r = a.features[0].geometry.coordinates[1],
                  n = a.features[0].geometry.coordinates[0];
                if ((t = turf.pointsWithinPolygon(a, e)).features.length) {
                  let e = "red",
                    t = L.circle([r, n], {
                      weight: 0.1,
                      opacity: 0.3,
                      color: e,
                      fillColor: e,
                      fillOpacity: 0.5,
                      radius: 0.1,
                    }).addTo(map);
                  _points.push(t);
                }
              } while (0 == t.features.length);
            }
        })(t, a);
      }
    });
}

async function draw_line_indo() {
  let positif_kumulatif;
  let indo_proyeksi = [];
  let categories = [];
  let thedata = [];
  await d3
    .csv(base_url + "assets/csv/positif_kumulatif-allprov.csv")
    .then((data) => {
      positif_kumulatif = data;
    });
  await d3.csv(base_url + "assets/csv/indo_proyeksi.csv?v=1").then((data) => {
    data.forEach((d, i) => {
      indo_proyeksi[parseInt(d.Id_prov)] = {
        nama_provinsi: d.Province,
        id_provinsi: parseInt(d.Id_prov),
        jumlah_penduduk: parseInt(d.Total),
        data_positif: [],
      };
      // thedata.push({ name: d.Province, data: [] });
    });
  });
  positif_kumulatif.forEach((d, i) => {
    categories.push(d.Tgl);
    for (let m in d) {
      if (m != "Tgl") {
        if (indo_proyeksi[parseInt(m)]) {
          let val_norm =
            (parseInt(d[m]) / indo_proyeksi[parseInt(m)].jumlah_penduduk) *
            1000000;
          indo_proyeksi[parseInt(m)].data_positif.push(parseInt(val_norm));
        }
      }
    }
  });
  indo_proyeksi.forEach((d, i) => {
    thedata.push({ name: d.nama_provinsi, data: d.data_positif });
  });

  thedata.sort(function (a, b) {
    return a.data[a.data.length - 1] > b.data[b.data.length - 1] ? -1 : 1;
  });
  let colors = ["#CA0020", "#0571B0", "#fbbc04", "#34a853"];
  let dashArrays = [0, 0, 0, 0];
  let widths = [2, 2, 2, 2, 2, 1.5];
  for (let i = 0; i < 34; i++) {
    colors.push("#607d8b");
    dashArrays.push(1);
  }
  var options = {
    series: thedata,
    chart: {
      height: $("#line-indonesia").height(),
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    colors: colors,
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: widths,
      dashArray: dashArrays,
    },
    dataLabels: {
      enabled: false,
    },
    // stroke: {
    //   curve: "straight",
    // },
    title: {
      text: "Positive cases per one million people",
      align: "left",
    },
    subtitle: {
      text:
        "The number of confirmed cases is lower than the number of actual cases; the main reason for that is limited testing.",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "datetime",
      categories: categories,
    },
  };

  var chart = new ApexCharts(
    document.querySelector("#line-indonesia"),
    options
  );
  chart.render();
}

draw_line_indo();

function drawBarBaseline(e, t, a, o, r) {
  var n = {
    series: [{ name: "Positif Case", data: e }],
    colors: "#041f2e",
    title: {
      text: r,
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        color: "#263238",
      },
    },
    chart: { type: "bar", height: $(o).height(), toolbar: { show: !1 } },
    plotOptions: {
      bar: { horizontal: !1, columnWidth: "100%", endingShape: "rounded" },
    },
    dataLabels: { enabled: !1 },
    stroke: { show: !0, width: 2, colors: ["transparent"] },
    xaxis: { type: "datetime", categories: t },
    yaxis: { title: { text: "Positive cases" }, max: 1000, tickAmount: 5 },
    annotations: { xaxis: a },
    fill: { opacity: 1 },
  };
  new ApexCharts(document.querySelector(o), n).render();
}
function CalldataChart() {
  d3.json(base_url + "assets/json/baselinev2.json").then(function (e) {
    (__OURARRAY = e).sort(function (e, t) {
      let a = parseInt(e.newcases[e.newcases.length - 1]),
        o = parseInt(t.newcases[t.newcases.length - 1]);
      return (
        isNaN(a) && (a = 0), isNaN(o) && (o = 0), a > o ? 1 : a < o ? -1 : 0
      );
    }),
      d3.json(base_url + "assets/json/baselinev2_time.json").then(function (e) {
        (__CATEGORIES = e), drawgraph();
      });
  });
}
function drawgraph() {
  let e = [];
  __OURARRAY.forEach(function (t, a) {
    e.push({ name: t.name, data: t.data });
  });
  var t = {
    stroke: {
      show: !0,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#f1f1f1"],
      width: 4,
      dashArray: 0,
    },
    series: e,
    chart: {
      toolbar: { show: !1 },
      height: $("#graphreport").height(),
      type: "heatmap",
    },
    dataLabels: { enabled: !1 },
    plotOptions: {
      heatmap: {
        radius: 4,
        enableShades: !1,
        useFillColorAsStroke: !1,
        colorScale: {
          ranges: [
            { from: 1, to: 1, name: "Data updated", color: "#0571B0" },
            {
              from: 2,
              to: 2,
              name: "Data same as yesterday",
              color: "#92C5DE",
            },
            { from: 3, to: 3, name: "HTML has changed", color: "#F88600" },
            {
              from: 4,
              to: 4,
              name: "HTML hasn't been resolved",
              color: "#FFD7A9",
            },
            { from: 5, to: 5, name: "Retrieval failed", color: "#CA0020" },
          ],
        },
      },
    },
    xaxis: {
      position: "top",
      tickPlacement: "between",
      type: "datetime",
      categories: __CATEGORIES,
      labels: {
        style: { cssClass: "date-yaxis-label" },
        formatter: function (e, t, a) {
          return moment(new Date(t)).format("DD MMM");
        },
      },
      tooltip: { enabled: !1 },
    },
    yaxis: {
      labels: {
        show: !0,
        align: "right",
        minWidth: 150,
        maxWidth: 300,
        style: { cssClass: "province-yaxis-label" },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
      },
    },
    legend: {
      position: "top",
      fontSize: "14px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 300,
      // labels: { colors: "#969696" },
      markers: { radius: 2 },
    },
    tooltip: {
      x: { show: !1 },
      y: { show: !1 },
      custom: function ({
        series: e,
        seriesIndex: t,
        dataPointIndex: a,
        w: o,
      }) {
        return (
          '<div class="block-tool-tip p-2"><b>' +
          __OURARRAY[t].name +
          "</b><p class='mb-1 mt-2'><small class='tt-sm text-secondary'>Last updated</small><br/><span class='tt-val text-dark'>" +
          __OURARRAY[t].updated[a] +
          "</span></p><p class='mb-1'><small class='tt-sm text-secondary'>Positif cases</small><br/><span class='tt-val text-dark'>" +
          __OURARRAY[t].newcases[a] +
          "</span></p><p class='mb-1 text-dark'><small class='tt-sm text-secondary'>Status</small><br/>" +
          __OURARRAY[t].status[a] +
          "</p><p class='mb-1'><small class='tt-sm text-secondary'>Source</small><br/><span class='tt-val text-dark'>" +
          __OURARRAY[t].source[a] +
          "</span></p><p class='mb-1'><small class='tt-sm text-secondary'>Format</small><br/><span class='tt-val text-dark'>" +
          __OURARRAY[t].format[a] +
          "</span></p><p class='mb-1'><small class='tt-sm text-secondary'>Note</small><br/><span class='tt-val text-dark'>" +
          __OURARRAY[t].note[a] +
          "</span></p></div>"
        );
      },
    },
  };
  new ApexCharts(document.querySelector("#graphreport"), t).render();
  d3.select("#graphreport")
    .select(".apexcharts-legend.apexcharts-align-center.position-top")
    .style("left", "unset")
    .attr("class", "boge-ganteng apexcharts-legend text-right position-top");
}
function drawCalendar_section4() {
  let e = [];
  function t(e, t, a, o, r, n) {
    return (
      "<div class='p-2' style='width: 400px'><b>" +
      t +
      " </b><br/> " +
      e +
      "<hr/ class='my-1'><b>Date:</b> " +
      o +
      " - " +
      r +
      "<br/><b>Duration:</b>" +
      n +
      "<hr/ class='my-1'><b>Title:</b> " +
      FF.titleCase(a) +
      "</div>"
    );
  }
  d3.csv(base_url + "assets/csv/policies_selected.csv").then((a) => {
    a.forEach((a, o) => {
      if ("JB" == a.ISO && "" != a.DATE_ENDED) {
        "" == a.DATE_ENDED && (a.DATE_ENDED = "31/12/2020");
        let o = a.DATE_IMPLEMENTED.split("/"),
          n = a.DATE_ENDED.split("/"),
          i = new Date(parseInt(o[2]), parseInt(o[1]) - 1, parseInt(o[0])),
          s = new Date(parseInt(n[2]), parseInt(n[1]) - 1, parseInt(n[0]));
        var r = moment([parseInt(o[2]), parseInt(o[1]) - 1, parseInt(o[0])]);
        let l = moment([
            parseInt(n[2]),
            parseInt(n[1]) - 1,
            parseInt(n[0]),
          ]).diff(r),
          d = "";
        (l = moment.duration(l))._data.months > 1
          ? (d = l._data.months + " months ")
          : 1 == l._data.months && (d = l._data.months + " month "),
          l._data.days > 1
            ? (d += l._data.days + " days")
            : (d += l._data.days + " day");
        let c = [
          a.CATEGORY,
          a.MEASURE,
          t(
            a.CATEGORY,
            a.MEASURE,
            a.TITLE,
            a.DATE_IMPLEMENTED,
            a.DATE_ENDED,
            d
          ),
          i,
          s,
        ];
        e.push(c);
      }
      $("#calendar-gov").height(21 * e.length);
    });
  }),
    (function (e, t) {
      google.charts.load("current", { packages: ["timeline"] }),
        google.charts.setOnLoadCallback(function () {
          var a = document.getElementById(t),
            o = new google.visualization.Timeline(a),
            r = new google.visualization.DataTable();
          r.addColumn({ type: "string", id: "Role" }),
            r.addColumn({ type: "string", id: "Name" }),
            r.addColumn({ type: "string", role: "tooltip", p: { html: !0 } }),
            r.addColumn({ type: "date", id: "Start" }),
            r.addColumn({ type: "date", id: "End" }),
            r.addRows(e);
          o.draw(r, {
            timeline: { groupByRowLabel: !0, colorByRowLabel: !0 },
            tooltip: { isHtml: !0 },
            backgroundColor: "#fff",
            avoidOverlappingGridLines: !1,
          });
        });
    })(e, "calendar-gov");
}
function drawChartCaseGov(e, t) {
  var a = {
    series: e,
    title: {
      text: "Positive, deaths, and recovers cases during PSBB",
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 10,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        color: "#263238",
      },
    },
    subtitle: {
      // text:
      //   "Are covid cases increasing after government regulations to restrict mobilization?",
      text: undefined,
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 30,
      floating: !1,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: void 0,
        color: "#9699a2",
      },
    },
    chart: {
      type: "line",
      height: $("#chart-case-gov").height(),
      toolbar: { show: !1 },
    },
    colors: ["#f88600", "#ca0020", "#0572b0"],
    stroke: { width: 3 },
    dataLabels: { enabled: !1 },
    fill: { opacity: 1 },
    markers: { size: 0 },
    xaxis: { type: "datetime", categories: t },
    legend: { offsetY: 6 },
    annotations: {
      position: "back",
      xaxis: [
        {
          x: new Date("13 Mar 2020").getTime(),
          x2: new Date("13 Apr 2020").getTime(),
          fillColor: "#4285f4",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Social Distancing",
          },
        },
        {
          x: new Date("27 Mar 2020").getTime(),
          x2: new Date("09 Apr 2020").getTime(),
          fillColor: "#db4437",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Gov & SocEc",
          },
        },
        {
          x: new Date("30 Apr 2020").getTime(),
          x2: new Date("30 May 2020").getTime(),
          fillColor: "#f4b401",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Movement Restr.",
          },
        },
        {
          x: new Date("4 May 2020").getTime(),
          x2: new Date("29 Sep 2020").getTime(),
          fillColor: "#0e9d58",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Public Health",
          },
        },
      ],
    },
  };
  new ApexCharts(document.querySelector("#chart-case-gov"), a).render();
}
function drawAreaGoogle(e, t, a, o) {
  var r = {
    series: e,
    chart: { height: $(o).height(), type: "area", toolbar: { show: !1 } },
    title: {
      text: e[0].name,
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 10,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        // color: "#f1f1f1",
      },
    },
    colors: [a],
    dataLabels: { enabled: !1 },
    stroke: { width: 0, curve: "smooth" },
    xaxis: {
      type: "datetime",
      categories: t,
      // axisTicks: { color: "#757575" },
      // labels: { style: { colors: "#757575" } },
    },
    yaxis: {
      min: -80,
      max: 80,
      tickAmount: 4,
      // axisTicks: { color: "#757575" },
      // labels: { style: { colors: "#757575" } },
    },
    tooltip: { x: { format: "dd/MM/yy" } },
    grid: { yaxis: { lines: { show: !1 } } },
    fill: { type: "gradient", gradient: { opacityFrom: 0.9, opacityTo: 0.9 } },
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: "#263238",
          label: {
            // borderColor: "#263238",
            style: {
              fontSize: "10px",
              fontWeight: 300,
              // color: "#f1f1f1",
              background: "transparent",
            },
            text: "Baseline",
            position: "left",
            offsetX: -5,
            offsetY: 5,
          },
        },
      ],
      xaxis: [
        {
          x: new Date("13 Mar 2020").getTime(),
          x2: new Date("13 Apr 2020").getTime(),
          fillColor: "#4285f4",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              // color: "#f1f1f1",
              background: "transparent",
            },
            text: "Social Distancing",
          },
        },
        {
          x: new Date("27 Mar 2020").getTime(),
          x2: new Date("09 Apr 2020").getTime(),
          fillColor: "#db4437",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              // color: "#f1f1f1",
              background: "transparent",
            },
            text: "Gov & SocEc",
          },
        },
        {
          x: new Date("30 Apr 2020").getTime(),
          x2: new Date("30 May 2020").getTime(),
          fillColor: "#f4b401",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              // color: "#f1f1f1",
              background: "transparent",
            },
            text: "Movement Restr.",
          },
        },
        {
          x: new Date("4 May 2020").getTime(),
          x2: new Date("29 Sep 2020").getTime(),
          fillColor: "#0e9d58",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              // color: "#f1f1f1",
              background: "transparent",
            },
            text: "Public Health",
          },
        },
      ],
    },
  };
  new ApexCharts(document.querySelector(o), r).render();
}
function drawAreaGoogleGCV(e, t, a, o, r) {
  let n = e[0].name;
  e[0].name = e[0].name.replace(" percent change from baseline", "");
  var i = {
    series: e,
    chart: {
      height: $(o).height(),
      type: "area",
      toolbar: { show: !1 },
      id: r,
      group: "GCV-graph",
    },
    yaxis: {
      labels: { minWidth: 48, maxWidth: 55 },
      min: -80,
      max: 80,
      tickAmount: 4,
    },
    title: {
      text: n,
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 10,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        color: "#263238",
      },
    },
    colors: [a],
    dataLabels: { enabled: !1 },
    stroke: { width: 0, curve: "smooth" },
    xaxis: { type: "datetime", categories: t },
    tooltip: { x: { format: "dd/MM/yy" } },
    annotations: {
      xaxis: [
        {
          x: new Date("13 Mar 2020").getTime(),
          x2: new Date("13 Apr 2020").getTime(),
          fillColor: "#4285f4",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Social Distancing",
          },
        },
        {
          x: new Date("27 Mar 2020").getTime(),
          x2: new Date("09 Apr 2020").getTime(),
          fillColor: "#db4437",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Gov & SocEc",
          },
        },
        {
          x: new Date("30 Apr 2020").getTime(),
          x2: new Date("30 May 2020").getTime(),
          fillColor: "#f4b401",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Movement Restr.",
          },
        },
        {
          x: new Date("4 May 2020").getTime(),
          x2: new Date("29 Sep 2020").getTime(),
          fillColor: "#0e9d58",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Public Health",
          },
        },
      ],
    },
    fill: { type: "gradient", gradient: { opacityFrom: 0.9, opacityTo: 0.9 } },
  };
  new ApexCharts(document.querySelector(o), i).render();
}
function drawLineCaseGCV(e, t, a) {
  var o = {
    series: e,
    title: {
      text: "Positive, deaths, and recovers cases during PSBB",
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 10,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        color: "#263238",
      },
    },
    subtitle: {
      text: undefined,
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 30,
      floating: !1,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: void 0,
        color: "#9699a2",
      },
    },
    chart: {
      type: "line",
      height: $("#line-case-gcv").height(),
      toolbar: { show: !1 },
      id: a,
      group: "GCV-graph",
    },
    colors: ["#f88600", "#ca0020", "#0572b0"],
    stroke: { width: 3 },
    dataLabels: { enabled: !1 },
    fill: { opacity: 1 },
    markers: { size: 0 },
    xaxis: { type: "datetime", categories: t },
    yaxis: { labels: { minWidth: 48, maxWidth: 55 } },
    tooltip: { x: { format: "dd/MM/yy" } },
    legend: { offsetY: 6 },
    annotations: {
      xaxis: [
        {
          x: new Date("13 Mar 2020").getTime(),
          x2: new Date("13 Apr 2020").getTime(),
          fillColor: "#4285f4",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Social Distancing",
          },
        },
        {
          x: new Date("27 Mar 2020").getTime(),
          x2: new Date("09 Apr 2020").getTime(),
          fillColor: "#db4437",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Gov & SocEc",
          },
        },
        {
          x: new Date("30 Apr 2020").getTime(),
          x2: new Date("30 May 2020").getTime(),
          fillColor: "#f4b401",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Movement Restr.",
          },
        },
        {
          x: new Date("4 May 2020").getTime(),
          x2: new Date("29 Sep 2020").getTime(),
          fillColor: "#0e9d58",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Public Health",
          },
        },
      ],
    },
  };
  new ApexCharts(document.querySelector("#line-case-gcv"), o).render();
}
function drawLineCaseDailyGCV(e, t, a) {
  var o = {
    series: e,
    title: {
      text: "Daily Positive, deaths, and recovers cases during PSBB",
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 10,
      floating: !1,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: void 0,
        color: "#263238",
      },
    },
    subtitle: {
      text: undefined,
      align: "left",
      margin: 0,
      offsetX: 5,
      offsetY: 30,
      floating: !1,
      style: {
        fontSize: "12px",
        fontWeight: "normal",
        fontFamily: void 0,
        color: "#9699a2",
      },
    },
    chart: {
      type: "line",
      height: $("#line-case-daily-gcv").height(),
      toolbar: { show: !1 },
      id: a,
      group: "GCV-graph",
    },
    colors: ["#f88600", "#ca0020", "#0572b0"],
    stroke: { width: 3 },
    dataLabels: { enabled: !1 },
    fill: { opacity: 1 },
    markers: { size: 0 },
    xaxis: { type: "datetime", categories: t },
    yaxis: { labels: { minWidth: 48, maxWidth: 55 } },
    tooltip: { x: { format: "dd/MM/yy" } },
    legend: { offsetY: 6 },
    annotations: {
      xaxis: [
        {
          x: new Date("13 Mar 2020").getTime(),
          x2: new Date("13 Apr 2020").getTime(),
          fillColor: "#4285f4",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Social Distancing",
          },
        },
        {
          x: new Date("27 Mar 2020").getTime(),
          x2: new Date("09 Apr 2020").getTime(),
          fillColor: "#db4437",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Gov & SocEc",
          },
        },
        {
          x: new Date("30 Apr 2020").getTime(),
          x2: new Date("30 May 2020").getTime(),
          fillColor: "#f4b401",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Movement Restr.",
          },
        },
        {
          x: new Date("4 May 2020").getTime(),
          x2: new Date("29 Sep 2020").getTime(),
          fillColor: "#0e9d58",
          label: {
            borderColor: "transparent",
            style: {
              fontSize: "9px",
              fontWeight: 300,
              color: "#263238",
              background: "transparent",
            },
            text: "Public Health",
          },
        },
      ],
    },
  };
  new ApexCharts(document.querySelector("#line-case-daily-gcv"), o).render();
}
function drawSmallCalendar() {
  var e = {
    series: [
      {
        data: [
          {
            x: "Social Distancing",
            y: [
              new Date("13 Mar 2020").getTime(),
              new Date("13 Apr 2020").getTime(),
            ],
            fillColor: "#4285f4",
          },
          {
            x: "Governance and socio-economic measure",
            y: [
              new Date("27 Mar 2020").getTime(),
              new Date("09 Apr 2020").getTime(),
            ],
            fillColor: "#db4437",
          },
          {
            x: "Movement Restrictions",
            y: [
              new Date("30 Apr 2020").getTime(),
              new Date("30 May 2020").getTime(),
            ],
            fillColor: "#f4b401",
          },
          {
            x: "Public Health",
            y: [
              new Date("4 May 2020").getTime(),
              new Date("29 Sep 2020").getTime(),
            ],
            fillColor: "#0e9d58",
          },
        ],
      },
    ],
    plotOptions: { bar: { horizontal: !0 } },
    chart: { height: 200, type: "rangeBar", toolbar: { show: !1 } },
    xaxis: { type: "datetime" },
    yaxis: { show: !0 },
    grid: { row: { colors: ["#f3f4f5", "#fff"], opacity: 1 } },
    colors: ["#4285f4", "#db4437", "#f4b401", "#0e9d58"],
  };
  new ApexCharts(document.querySelector("#calendar-gcv"), e).render();
}
getData(),
  d3.csv(base_url + "assets/csv/daily_positif.csv").then((e) => {
    let t = [],
      a = [],
      o = [],
      r = [],
      n = [],
      i = [],
      s = [];
    e.forEach((e, n) => {
      t.push(e.Tgl),
        a.push(parseInt(e["Jawa Barat"])),
        o.push(parseInt(e["Sumatera Utara"])),
        r.push(parseInt(e["Sulawesi Selatan"]));
    }),
      d3.csv(base_url + "assets/csv/download-baseline.csv").then((e) => {
        function l(e) {
          return 1 == e
            ? "#0572b0"
            : 2 == e
            ? "#92c6de"
            : 3 == e
            ? "#f88600"
            : 4 == e
            ? "#ffd7a9"
            : 5 == e
            ? "#ca0020"
            : void 0;
        }
        e.forEach((e, t) => {
          let a = {
              x: new Date(e.date.split("-").join(" ")).getTime(),
              x2: new Date(e.end_date.split("-").join(" ")).getTime(),
              fillColor: l(parseInt(e["Jawa Barat"])),
            },
            o = {
              x: new Date(e.date.split("-").join(" ")).getTime(),
              x2: new Date(e.end_date.split("-").join(" ")).getTime(),
              fillColor: l(parseInt(e["Sumatera Utara"])),
            },
            r = {
              x: new Date(e.date.split("-").join(" ")).getTime(),
              x2: new Date(e.end_date.split("-").join(" ")).getTime(),
              fillColor: l(parseInt(e["Sulawesi Selatan"])),
            };
          n.push(a), i.push(o), s.push(r);
        }),
          drawBarBaseline(
            a,
            t,
            n,
            "#covid-jabar-bar",
            "Daily positive cases in Jawa Barat"
          ),
          drawBarBaseline(
            o,
            t,
            i,
            "#covid-sumut-bar",
            "Daily positive cases in Sumatera Utara"
          ),
          drawBarBaseline(
            r,
            t,
            s,
            "#covid-sulsel-bar",
            "Daily positive cases in Sulawesi Selatan"
          );
      });
  }),
  drawCalendar_section4(),
  d3
    .json(
      "https://covid19-public.digitalservice.id/api/v1/rekapitulasi_v2/jabar/kumulatif"
    )
    .then((e) => {
      let t = [
          { data: [], name: "Positive case" },
          { data: [], name: "Deaths" },
          { data: [], name: "Recovers" },
        ],
        a = [],
        o = [
          { data: [], name: "Positive case" },
          { data: [], name: "Deaths" },
          { data: [], name: "Recovers" },
        ],
        r = [];
      e.data.content.forEach((e, n) => {
        a.push(e.tanggal),
          t[0].data.push(e.CONFIRMATION),
          t[1].data.push(e.confirmation_meninggal),
          t[2].data.push(e.confirmation_selesai),
          e.tanggal <= "2020-11-03" &&
            (r.push(e.tanggal),
            o[0].data.push(e.CONFIRMATION),
            o[1].data.push(e.confirmation_meninggal),
            o[2].data.push(e.confirmation_selesai));
      }),
        drawChartCaseGov(t, a),
        drawLineCaseGCV(o, r, "g7");
    }),
  d3
    .csv(base_url + "assets/csv/2020_ID_Region_Mobility_Report.csv")
    .then((e) => {
      let t = [],
        a = [{ name: "Residential percent change from baseline", data: [] }],
        o = [
          {
            name: "Retail and recreation percent change from baseline",
            data: [],
          },
        ],
        r = [{ name: "Parks percent change from baseline", data: [] }],
        n = [{ name: "Workplaces percent change from baseline", data: [] }],
        i = [
          { name: "Transit stations percent change from baseline", data: [] },
        ],
        s = [
          {
            name: "Grocery and pharmacy percent change from baseline",
            data: [],
          },
        ];
      e.forEach((e, l) => {
        "West Java" == e.sub_region_1 &&
          e.date >= "2020-03-01" &&
          (t.push(e.date),
          a[0].data.push(parseInt(e.residential_percent_change_from_baseline)),
          o[0].data.push(
            parseInt(e.retail_and_recreation_percent_change_from_baseline)
          ),
          r[0].data.push(parseInt(e.parks_percent_change_from_baseline)),
          n[0].data.push(parseInt(e.workplaces_percent_change_from_baseline)),
          i[0].data.push(
            parseInt(e.transit_stations_percent_change_from_baseline)
          ),
          s[0].data.push(
            parseInt(e.grocery_and_pharmacy_percent_change_from_baseline)
          ));
      }),
        drawAreaGoogle(a, t, "#8430ce", "#google1"),
        drawAreaGoogle(o, t, "#1967d2", "#google2"),
        drawAreaGoogle(r, t, "#188037", "#google3"),
        drawAreaGoogle(n, t, "#d56e0c", "#google4"),
        drawAreaGoogle(i, t, "#d01784", "#google5"),
        drawAreaGoogle(s, t, "#129eaf", "#google6"),
        drawAreaGoogleGCV(a, t, "#8430ce", "#google1-gcv", "g1"),
        drawAreaGoogleGCV(o, t, "#1967d2", "#google2-gcv", "g2"),
        drawAreaGoogleGCV(r, t, "#188037", "#google3-gcv", "g3"),
        drawAreaGoogleGCV(n, t, "#d56e0c", "#google4-gcv", "g4"),
        drawAreaGoogleGCV(i, t, "#d01784", "#google5-gcv", "g5"),
        drawAreaGoogleGCV(s, t, "#129eaf", "#google6-gcv", "g6");
    }),
  d3
    .json(
      "https://covid19-public.digitalservice.id/api/v1/rekapitulasi_v2/jabar/harian"
    )
    .then((e) => {
      let t = [
          { data: [], name: "Positive case" },
          { data: [], name: "Deaths" },
          { data: [], name: "Recovers" },
        ],
        a = [];
      e.data.content.forEach((e, o) => {
        e.tanggal <= "2020-11-03" &&
          (a.push(e.tanggal),
          t[0].data.push(e.CONFIRMATION),
          t[1].data.push(e.confirmation_meninggal),
          t[2].data.push(e.confirmation_selesai));
      }),
        drawLineCaseDailyGCV(t, a, "g8");
    }),
  drawSmallCalendar(),
  $(document).on("mousemove", function (e) {
    $("#our_tooltip").css({ left: e.pageX + 15, top: e.pageY - 20 }),
      $(".custom-control-input").on("click", function () {
        $(this).is(":checked")
          ? ($(".custom-control-input").prop("checked", !0),
            d3
              .selectAll(".apexcharts-annotation-rect")
              .style("visibility", "visible"),
            d3
              .selectAll(".apexcharts-xaxis-annotation-label")
              .style("visibility", "visible"),
            $(".legend-baseline-56").show())
          : ($(".custom-control-input").prop("checked", !1),
            d3
              .selectAll(".apexcharts-annotation-rect")
              .style("visibility", "hidden"),
            d3
              .selectAll(".apexcharts-xaxis-annotation-label")
              .style("visibility", "hidden"),
            $(".legend-baseline-56").hide());
      });
  });
