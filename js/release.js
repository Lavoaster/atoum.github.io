var Release = function() {
    var releases = fetch("https://api.github.com/repos/atoum/atoum/releases")
        .then(function(response) {
            return response.text()
        })
        .then(function(body) {
            return JSON.parse(body);
        });

    var latest = releases.then(function(releases) {
            return releases[0];
        });

    var phar = latest.then(function(latest) {
            return latest.assets;
        })
        .then(function(assets) {
            return assets.filter(function(asset) {
                return asset.name === "atoum.phar";
            })[0];
        });

    this.getVersion = function() {
        return latest.then(function(latest) { return latest.tag_name; });
    };

    this.getPharUrl = function() {
        return phar.then(function(phar) { return phar.browser_download_url; });
    };

    this.getPharShortUrl = function() {
        return phar.then(function(phar) {
            return phar.browser_download_url.replace("https://github.com/atoum/atoum", "");
        });
    };
};
