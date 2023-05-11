const BlogPost = require("../../models/blogPost");

const create = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const blogPost = await BlogPost.create({
      ...body,
      author: res.locals.data.userId,
    });
    res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({}).lean();
    const blogPostsWithCounts = blogPosts.map((post) => {
      return {
        ...post,
        likesCount: post.likes.length,
        dislikesCount: post.dislikes.length,
      };
    });
    res.status(200).json(blogPostsWithCounts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findOne({ _id: id }).lean();
    if (!blogPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      const blogPostWithCounts = {
        ...blogPost,
        likesCount: blogPost.likes.length,
        dislikesCount: blogPost.dislikes.length,
      };
      res.status(200).json(blogPostWithCounts);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    console.log("request payload:", body);

    console.log("Updating blog post with ID:", id);

    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      console.log("Blog post not found");
      res.status(404).json({ message: "Blog post not found" });
      return;
    }

    if (blogPost.author.toString() !== res.locals.data.userId) {
      res
        .status(403)
        .json({ message: "You are not authorized to update this post" });
      return;
    }
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
    });

    console.log("Updated blog post:", updatedBlogPost);

    if (!updatedBlogPost) {
      console.log("Blog post not found after update");
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json({ post: updatedBlogPost });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      res.status(404).json({ message: "Blog post not found" });
    } else {
      res.status(200).json(deletedBlogPost);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const like = async (req, res) => {
  const userId = res.locals.data.userId;
  const postId = req.params.id;

  try {
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    let updatedBlogPost;

    if (blogPost.likes.indexOf(userId) !== -1) {
      // Remove userId from likes
      updatedBlogPost = await BlogPost.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true } // Return the updated document
      );
    } else {
      // Add userId to likes and remove from dislikes if present
      updatedBlogPost = await BlogPost.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { likes: userId }, $pull: { dislikes: userId } },
        { new: true } // Return the updated document
      );
    }

    res.status(200).json({
      ...updatedBlogPost._doc,
      likesCount: updatedBlogPost.likes.length,
      dislikesCount: updatedBlogPost.dislikes.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error liking the post", error: err });
  }
};
async function dislike(req, res) {
  const userId = res.locals.data.userId;
  const postId = req.params.id;

  try {
    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    let updatedBlogPost;

    if (blogPost.dislikes.indexOf(userId) !== -1) {
      // Remove userId from dislikes
      updatedBlogPost = await BlogPost.findOneAndUpdate(
        { _id: postId },
        { $pull: { dislikes: userId } },
        { new: true } // Return the updated document
      );
    } else {
      // Add userId to dislikes and remove from likes if present
      updatedBlogPost = await BlogPost.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { dislikes: userId }, $pull: { likes: userId } },
        { new: true } // Return the updated document
      );
    }

    res.status(200).json({
      ...updatedBlogPost._doc,
      likesCount: updatedBlogPost.likes.length,
      dislikesCount: updatedBlogPost.dislikes.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error disliking the post", error: err });
  }
}

const getByAuthor = async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const blogPosts = await BlogPost.find({ author: authorId });
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: "Error getting posts by author", error });
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  like,
  dislike,
  getByAuthor,
};

// const blogPostsController = require("../../controllers/api/blogPostsController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");
// const checkToken = require("../../config/checkToken");
