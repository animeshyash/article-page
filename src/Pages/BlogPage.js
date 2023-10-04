import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../baseUrl";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { BlogDetails } from "../components/BlogDetails";

export const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const { loading, setLoading } = useContext(AppContext);
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    // console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
      // console.log(data.blog);
      // console.log(data.relatedBlogs);
    } catch (error) {}
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) fetchRelatedBlogs();
  }, [location.pathname]);

  return (
    <div className="">
      <Header />
      <div className="">
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      {loading ? (
        <div>
          <p>Loading</p>
        </div>
      ) : blog ? (
        <div className="mt-16 mb-10 mx-auto">
          <BlogDetails post={blog} />
          <h2 className="bg-red-200 mt-5 text-center text-[20px]">Related Blogs</h2>
          {relatedBlogs.map((post) => {
            return (
              <div className="mt-5 mb-5">
                <BlogDetails post={post} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>No Blog Found</p>
        </div>
      )}
    </div>
  );
};
