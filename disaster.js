
function addCSS( url, callback ) {
    var fileref = document.createElement("link");
    if( callback ) fileref.onload = callback;

    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", url);
    document.head.appendChild( fileref );
};

var disaster = SAGE2_App.extend({
init: function(data) {
    this.SAGE2Init("div", data);
    this.resizeEvents = "continuous"; // "onfinish";
    addCSS(this.resrcPath + "scripts/styles.css", null);
    console.log(data.id);
    console.log(this.element.id);
    this.element.id = "Ediv";
    console.log(this.element.id); //testing if div id
    //background in the element
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
    //div to hold sidebar
    this.sidebarDiv = document.createElement('div');
    this.sidebarDiv.id = 'sidebar';
    this.backgroundDiv.appendChild(this.sidebarDiv);
    //lists
    this.uoList = document.createElement("ul");
    this.sidebarDiv.appendChild(this.uoList);
    this.infraList = document.createElement("li");
    this.infraList.id = "list";
    this.uoList.appendChild(this.infraList);
    this.infraList.innerHTML = "Infrastructures List";
    this.hazardList = document.createElement("li");
    this.hazardList.id = "list";
    this.hazardList.innerHTML = "Hazards List";
    this.uoList.appendChild(this.hazardList);
    this.healthList = document.createElement("li");
    this.healthList.id = "list";
    this.healthList.innerHTML = "Health&Safety List";
    this.uoList.appendChild(this.healthList);
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
            layers:[mySelf.mapTile], zoomControl:                         false}).setView([34.7042, 135.494], 14);        console.log(data.id);

    });
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
    //type is appearance, sequence is position on dial, id is association for function
    this.controls.addButton({type:zoominButton, sequenceNo:5, id:"ZoomIn"});
    this.controls.addButton({type:zoomoutButton, sequenceNo:6, id:"ZoomOut"});
    this.controls.finishedAddingControls(); //important?

},
    
        //stuff
    ZoomIn: function(date){
        var z = this.map.getZoom();
        if (z <= 19)
        {
            this.map.setZoom(z+1, {animate:false});
        }
        this.lastZoom = date;
        var z2 = this.map.getZoom();
    },

        ZoomOut: function(date){
            var z = this.map.getZoom();
            if (z >= 3)
            {
                this.map.setZoom(z-1, {animate:false});
            }
        },

            load: function(date) {
                this.refresh(date);
            },

                draw: function(date) {
                },

                    resize: function(date) {



                        this.refresh(date);
                    },

                        event: function (eventType, pos, user, data, date) {
                            if (eventType === "pointerPress" && (data.button ==='left') ) {
                                this.dragging = true;
                                this.position.x = pos.x;
                                this.position.y = pos.y;
                            }
                            else if (eventType === "pointerMove" && this.dragging) {
                                //animation is off or else pan stutters
                                this.map.panBy([this.position.x - pos.x, this.position.y - pos.y], {animate: false});
                                this.position.x = pos.x;
                                this.position.y = pos.y;
                            }
                            else if (eventType === "pointerRelease" && (data.button === 'left') ) {
                                this.dragging = false;
                                this.position.x = pos.x;
                                this.position.y = pos.y;
                            }
                            //widget button events
                            else if(eventType === "widgetEvent"){
                                switch(data.ctrlId){
                                    case "ZoomIn":
                                        this.ZoomIn(date);
                                        console.log("We're ZOOMING");
                                        break;
                                    case "ZoomOut":
                                        this.ZoomOut(date);
                                        console.log("We're not ZOOMING");
                                        break;
                                    default:
                                        console.log("No handler for:", data.ctrlId);
                                        return;
                                }
                            }

                            this.refresh(date);
                        },

                            quit: function() {
                                this.log("Done");
                            }

});