function Blog(){
    return(
      <div className="blog-container">
            <h2 className="blog-title">Latest Articles</h2>
            <div className="blog-grid">
                <div className="blog-card">
                <video
        src={require('../images/profilecheck.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '350px', height: 'auto', maxHeight: '100px' }}>
        </video>
                    <h3 className="post-title">Top 5 Password Management Tips</h3>
                    <p className="post-date">Published on November 9, 2024</p>
                    <p className="post-content">
                        Password security is essential for protecting your online presence. In this article, we’ll share the top five tips for managing your passwords effectively...
                    </p>
                    <span className="read-more">Read more</span>
                </div>

                <div className="blog-card">
                <video
        src={require('../images/authenticate0.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '350px', height: 'auto', maxHeight: '100px' }}>
        </video>
                    <h3 className="post-title">Why Use a Password Manager?</h3>
                    <p className="post-date">Published on October 28, 2024</p>
                    <p className="post-content">
                        Password managers simplify the process of keeping track of all your passwords. Discover how Keyvault can help you save time and enhance security...
                    </p>
                    <span className="read-more">Read more</span>
                </div>

                <div className="blog-card">
                <video
        src={require('../images/profile.webm')} 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="background-video"
        style={{ width: '350px', height: 'auto', maxHeight: '100px' }}>
        </video>
                    <h3 className="post-title">Protecting Your Online Identity</h3>
                    <p className="post-date">Published on October 15, 2024</p>
                    <p className="post-content">
                        As our lives become increasingly digital, protecting your online identity is more important than ever. Learn the best practices for keeping your...
                    </p>
                    <span className="read-more">Read more</span>
                </div>
            </div>
        </div>
    );
}
export default Blog;  
