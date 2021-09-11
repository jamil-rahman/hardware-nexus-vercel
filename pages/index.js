import Head from 'next/head'
import {useState, useEffect, useContext} from 'react'
import { DataContext } from "../store/GlobalState";
import {getData} from '../utils/fetchData'
import HardwareItem from '../components/hardware/HardwareItem';
import { filtering } from '../utils/filtering';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import Category from '../components/Category';

export default function Home(props) {

  const [items,setItems] = useState(props.items);
  const [page, setPage] = useState(1)
  const router = useRouter();

  const { state} = useContext(DataContext);
  const { auth} = state;
  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  useEffect(() => {
    if(Object.keys(router.query).lenght===0) setPage(1)
    // {
     
    // }else{
    //   setPage(Number(router.query.page))
    // }
    
  }, [router.query])

  const handleLoadMore = () =>{
      setPage(page + 1)
      filtering({router, page: page + 1})
  }
  // console.log(items);

  if (!auth.user) {
    return (
      <div className="profile_page">
        <Head>
          <title>Oops!</title>
        </Head>
        <div
          className="row d-flex align-items-center justify-content-center"
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            color: "black"
          }}
        >
          <h1>It seems you have entered forbidden grounds</h1>

          <h3 className="my-5">
            If you have an account, try{" "}
            <Link href="/signin">
              <a style={{ color: "crimson" }}>logging in </a>
            </Link>{" "}
            for from here
          </h3>
          <br />
          <h3 className="my-3">
            Or, If you don't have an account, you can{" "}
            <Link href="/register">
              <a style={{ color: "crimson" }}>sign-up </a>
            </Link>
            from here
          </h3>
        </div>
      </div>
    );
  }
  return (
    <div className="home_page">
      <Head>
        <title>The Nexus</title>
      </Head>  

    <Category />

      <div className="items">
      {
        items.length === 0 
        ? <h2>No items available</h2>
        : items.map(item =>(
          <HardwareItem key={item._id} item={item} />
        ))
      }
      </div>  

      {
        props.result < page * 4 ? ""
        : <button className="btn btn-outline-info d-block mx-auto mb-4"
        onClick={handleLoadMore}>
          Load More
        </button>
      }

    </div>
  )
}

export async function getServerSideProps({query}){
  const page = query.page || 1
  const category  = query.category || 'all'
  const sort  = query.sort || ''
  const search  = query.search || 'all'
  
  const res = await getData(`item?limit=${page * 4}&category=${category}&sort=${sort}&key=${search}`)
 
  //  console.log(query);
  return{
    props: {
      items: res.items,
      result: res.result 
    },  //will be passed to the page component as props
  }
}