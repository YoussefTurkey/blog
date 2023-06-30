import data from "../data";

// [id].js

export default (req, res) => {
    
    const {postID} = req.query
    const {Posts} = data

    if(postID){
        const post = Posts.find( val => val.id == postID)
        return res.status(200).json(post)
    }

    return res.status(404).json({error: "Post Not Found!"})
}