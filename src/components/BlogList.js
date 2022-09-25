import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { Link } from 'react-router-dom';

const BlogList = () => {

    const [blogPosts, setBlogPosts] = useState([])

    // Contentful API Keys
    const client = createClient({space: `${process.env.REACT_APP_BLOG_SPACE}`, accessToken: `${process.env.REACT_APP_BLOG_TOKEN}`})

    // Fetching the data
    useEffect(() => {
        const getAllEntries = async () => {
            try {
                const entry = await client.getEntries()
                console.log(entry)
                setBlogPosts(entry)
            } catch (error) {
                console.error(error.message);
            }
        }
        getAllEntries()

    }, []);  

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <h1 className="content-subhead">Web Dev Blog</h1>

            {blogPosts?.items?.map((post) => 
              <section className="post" key={post.sys.id}>
                <header className="post-header">
                  <img src={post.fields.blogImage.fields.file.url} title="" alt={post.fields.blogTitle} width="578" height="291" />
                  <h2 className="post-title pt-3">{post.fields.blogTitle}</h2>
                  <p className="post-meta">
                    By <a href="https://thecodeangle.com/" className="post-author">{post.fields.blogAuthor}</a> Date <span></span>
                    <small>
                        {post.fields.createdDate}
                    </small>
                  </p>
                </header>
                <div className="post-description">
                  <p>{post.fields.blogSummary}
                  </p>
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    className="button button1">
                    Read More
                  </Link>
                </div>
              </section>
            )}
          </div>


          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu-item">
                <a href="http://twitter.com/thecodeangle" className="pure-menu-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogList
