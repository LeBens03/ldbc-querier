import Post from '../models/Post.js';

// Controller function to get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(100); 
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
};

// Controller function to get posts by year
export const getPostsByYear = async (req, res) => {
  const { year } = req.params;

  try {
    // Query posts with creationDate starting with the specified year
    const posts = await Post.find({
      creationDate: { $regex: `^${year}-` }
    });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'An error occurred while fetching posts' });
  }
};

// Controller function to get posts count by language
export const getPostsCountByLanguage = async (req, res) => {
    const languageMap = {
        de: "German",
        fa: "Persian",
        sv: "Swedish",
        ta: "Tamil",
        zh: "Chinese",
        es: "Spanish",
        en: "English",
        pt: "Portuguese",
        az: "Azerbaijani",
        cy: "Welsh",
        ar: "Arabic",
        mr: "Marathi",
    };

    try {
        const result = await Post.aggregate([
            {
              $match: {
                  language: { $exists: true, $nin: ['', null] },
              },
            },
            {
              $group: {
                  _id: "$language",
                  count: { $sum: 1 },
              },
            },
            {
              $sort: { count: -1 },
            },
        ]);

        // Replace language codes with names
        const mappedResult = result.map(({ _id, count }) => ({
            language: languageMap[_id] || _id, // Use code if not found in the map
            count,
        }));

        res.json(mappedResult);
    } catch (error) {
        console.error("Aggregation error:", error);
        res.status(500).json({ error: "Failed to aggregate posts by language" });
    }
};