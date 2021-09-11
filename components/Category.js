import React, {useState,useEffect} from 'react'
import { filtering } from '../utils/filtering'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Category() {
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    

    const handleSort = (e) => {
        setSort(e.target.value)
        filtering({router, sort: e.target.value})
    }

    useEffect(() => {
        filtering({router, search: search ? search.toLowerCase() : 'all'})
    },[search])


    const router = useRouter()
    return (
        <div className="row justify-content-center">
        <div className="input-group" style={{width:"100%"}}>   

            <form autoComplete="off" className="mt-2 col-md-8 px-0 mx-auto">
               
                <input type="text" className="form-control" list="title_product"
                placeholder="Try 'CPU, GPU, Ryzen, GTX 1660'"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>


            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="custom-select text-capitalize"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="-price">Price: High-Low</option>
                     <option value="price">Price: Low-High</option>
                     <option value="brand">Brand</option>

                </select>
            </div>

        
        </div>

        <Link href="/create">
        <button type="button" class="btn btn-warning my-2">Post an Advertisement</button>
        </Link>
        </div>
    )
}
