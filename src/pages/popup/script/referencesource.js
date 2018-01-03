async function searchRefereneSource( name )
{
    const url = `https://referencesource.microsoft.com/api/symbols/?symbol=${name}`;
    res = (await (await fetch(url)).text());
    alist = new DOMParser().parseFromString(res,"text/html").querySelectorAll(".resultGroup>div:not(.resultGroupHeader)>a");
    const list = [];
    console.log(alist);
    for( let e of alist )
    {
        const desc = e.querySelector(".resultDescription");
        const kind = e.querySelector(".resultKind");
        if(desc && kind)
        {
            list.push( {
                displayName : desc.textContent,
                //displayName : e.querySelector(".resultName").text(),
                itemKind : kind.textContent,
                url : e.href
            });
        }
    };
    return list;
}

