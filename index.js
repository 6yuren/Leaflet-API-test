///////////////////// 點資料 /////////////////////////

const pointList = [
    /*
    { y: 25.018, x: 121.540, title: "台大", url:"https://www.ntu.edu.tw/", content: "國立臺灣大學（簡稱臺灣大學、臺大、NTU），1928年創立於臺北市，是臺灣第一所高等教育機構，為中華民國學生人數最多的大專院校。前身為大日本帝國九所帝國大學之一的「臺北帝國大學」，1945年中華民國接收臺灣後經改制與易名始用現名。現設有11個學院、3個專業學院，下分56個學系、111個研究所與18個學位學程；另設有超過50餘個各學術領域之國家級或校級研究中心以及進修推廣部、臺大醫院等附屬機構，是全臺唯一學生人數超過三萬的高等教育學校。其擁有臺北市境內的3大校區、以及多處散布於全臺的分支校區與校地，總面積超過340平方公里（3萬4千公頃），佔臺灣土地總面積的百分之一。（來源：維基百科）" },
    { y: 24.945, x: 121.371, title: "北大", url:"https://www.ntpu.edu.tw/", content: "國立臺北大學，簡稱北大、NTPU，是中華民國（臺灣）一所國立大學，前身為1949年創立的「臺灣省立地方行政專科學校」、1955年改制的「臺灣省立法商學院」以及1961年整併成立臺灣省立中興大學的法商學院（中興法商）與臺北進修部，2000年時脫離國立中興大學獨立設校，並改為現名。現校本部位於新北市三峽區，原臺北校區則規劃為進修暨推廣部和在職專班所使用。（來源：維基百科）" },
    { y: 22.997, x: 120.217, title: "成大", url:"https://www.ncku.edu.tw/", content: "國立成功大學（簡稱成大、成功大學）是南臺灣首座國立綜合大學，位於臺南市東區，名稱由來為紀念延平郡王鄭成功開臺之功，前身為1931年台灣日治時期創辦的「臺灣總督府臺南高等工業學校」，二戰後國民政府於1946年接收，改制為「臺灣省立臺南工業專科學校」，同年底升格為「臺灣省立工學院」（臺灣省僅有的省立學院，為農學院、法商學院、師範學院），1971年改制為國立成功大學。校園除由相鄰7校區組成的校本部，另有安南校區、歸仁校區、斗六校區、附屬臺南工業高級中等學校和附屬高級工業職業進修學校。（來源：維基百科）" },
    // 添加更多的點...
    */
  ];
const pointLayer = L.layerGroup().addTo(lMap);
  
///////////////////// 線資料 /////////////////////////

  const lineList = [
    /*
    {
      points: [
        { y: 24, x: 121 },
        { y: 24.5, x: 121.3 },
        { y: 25, x: 121.5 },
      ],
      name: "山脈A",
      length: 10,
    },
    {
      points: [
        { y: 23.8, x: 121.2 },
        { y: 23.3, x: 121.1 },
        { y: 22.8, x: 120.9 },
      ],
      name: "山脈B",
      length: 15,
    },
    // 添加更多的線...
    */
  ];
const lineLayer = L.layerGroup().addTo(lMap);

///////////////////// 面資料 /////////////////////////
  
  const polygonList = [
    /*
    {
        points: [
            { x: 121.36, y: 25.05 },
            { x: 121.79, y: 24.98 },
            { x: 121.41, y: 24.71 },
        ],
        fillColor: '#ffd966',
        strokeColor: '#D5D5D5',
        strokeWidth: 1,
        name: "A區",
        area: 15.6,
    },
    {
        points: [
            { x: 120.63, y: 23.53 },
            { x: 121.25, y: 23.62 },
            { x: 121.14, y: 23.13 },
            { x: 120.47, y: 22.96 },
        ],
        fillColor: '#6aa84f',
        strokeColor: '#D5D5D5',
        strokeWidth: 1,
        name: "B區",
        area: 20.2,
    },
    // 添加更多的面...
    */
];
const polygonLayer = L.layerGroup().addTo(lMap); 

///////////////////////////////////////////////////////

polygonList.forEach((polygonfeature) => {
    const leafletPolygonList = polygonfeature.points.map((item) => [item.y, item.x]);
    const polygon = L.polygon(leafletPolygonList, {
        fillColor:`${polygonfeature.fillColor}`,
        color:`${polygonfeature.strokeColor}`,
        weight:`${polygonfeature.strokeWidth}`,
        fillOpacity: .8,
    });
    polygon.bindPopup(`<h3>${polygonfeature.name}</h3><p>面積：${polygonfeature.area}平方公里</p>`)
    polygon.addTo(polygonLayer);
});
   
lineList.forEach((line) => {
    const coordinates = line.points.map((point) => [point.y, point.x]);
    const polyline = L.polyline(coordinates, { color: "red" });
    polyline.bindPopup(`<h3>${line.name}</h3><p>長度：${line.length} km</p>`);
    polyline.addTo(lineLayer);
});

pointList.forEach((point) => {
    const marker = L.marker([point.y, point.x]);
    marker.bindPopup(`<h3>${point.title}</h3><p>${point.content}</p><a href=${point.url}>校園網站</a>`);
    marker.addTo(pointLayer);
});

///////////////////// KML 圖層 /////////////////////////

const NTU = new L.KML("ntu.kml", { async: true });//.on("loaded", (e) => {lMap.fitBounds(e.target.getBounds());});
const NTUKmlLayer = L.layerGroup().addLayer(NTU);

