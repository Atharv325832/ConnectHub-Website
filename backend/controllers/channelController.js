const { Channel} = require('../models/channel')

const createChannel = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { name, type = "text", Server, topic = "", position = 0 } = req.body;

    if (!name || !Server) {
      return res.status(400).json({ message: "Name and server are required" });
    }

    const channel = await Channel.create({
      name: name.trim(),
      type,
      Server,
      topic: topic.trim(),
      position,
      createdBy: req.user.id,
    });

    return res.status(201).json(channel);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "A channel with that name already exists in this server.",
      });
    }

    return res.status(500).json({ message: err.message });
  }
};


const getChannels = async (req, res) => {
  try {
    const {server_id}  = req.params;

    if (!server_id) {
      return res.status(400).json({
        message: "Server ID is required",
      });
    }

    const channels = await Channel.find({ Server: server_id })
      .sort({ createdAt: 1 });

    res.status(200).json(channels);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch channels",
    });
  }
};

const deleteChannel = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const { id } = req.params;
    const channel = await Channel.findByIdAndDelete(id);
    console.log(channel);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.status(200).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const channel = await Channel.findByIdAndUpdate(
      id,
      { name },
      { returnDocument: "after" }
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  createChannel,
  getChannels,
  deleteChannel,
  updateChannel
};