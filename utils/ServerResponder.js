const serverResponder = async (res, data) => {
  try {
    let { message } = data;
    if (message == "error") {
      res.status(500).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ message: "error", error: "something went wrong" });
  }
};
module.exports = serverResponder;
