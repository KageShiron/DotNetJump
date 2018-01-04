/*
interface DocsDotNetResult{
    displayName : string;
    url : string;
    itemType : ItemType;
    itemKind : ItemKind;
    description : string;
}

enum ItemType = "Type" | "Member" | "Namespace" ;
enum ItemKind = "Class" | "Struct" | "Enum" | "Namespace" | "Method" | "Constructor" | "Delegate" | "Property" | "Field";
*/
export default {
    searchDocs: async function (name) {
        console.log("searchDocs:"+name);
        if(!name && name === "")return null;
        const url = `https://docs.microsoft.com/api/apibrowser/dotnet/search?api-version=0.2&search=${name}`;
        const res = await (await fetch(url)).json();
        return res && res.results;
    },

    searchMsdn: async function (name) {
        console.log("searchMsdn:"+name);        
        if(!name && name === "")return null;        
        const url = `https://services.social.microsoft.com/searchapi/ja-JP/Msdn?query=${name}&amp;maxnumberedpages=5&amp;encoderesults=1&amp;highlightqueryterms=1`;
        const res = await (await fetch(url)).json();
        return res && res.data && res.data.results && res.data.results.map(x => {
            return {
                displayName: x.title,
                url: x.url
            }
        });
    },

    searchReferenceSource : async function (name) {
        if(!name && name === "")return null;
        console.log("searchReferenceSource:"+name);
        const url = `https://referencesource.microsoft.com/api/symbols/?symbol=${name}`;
        const res = (await (await fetch(url)).text());
        const alist = new DOMParser().parseFromString(`<base href="https://referencesource.microsoft.com/" />`+res, "text/html").querySelectorAll(".resultGroup>div:not(.resultGroupHeader)>a");
        const list = [];
        console.log(alist);
        for (let e of alist) {
            const desc = e.querySelector(".resultDescription");
            const kind = e.querySelector(".resultKind");
            const img = e.querySelector("img");
            if (desc && kind && img) {
                list.push({
                    icon: img.src,
                    displayName: desc.textContent,
                    //displayName : e.querySelector(".resultName").text(),
                    itemKind: kind.textContent,
                    url: e.href
                });
            }
        };
        return list;
    }
}
