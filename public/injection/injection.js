(function(){
    const sel = document.getSelection().toString();
    if (sel && sel !== "") return sel;
    else {
        if (location.href.startsWith("https://msdn.microsoft.com/")) {
            return document.querySelector("meta[name='ms.assetid']").content.match(/.*?\:(.*?)$/)[1];
        } else if (location.href.startsWith("https://docs.microsoft.com/")) {
            return document.querySelector("meta[name='APIName']").content;
        } else if (location.href.startsWith("https://referencesource.microsoft.com/")) {
            return document.querySelector("#s").contentDocument.querySelector("#filePath").textContent.replace(/\\/g, ".").replace(".cs", "");
        } else if (location.href.startsWith("https://developer.xamarin.com/api/")){
            return document.querySelector("h1.named-header").textContent.match(/^[\w.]*/)[0]
        } else {
            return "";
        }
    }
})();