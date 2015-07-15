
function addCSS( url, callback ) {
    var fileref = document.createElement("link");
    if( callback ) fileref.onload = callback;

    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", url);
    document.head.appendChild( fileref );
};
function toggle(obj){
    var el = document.getElementById(obj);
    if (el.style.display != 'none' ) {
        el.style.display = 'none';
    }
    else {
        el.style.display = '';
    }
};


var disaster = SAGE2_App.extend({
    //master node reading data
    getNewData: function(meSelf){
        if(isMaster){console.log(this.leafletDiv.appId);
                     console.log(meSelf.leafletDiv.appId);
                     this.dealWithDataFunc = this.dealWithData.bind(this);
                     d3.json((this.resrcPath + "exampledata.json"), function(collection) {meSelf.dealWithDataFunc(collection);                                                              })
                    }
    },

    /////////////////////////////////////////////
    switchToggle: function(nameofinterest)
    {
        var selectedOnes = null;
        selectedOnes = d3.selectAll('#' + this.leafletDiv.appId + "_" + nameofinterest);
        if(selectedOnes.style("visibility") === ("visible")){
            selectedOnes.style("visibility", "hidden");
            console.log("if case passed for switch police");}
        else{
            selectedOnes.style("visibility", "visible"); console.log("else case passed for switch police");
        }
        console.log("toggle for switchpolice works");
    },
    switchFire: function()
    {
        var selectedOnes = null;
        selectedOnes = d3.selectAll('#' + this.leafletDiv.appId + "_" + "fire");
        if(selectedOnes.style("visibility") === ("visible")){
            selectedOnes.style("visibility", "hidden");
            console.log("if case passed for switch fire");}
        else{
            selectedOnes.style("visibility", "visible"); console.log("else case passed for switch fire");
        }
        console.log("toggle for fire works");
    },
    //////////////////////////////////////////////  

    init: function(data) {
        this.SAGE2Init("div", data);
        this.resizeEvents = "continuous"; // "onfinish";
        addCSS(this.resrcPath + "scripts/styles.css", null);
        console.log(data.id);
        console.log(this.element.id);
        this.element.id = "div" + data.id;
        console.log(this.element.id); //testing if div id
        //background in the element
        /*should convert deep pointer interactions to mouse events like mouse over, mouse button down, click, mouse button up.*/
        var Me = this;
        /////////////////////////////////////////////

        this.backgroundDiv = document.createElement('div');
        this.backgroundDiv.id = 'background';
        this.backgroundDiv.style.width = '100%';
        this.backgroundDiv.style.height = '100%';
        this.backgroundDiv.style.position = 'relative';
        this.element.appendChild(this.backgroundDiv);
        //div to hold the leaflet
        this.leafletDiv = document.createElement('div');
        this.leafletDiv.id = 'div';
        this.leafletDiv.style.width = '560px';
        this.leafletDiv.style.height = '100%';
        this.leafletDiv.style.position = 'absolute';
        this.backgroundDiv.appendChild(this.leafletDiv);
        this.leafletDiv.appId = "";
        this.leafletDiv.appId = this.element.id;
        //div to hold sidebar
        this.sidebarDiv = document.createElement('div');
        this.sidebarDiv.id = 'sidebar';
        this.backgroundDiv.appendChild(this.sidebarDiv);

        /////////////////////////////////////////////

        //lists
        this.uoList = document.createElement("ul");
        this.sidebarDiv.appendChild(this.uoList);
        this.infraList = document.createElement("li");
        //this.infraList.id = "list1";
        this.infraList.className = "list"
        this.uoList.appendChild(this.infraList);
        this.infraList.innerHTML = "Infrastructures List";
        this.infraList1 = document.createElement("li");
        this.infraList.appendChild(this.infraList1);
        this.infraList1.innerHTML = "Power";
        this.infraList1.className = "list_sub";
        this.infraList1.id = "list1_1";

        this.infraList2 = document.createElement("li");
        this.infraList.appendChild(this.infraList2);
        this.infraList2.innerHTML = "Transportation";
        this.infraList2.className = "list_sub";
        this.infraList2.id = 'list1_2'
        this.infraList3 = document.createElement("li");
        this.infraList.appendChild(this.infraList3);
        this.infraList3.innerHTML = "Water";
        this.infraList3.className = "list_sub"
        this.infraList3.id = 'list1_3';
        this.infraList4 = document.createElement("li");
        this.infraList.appendChild(this.infraList4);
        this.infraList4.innerHTML = "Gas";
        this.infraList4.className = "list_sub";
        this.infraList4.id = 'list1_4'
        this.hazardList = document.createElement("li");
        this.hazardList.id = "list2";
        this.hazardList.className = "list"
        this.hazardList.innerHTML = "Hazards List";
        this.hazardList1 = document.createElement("li");
        this.hazardList1.id = 'list2_1';
        this.hazardList.appendChild(this.hazardList1);
        this.hazardList1.innerHTML = "Fire";
        this.hazardList1.className = "list_sub";
        this.hazardList1.onclick = function(){isFire =toggleFlag(this.id,isFire);console.log(isFire);Me.switchToggle("fire");};
        this.hazardList1.onmouseover=function(){opacity = 0.1};
        this.hazardList2 = document.createElement("li");
        this.hazardList.appendChild(this.hazardList2);
        this.hazardList2.innerHTML = "Flood";    
        this.hazardList2.id = 'list2_2';
        this.hazardList2.className = "list_sub";
        this.hazardList2.onclick = function(){isFlood = toggleFlag(this.id, isFlood);console.log(isFlood);Me.switchToggle("flood");};
        this.hazardList3 = document.createElement("li");
        this.hazardList.appendChild(this.hazardList3);
        this.hazardList3.innerHTML = "Earthquake";
        this.hazardList3.className = "list_sub";
        this.hazardList3.id = 'list2_3';
        this.hazardList3.onclick = function(){isEQ =toggleFlag(this.id,isEQ);console.log(isEQ);Me.switchToggle("earthquake");};
        // this.hazardList.onclick = function(){toggleList(this.id);};
        this.uoList.appendChild(this.hazardList);
        this.healthList = document.createElement("li");
        this.healthList.id = "list3";
        this.healthList.innerHTML = "Health&Safety List";
        this.healthList.className = "list";
        this.uoList.appendChild(this.healthList);
        this.healthList1 = document.createElement("li");
        this.healthList.appendChild(this.healthList1);
        this.healthList1.innerHTML = "Hospital";
        this.healthList1.className = "list_sub";
        this.healthList1.id = 'list3_1';
        this.healthList1.onclick = function(){isHospital =toggleFlag(this.id,isHospital);console.log(isHospital);Me.switchToggle("hospital");};
        this.healthList2 = document.createElement("li");
        this.healthList.appendChild(this.healthList2);
        this.healthList2.innerHTML = "Police Department";
        this.healthList2.className = "list_sub";
        this.healthList2.id = 'list3_2';
        this.healthList2.onclick = function(){isPolice =toggleFlag(this.id,isPolice);console.log(isPolice);Me.switchToggle("police");};
        this.healthList3 = document.createElement("li");
        this.healthList.appendChild(this.healthList3);
        this.healthList3.innerHTML = "Fire Station";
        this.healthList3.className = "list_sub";
        this.healthList3.id = 'list3_3';
        this.healthList3.onclick = function(){isFireSt =toggleFlag(this.id,isFireSt);console.log(isFireSt);Me.switchToggle("FireSt");};

        /////////////////////////////////////////////

        //initializing toggle variable flags

        var isPolice = false;
        var isFireSt = false;
        var isHospital = false;
        var isFire = false;
        var isFlood = false;
        var isStorm = false;
        var isEQ = false;

        /////////////////////////////////////////////

        /*for making the hover effects*/
        var lists = document.getElementsByClassName('list_sub');
        for (i in lists){
            lists[i].onmouseover=function (event){this.style.opacity = 1};
            lists[i].onmouseout=function (event){this.style.opacity = 0.7};
        };

        /////////////////////////////////////////////

        //this is a sample toggle function to see if it works
        function toggleList(btId){
            if (Me.hazardList.className === 'list'+" "+'list2') {Me.hazardList.className = "list";console.log(Me.hazardList.className)}
            else{
                Me.hazardList.className = 'list'+" "+ 'list2';console.log(Me.hazardList.className);
            };
        };
        //toggle function to change toggle variable flags
        function toggleFlag(btId, btFlag){
            if (btFlag === true) {
                document.getElementById(btId).className = "list_sub" + " " + "red";}
            else{
                document.getElementById(btId).className = "list_sub" + " " + "green";}
            return !btFlag;

        };



        //end of UI

        /////////////////////////////////////////////

        //initializing parameters
        //need to set this to be true in order to tell SAGE2 that you will be needing Widget Controls
        this.enableControls = true;
        //SAGE 2 interaction
        this.map = null;
        this.lastZoom = null;
        this.dragging = null;
        this.position = null;
        //for SAGE2
        this.lastZoom = data.date;
        this.dragging = false;
        this.position = {x:0, y:0};

        //good habit to store variables for easier manipulation
        var width = this.element.clientWidth;
        var height = this.element.clientHeight;
        var mapURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var mapCopyright = '<a href="http://osm.org/copyright">OpenStreetMap</a>';
        var mySelf = this;
        //Load the CSS file for leaflet.css and use a callback function to ensure the css is loaded before doing anything with leaflet
        addCSS("uploads/apps/disaster/scripts/leaflet.css",            function(){
            console.log(mySelf.element.id);
            mySelf.mapTile = L.tileLayer(mapURL, {
                attribution:mapCopyright});
            mySelf.map = L.map(mySelf.leafletDiv.id,{
                layers:[mySelf.mapTile], zoomControl:                         true}).setView([34.7042, 135.494], 11);        console.log(data.id);

            /*initalize the SVG layer*/
            mySelf.map._initPathRoot();
            /*pick up SVG from map object*/
            /*making sure that Leaflet and D3 are synchronised in the view that they’re projecting. This synchronisation needs to occur in zooming and panning so we add an SVG element to Leaflet’soverlayPlane*/
            mySelf.svg = d3.select(mySelf.map.getPanes().overlayPane).select("svg");
            /*g element that ensures that the SVG element and the Leaflet layer have the same common point of reference*/
            mySelf.g = mySelf.svg.append("g");
            console.log('line 93 reached. Past mySelf.svg.append');
            mySelf.getNewDataFunc = mySelf.getNewData.bind(this);
            mySelf.getNewData(mySelf);

            // attach SVG into this.element node
            var box = "0,0,"+width*0.70+","+height;
            mySelf.svg = d3.select(mySelf.element).append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", box);
        })


        ;
        //adding the controls for the widget
        var zoominButton={
            "textual":true,
            "label":"+",
            "fill":"rgba(255,255,255,0.8)",
            "animation":false
        };
        var zoomoutButton={
            "textual":true,
            "label":"-",
            "fill":"rgba(255,255,255,0.8)",
            "animation":false
        };
        var policeButton = {
            "textual":true,
            "label":"Police",
            "fill":"rgba(255,255,255,0.8)",
            "animation":false
        };
        //type is appearance, sequence is position on dial, id is association for function
        this.controls.addButton({type:zoominButton, sequenceNo:5, id:"ZoomIn"});
        this.controls.addButton({type:zoomoutButton, sequenceNo:6, id:"ZoomOut"});
        this.controls.addButton({type:policeButton, sequenceNo:8, id:"Police"});
        this.controls.finishedAddingControls(); //important?

    },

    //stuff
    dealWithData: function(collection, today)
    {console.log(this.leafletDiv.appId);
     this.dealWithDataNodeFunc = this.dealWithDataNode.bind(this);
     this.broadcast("dealWithDataNode", {collection: collection, today:today});
    },
    dealWithDataNode: function(data){
        console.log(this.leafletDiv.appId);
        var me = this;
        var collection = data.collection;
        var today = new Date();
        collection.objects.forEach(function(d){
            //this if statement checks if x,y coordinates exists and sorts the Event between colors
            if(d.circle.coordinates[0] && d.circle.coordinates[1]){
                if (isNaN(d.circle.coordinates[0]))
                {console.log("latitude is not a #")};
                if (isNaN(d.circle.coordinates[1]))
                {console.log("longitude is not a #")};
                d.LatLng = new L.LatLng(d.circle.coordinates[0], d.circle.coordinates[1]);
                console.log("if case ran, new LatLng is set properly");
                d.name = d.circle.name;
                switch(d.circle.name){
                    case "fire":
                        d.color = "red"; break;
                    case "storm":
                        d.color = "yellow";break;
                    case "flood":
                        d.color = "blue"; break;
                    case "earthquake":
                        d.color = "brown"; break;
                    case "police":
                        d.color = "DarkMagenta"; break;

                }
                d.radius = d.circle.r;
                console.log(me.leafletDiv.appId);
                var myName = me.leafletDiv.appId;
                console.log(myName);
                d.id = myName + "_" + d.name;
                console.log(d.id);
            }
            else
            {d.LatLng = new L.LatLng(0,0);
             /*Add a LatLng object to each item in the dataset*/
             console.log("else case ran. LongLat unsuccessful");}
        });

        var me = this;

        var feature = this.g.selectAll("circle")
        .data(collection.objects)
        .enter()
        .append("circle")
        .style('stroke', 'black')
        .style("opacity", 0.8)
        .attr("id", function(d){ return d.id;})
        .style("fill", function(d){ return d.color;})
        .style("r", function(d){ return d.radius;})
        .style("visibility", "hidden");
        var feature2 = this.g.selectAll("text")
        .data(collection.objects)
        .enter()
        .append("text")
        .style("fill", "white")
        .style("stroke", "black")
        .style("font-size", "20px")
        .style("font-family", "Arial")
        .style("text-anchor", "middle")
        .style("stroke-width", "1")
        .style("visibility", "hidden")
        .attr("id", function(d){return d.id;})
        .text(function(d){ return d.name;});
        /*makes sure that when our view of what we’re looking at changes (we zoom or pan) that our d3 elements change as well;*/
        this.map.on("viewreset", update);
        update();
        console.log("var feature has ran along with update");
        function update() {
            feature.attr("transform",
                         function(d) { return "translate(" +
                me.map.latLngToLayerPoint(d.LatLng).x +","+
                me.map.latLngToLayerPoint(d.LatLng).y
                +")";
                                     }
                        );
            feature2.attr("transform",
                          function(d){
                return "translate(" +
                    (me.map.latLngToLayerPoint(d.LatLng).x) +","+ 
                    (me.map.latLngToLayerPoint(d.LatLng).y) +")";
            }
                         );

        }
        this.allLoaded = 1;
    },

    ////////////////////////////////

    ZoomIn: function(date){
        var z = this.map.getZoom();
        if (z <= 19)
        {
            this.map.setZoom(z+1, {animate:false});
        }
        this.lastZoom = date;
        var z2 = this.map.getZoom();
    },

    ////////////////////////////////////

    ZoomOut: function(date){
        var z = this.map.getZoom();
        if (z >= 3)
        {
            this.map.setZoom(z-1, {animate:false});
        }
    },

    /////////////////////////////////////


    load: function(date) {
        this.refresh(date);
    },

    draw: function(date) {
    },

    resize: function(date) {



        this.refresh(date);
    },

    event: function (eventType, pos, user, data, date) {
        //this was removed because of the addition of deep interactions using sagemep.processAndPassEvents, which allows us to directly click on the map 
        //  if (eventType === "pointerPress" && (data.button ==='left') ) {
        //  this.dragging = true;
        // this.position.x = pos.x;
        //  this.position.y = pos.y;
        //   }
        //   if (eventType === "pointerMove" && this.dragging) {
        //animation is off or else pan stutters
        //     this.map.panBy([this.position.x - pos.x, this.position.y - pos.y], {animate: false});
        //    this.position.x = pos.x;
        //  this.position.y = pos.y;
        //    }
        //if (eventType === "pointerRelease" && (data.button === 'left') ) {
        //  this.dragging = false;
        //this.position.x = pos.x;
        //this.position.y = pos.y;
        //}
        //widget button events
        if(eventType === "widgetEvent"){
            switch(data.ctrlId){
                case "ZoomIn":
                    this.ZoomIn(date);
                    console.log("We're ZOOMING");
                    break;
                case "ZoomOut":
                    this.ZoomOut(date);
                    console.log("We're not ZOOMING");
                    break;
                case "Police":
                    console.log(this);
                    this.switchToggle("police");
                    this.refresh(Date);
                    break;
                default:
                    console.log("No handler for:", data.ctrlId);
                    return;
            }
        }

        this.refresh(date);
        sagemep.processAndPassEvents( this.element.id, eventType, pos, user, data, date );
    },

    quit: function() {
        this.log("Done");
    }

});