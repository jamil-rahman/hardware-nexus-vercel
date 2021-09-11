import connectDB from '../../../utils/connectDB'
import Items from '../../../models/itemModel'

connectDB()

export default async(req,res) =>{
    switch(req.method){
        case "GET":
            await getItems(req,res);
            break;
        case "POST":
            await createItem(req, res)
            break;
    }
}



class APIfeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = {...this.queryString}

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete(queryObj[el]))

        if(queryObj.category !== 'all') this.query.find({category: queryObj.category})

        if(queryObj.key !== 'all') this.query.find({key: {$regex: queryObj.key} })
 
        


        this.query.find()
        return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join("")
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 4
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit)
        return this;
    }


}



// create post api
const getItems = async(req,res) => {
    try {

        const features = new APIfeatures(Items.find(), req.query).filtering().sorting().paginating()
        
        // console.log(req.query)
        const items = await features.query
        
        res.json({
            status:"success",
            result: items.length,
            items
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}



const createItem = async (req, res) => {
    try {
        const {title, price, memory, location, description, brand, category, images, contact_number, creatorAt, key} = req.body

        if(!title || !price  || !description || !location || !contact_number || images.length === 0)
        return res.status(400).json({err: 'Please add all the required fields.'})


        const newItem = new Items({
            title: title.toLowerCase(),
            price,
            memory,
            location: location.toLowerCase(),
            description: description.toLowerCase(),
            brand: brand.toLowerCase(),
            category: category.toLowerCase(),
            images,
            contact_number,
            key: title.toLowerCase() + " " + location.toLowerCase() + " " +  category.toLowerCase() + " " + brand.toLowerCase(),
            creatorAt
            
        })

        await newItem.save()

        res.json({msg: 'Success! Your Ad was succesfully posted!'})

    } catch (err) {
        return res.status(500).json({err: err.message})
        console.log(err)
    }
}