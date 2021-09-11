import connectDB from '../../../utils/connectDB'
import Items from '../../../models/itemModel'

connectDB()

export default async(req,res) =>{
    switch(req.method){
        case "GET":
            await getItem(req,res);
            break;
    }
}

const getItem = async(req,res) => {
    try {
        const {id} = req.query;
        const item = await Items.findById(id)
        if(!item) return res.status(400).json({
            err: "Something is wrong. This Product does not exist"
        })
        
        res.json({item})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }

}