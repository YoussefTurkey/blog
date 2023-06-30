import data from "../data";

// API --> Posts
export default (req, res) => {
    
    const {Posts} = data;
    if(Posts) return res.status(200).json(Posts);
    
    return res.status(404).json({error: "Data Not Found!"});
}