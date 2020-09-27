function FeatureManager(){
    this.mapFeatures = new Array();
}

FeatureManager.prototype.load = function(search) {
    var self = this;
    webService.getFeatures(function (jsonResults)
    {
        var listSources = jsonResults;
        for(var i = 0; i < listSources.length; i++){
            var feature = listSources[i];
            self.mapFeatures[feature.UID] = feature;
        }

    });


};

FeatureManager.prototype.clear = function(){
};
