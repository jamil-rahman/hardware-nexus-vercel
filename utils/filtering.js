export const filtering = ({router, page, category, sort, search}) =>
{
    const query = router.query  
    const path= router.pathname

    

    // console.log({query})

    if(category) query.category = category;
    if(page) query.page = page
    if(search) query.search = search
    if(sort) query.sort = sort;

    //console.log(router.pathname)
    router.push({
        pathname: path,
        query: query
    })
}