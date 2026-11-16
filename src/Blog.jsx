import{useState,useEffect} from "react";
import{Link} from "react-router-dom";
import  "./blog.css";
function Blog(){
 const [data,setData]=useState(""); 
 const[posts,setPosts]=useState([]);
 useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res)=>res.json ())
    .then((result)=>setPosts(result));
 },[] );
 const handleChange=(e) => {
    setData(e.target.value);
 };
 const handleAddPost = () => {
 if(data.trim()==="") return;
 fetch("https://jsonplaceholder.typicode.com/posts", {
    method:"POST",
    body:JSON.stringify({
        title:data,
    body:"New Post"  ,
    userId:1,
    }),
    headers:{
    "Content-type":"application/json;charset=UTF-8" ,
    },
})
.then((res) =>res.json())
.then((newPost) => {
    newPost.id=Date.now();
    setPosts.id=Date.now();
    setPosts([newPost,...posts]);
    setData("");
});
 };
 const handleDeletePost=(id) => {
 fetch(`https://jsonplaceholder.typicode.com/{id}`, {
    method:"DELETE",
 }).then(() => {
 setPosts(posts.filter((post) =>post.id!==id)) ;
 });
};
 return (
    <div className="blog-container">
 <h1>Blog Page</h1>
 <div className="input-group" >
 <input 
 type="text" 
 placeholder="Enter What You Think"
 value={data}
 onChange={handleChange}
 />
 <button className="btn-add" onClick={handleAddPost} >
    Publish
    </button>
    </div>
 <ul className="posts-list" >
  {posts.map((post) => (
    <li key={post.id} className="post-card" >
 <Link to={`/post/${post.id}`} style={{ textDecoration:"none",color:"inherit"}}>
 <h3>{post.title}</h3>
 </Link>
 <p>{post.body}</p>  
 <button
 className="btn-delete" 
 onClick={() => handleDeletePost(post.id) }
 >
    delete
    </button>
    </li>
  ))}
  </ul>
  </div>
 );
};

       
            
export default Blog;