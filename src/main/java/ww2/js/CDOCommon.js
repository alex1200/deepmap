function CDOCommon(){}

function SearchObject(){
    this.term = "";
    this.secondartTerm = "";
    this.concordanceLimit = 10;
    this.fuzzy = false;
}

function SearchLocationObject(){
    this.lat = 10;
    this.lng = 10;
    this.radius = 10;
    this.concordanceLimit = 10;
    this.fuzzy = false;
}