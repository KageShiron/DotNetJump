async function searchMsdn( name )
{
    const url = `https://services.social.microsoft.com/searchapi/ja-JP/Msdn?query=${name}&amp;maxnumberedpages=5&amp;encoderesults=1&amp;highlightqueryterms=1`;
    const res = await (await fetch(url)).json();
    return res.data.results.map( x => { return {
        displayName : x.title,
        url : x.url
        }
    });
}