const TaipeiBikeRiver = new L.KML("TPBikeRiver.kml", { async: true });
const TaipeiBikeRiverKmlLayer = L.layerGroup().addLayer(TaipeiBikeRiver);

const TaipeiBikeWay = new L.KML("TPBikeWay.kml", { async: true });
const TaipeiBikeWayKmlLayer = L.layerGroup().addLayer(TaipeiBikeWay);

///////////////////// GeoJSON 圖層 /////////////////////

const treeGeoJSONLayer = L.layerGroup();
async function loadTreeData() {
      const response = await fetch("tree.json");
      const json = await response.json();
      return json;
  };
loadTreeData().then((json) => {
    const tree = L.geoJSON(json, { 
    /*
    // 資訊視窗顯示 properties 中的所有內容
    onEachFeature: function (feature, layer) 
    {layer.bindPopup('<pre>'+JSON.stringify(feature.properties,null,' ').replace(/[\{\}",]/g,'')+'</pre>');}
    */
    
     // 顯示特定欄位內容
    onEachFeature: function (feature, layer) 
        {layer.bindPopup(
        '<h2>編號：' + feature.properties.id_1 + '</h2>' +
        '<div>地點：' + feature.properties.location + '</div>' +
        '<a href="' + feature.properties.tree_URL + '">官方網站</a>'
        );}
    
    });
    treeGeoJSONLayer.addLayer(tree);
    // 調整地圖範圍以顯示所有樹的位置
    // lMap.fitBounds(tree.getBounds());
});


///////////////////// WMS 圖層 /////////////////////////

const Town = L.tileLayer.wms("http://wms.nlsc.gov.tw/wms", { // 國土測繪中心 WMS 鄉鎮市界
    layers: "TOWN",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
});
const TownWmsLayer = L.layerGroup().addLayer(Town);

const EMAP = L.tileLayer.wms("http://wms.nlsc.gov.tw/wms", { // 國土測繪中心 WMS 臺灣通用電子地圖(等高線+門牌)
    layers: "EMAP5",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
});
const EMAPWmsLayer = L.layerGroup().addLayer(EMAP);

const EMAPGray = L.tileLayer.wms("http://wms.nlsc.gov.tw/wms", { // 國土測繪中心 WMS 臺灣通用電子地圖(灰階)
    layers: "EMAP01",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
});
const EMAPGrayWmsLayer = L.layerGroup().addLayer(EMAPGray);

const Road = L.tileLayer.wms("http://wms.nlsc.gov.tw/wms", { // 國土測繪中心 WMS 道路路網
    layers: "ROAD",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
});
const RoadWmsLayer = L.layerGroup().addLayer(Road);

const Photo = L.tileLayer.wms("http://wms.nlsc.gov.tw/wms", { // 國土測繪中心 WMS 正射影像圖（通用）
    layers: "PHOTO2",
    styles: "default",
    bgcolor: "0xFFFFFF",
    transparent: true,
    format: "image/png",
    version: "1.1.1",
    uppercase: true, //  WMS request parameter keys will be uppercase.
    crs: L.CRS.EPSG3857,
    opacity: 1,
});
const PhotoWmsLayer = L.layerGroup().addLayer(Photo);

/////////////////////// WMTS 圖層 ////////////////////////
const LandUse = L.tileLayer("https://wmts.nlsc.gov.tw/wmts/LUIMAP/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    maxZoom: 18,
    id: "LUIMAP",
});
const LandUseWmtsLayer = L.layerGroup().addLayer(LandUse);

/////////////////////// 基本底圖 /////////////////////////

const mapboxStreet = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVycnlsaWFvIiwiYSI6ImNrdGVkYWJueTJveWEycm84NzZrMXJyZjAifQ.s8EyAc5U3E1c7wcN1qlE9w",
    {
    maxZoom: 18,
    attribution:
        '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: "mapbox.streets",
    }).addTo(lMap);

const openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 
    {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
    });

////////////////////// 圖層控制 ///////////////////////////

  const overlayMaps = {
    // WMS 圖層
    "<span style='font-size:16px'>道路路網</span>": RoadWmsLayer,
    "<span style='font-size:16px'>鄉鎮市區界</span>": TownWmsLayer,

    // WMTS 圖層
    "<span style='font-size:16px'>國土利用現況調查成果圖</span><hr color='#F0F0F0'>": LandUseWmtsLayer,
/*
    // 向量圖層
    "<span style='font-size:16px'>保護區</span>": polygonLayer,
    "<span style='font-size:16px'>山脈</span>": lineLayer,
    "<span style='font-size:16px'>學校</span>": pointLayer,
*/
    // KML 圖層
    "<span style='font-size:16px'>台大校園</span>":NTUKmlLayer,
    "<span style='font-size:16px'>臺北市自行車道(河濱)</span>":TaipeiBikeRiverKmlLayer,
    "<span style='font-size:16px'>市區自行車道</span>":TaipeiBikeWayKmlLayer,

    // GeoJSON 圖層
    "<span style='font-size:16px'>海山地區百年老樹</span>":treeGeoJSONLayer,


  };
  
  const baseLayers = {
    "<span style='font-size:16px'>mapbox Street</span>": mapboxStreet, 
    "<span style='font-size:16px'>openTopoMap</span>": openTopoMap,
    "<span style='font-size:16px'>臺灣通用電子地圖(等高線+門牌)": EMAPWmsLayer,
    "<span style='font-size:16px'>臺灣通用電子地圖(灰階)":EMAPGrayWmsLayer,
    "<span style='font-size:16px'>正射影像圖(通用)":PhotoWmsLayer,
  };

  L.control.layers(baseLayers, overlayMaps).addTo(lMap);