import{useState,useEffect} from "react";
import{useParams,Link} from "react-router-dom";
import"./Blog.css";
function PostDetails() {
 const{id} = useParams() ;
 const[post,setPost]=useState(null);
 useEffect(() => {
    fetch(`https://jsonplaceholder.typecode.com/posts/${id}`)
    .then((res) => {
        if(!res.ok) {
            throw new Error("The Post Not Found");
        }
        return res.json();
    })
    .then((result)=>setPost(result))
    .catch((err) => {
    console.error(err);
    setPost({
        id:id,
        userId:1,
        title:"sunt aut facere repellat provident occaecati",
        body:"quia et suscipit suscipit recusandae exedita et cum reprehender it moleestiace"
    });
});
 }, [id]);
 if(!post) {
 return <h2 style={{textAlign:"center"}}>Loading...</h2>;
 }
 return (
 <div style={{ padding:"20px" ,maxWidth:"600px",margin:"0 auto"}}>
    <Link to="/">Back to posts</Link>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
 <small>Post ID:{post.id}</small> 
 </div>
 );
}
export default PostDetails;  