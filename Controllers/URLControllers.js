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

    res.json({ message: "URL shortened successfully", data: data, success: true });
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

    // Redirect to original URL
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

    res.json({ message: "URL stats retrieved successfully", success: true, data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, success: false });
  }
};