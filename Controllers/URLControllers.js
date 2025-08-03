const shortid = require('shortid');
const URL = require('../Models/urlModel');


exports.shortenController = async (req, res) => {
  try {
    const { originalURL } = req.body;
    if (!originalURL) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    const code = shortid.generate();
    const shortURL = `https://shorturl.com/${code}`;

    const urlData = await URL.create({
      user: req.userId,   
      originalURL,
      shortURL,
      code
    });

    const data = { shortURL: urlData.shortURL, code: urlData.code };

    res.json({ message: "URL shortened successfully", URLObject: data, success: true });
  } catch (err) {
    console.error("Error in shortenController:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false   
    });
  }
};

exports.redirectController = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code) {
      return res.status(400).json({ message: "Code is required", success: false });
    }

    const urlData = await URL.findOne({ code });
    if (!urlData) {
      return res.status(404).json({ message: "URL not found", success: false });
    }

    // Increment click count
    urlData.clicks += 1;
    await urlData.save();

    // Check if the request expects JSON (Axios/fetch call)
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.json({
        success: true,
        message: "Original URL fetched successfully",
        URLObject: { originalURL: urlData.originalURL }
      });
    }

    // Otherwise, a normal redirect (for browsers clicking the link)
    res.redirect(urlData.originalURL);
    console.log(`Redirected to: ${urlData.originalURL}`);

  } catch (err) {
    console.error("Error in redirectController:", err);
    res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false
    });
  }
};

exports.statsController = async (req, res) => {
  try {
    const { code } = req.params;
    const url = await URL.findOne({ code }).populate("user", "email username");

    if (!url) {
      return res.status(404).json({ message: "URL not found", success: false });
    }

    const data = { 
      originalURL: url.originalURL,
      shortURL: url.shortURL,
      clicks: url.clicks,
      createdAt: url.createdAt,
      code: url.code,
      createdBy: url.user.username
    };

    res.json({ message: "URL stats retrieved successfully", success: true, URLObject: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};

// Get all URLs for the logged-in user
exports.getAllUrlsController = async (req, res) => {
  try {
    // Find all URLs belonging to this user
    const urls = await URL.find({ user: req.userId }).sort({ createdAt: -1 });

    res.json({ message : "Fetched URLs Successfull", success: true, URLObject:urls });
  } catch (err) {
    console.error("Error in getAllUrls:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error"
    });
  }
};