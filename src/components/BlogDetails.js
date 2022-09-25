import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { createClient } from 'contentful';

const BlogDetails = () => {

    const [singleBlogPost, setSingleBlogPost] = useState([])

    // Contentful API Keys
    const client = createClient({space: `${process.env.REACT_APP_BLOG_SPACE}`, accessToken: `${process.env.REACT_APP_BLOG_TOKEN}`})

    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        const getEntryById = async () => {
            try {
                const entryId = await client.getEntry(id)
                setSingleBlogPost(entryId)
                console.log(entryId)
            } catch (error) {
                console.error(error.message)
            }
        }

        getEntryById()
    }, [])
  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <Link to="/blogList" className="content-subhead">Blog Posts</Link>

              <section className="post" key={singleBlogPost?.sys?.id}>
                <header className="post-header">
                  <img src={singleBlogPost?.fields?.blogImage?.fields?.file?.url} title="" alt={singleBlogPost?.fields?.blogTitle} width="578" height="291" />
                  <h2 className="post-title pt-3">{singleBlogPost?.fields?.blogTitle}</h2>
                  <p className="post-meta">
                    By <a href="https://thecodeangle.com/" className="post-author">{singleBlogPost?.fields?.blogAuthor}</a> Date <span></span>
                    <small>
                        {singleBlogPost?.fields?.createdDate}
                    </small>
                  </p>
                </header>
                <div className="post-description">
                  <p>{singleBlogPost?.fields?.postContent}
                  </p>

                </div>
              </section>
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

export default BlogDetails
