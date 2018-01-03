async function searchDocs( name )
{
    const url = `https://docs.microsoft.com/api/apibrowser/dotnet/search?api-version=0.2&search=${name}`;
    const res = await (await fetch(url)).json();
    return res.results.map( x => x.source = "docs" );
}

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