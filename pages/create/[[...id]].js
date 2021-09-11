import Head from "next/head"
import { useState, useEffect, useContext } from "react"
import { DataContext} from "../../store/GlobalState"
import { imageUpload } from "../../utils/imageUpload"
import { postData } from "../../utils/fetchData"
import { useRouter } from "next/dist/client/router"
import Link from 'next/dist/client/link';

const ItemManager = () =>{
    const initialState = {
        title: "",
        price: "",
        description:"",
        location:"",
        brand: "",
        category: "",
        memory: "",
        contact_number: ""
    }

    const [item, setItem] = useState(initialState)
    const {title, price, description, location, brand, category, memory, contact_number} =  item

    const [images, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const {auth} = state

    const router = useRouter()



    // any changes in the form
    const handleChangeInput = e =>{
        const {name,value} = e.target
        setItem({...item,[name]: value})
        dispatch({type: "NOTIFY", payload: {} })

    }

    //upload Images
    const handleUploadInput = e =>{
        dispatch({type: "NOTIFY", payload: {} })
        let newImages = [];
        let num = 0;
        let err= ''

        const files = [...e.target.files]

        if(files.length === 0) dispatch({type: "NOTIFY", payload: {error: "No files selected"} }) 

        files.forEach(file =>{
            if(file.size> 1024 * 1024) err = "The largest image size should be 1MB"

            if(file.type !== 'image/jpge' && file.type !== 'image/png') err = "Image format is not supported"

            num += 1
            if(num <= 5)newImages.push(file)
            return newImages;
        })

        if(err) dispatch({type: "NOTIFY", payload: {error: err} })

        const imgCount = images.length
        if(imgCount + newImages.length > 5) dispatch({type: "NOTIFY", payload: {error: "Select up to 5 images"} })

        setImages([...images, ...newImages])

    }

    //unselecting images
    const deleteImage = index =>{
        const newArr = [...images]
        newArr.splice(index,1)
        setImages(newArr)
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(!title || !price  || !description || !location || !contact_number || images.length === 0)
        return dispatch({type: 'NOTIFY', payload: {error: 'Please add all the required fields.'}})
        

        dispatch({type: "NOTIFY", payload: {loading:true} })
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length >0) media = await imageUpload(imgNewURL)

        const res = await postData('item',{...item, images:[...imgOldURL, ...media]}, auth.token)
        if(res.err) return dispatch({type: "NOTIFY", payload: {error: res.err} })
       
        router.push('/')
        return dispatch({type: "NOTIFY", payload: {success: res.msg} })
        
    }


    const isAvailable = (index) =>{
        if(tab===index) return "Available"
        return "Not available"
    }



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

    return(
        <div className="products_manager" style={{color: "black"}}>
        <Head>
            <title>Post Your Ad</title>
        </Head>
        <form className="row" onSubmit={handleSubmit}>
            <div className="col-md-6">
                <label htmlFor="price">Title <span style={{color:"crimson"}}>*</span> </label>
                <input type="text" name="title" value={title}
                placeholder="Enter Title" className="d-block w-100 p-2"
                onChange={handleChangeInput} />

                <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="price" className="my-1">Price <span style={{color:"crimson"}}>*</span> </label>
                            <input type="number" name="price" value={price}
                            placeholder="Price" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="brand" className="my-1">Brand</label>
                            <input type="text" name="brand" value={brand}
                            placeholder="Try 'Intel, Asus'" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                </div>

                <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="memory" className="my-1">Memory (in GB)</label>
                            <input type="number" name="memory" value={memory}
                            placeholder="e.g. 1GB, 2GB" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="category" className="my-1">Category</label>
                            <input type="text" name="category" value={category}
                            placeholder="Try 'HDD, GPU, CPU'" className="d-block w-100 p-2"
                            onChange={handleChangeInput} />
                        </div>

                </div>


                
                <label htmlFor="contact_number" className="my-1">Phone Number <span style={{color:"crimson"}}>*</span> </label>
                <input type="text" name="contact_number" value={contact_number}
                placeholder="01XXXXXXXXX" className="d-block w-100 p-2"
                onChange={handleChangeInput} />
                      
                <label htmlFor="Location" className="my-1">Pick-up Location <span style={{color:"crimson"}}>*</span> </label>
                <input type="text" name="location" value={location}
                placeholder="Try 'Block-D, Road-13, Uttara'" className="d-block w-100 p-2"
                onChange={handleChangeInput} />

                <label htmlFor="Location" className="my-3">Additional Description <span style={{color:"crimson"}}>*</span> </label>
                <textarea name="description" id="description" cols="30" rows="4"
                placeholder="Add any additional information | Hint: More description equals more potential buyers" onChange={handleChangeInput}
                className="d-block w-100 p-2" value={description} />

            


                <button type="submit" className="btn btn-info my-2 px-4">
                    Create
                </button>

            </div>
{/* image uploader */}
            <div className="col-md-6 my-4">
             <label htmlFor="Location" >Add images<span style={{color:"crimson"}}>*</span> </label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{color: "black", background: "rgb(15,200,147)"}}>Upload</span>
                    </div>
                    <div className="custom-file border rounded" style={{backgroundColor: "white"}}>
                        <input type="file" className="custom-file-input"
                         multiple accept="image/*" onChange={handleUploadInput} />
                    </div>

                </div> 

                <div className="row img-up mx-0">
                    {
                        images.map((img, index) => (
                            <div key={index} className="file_img my-1">
                                <img src={img.url ? img.url : URL.createObjectURL(img)}
                                 alt="" className="img-thumbnail rounded" />
                                 <span onClick={deleteImage}>X</span>
                            </div>
                        ))
                    }
                </div>
        

            </div>

           
        </form>

        
    </div>
    )

}
export default ItemManager