exports.showHome = (req, res) => {
  const topics = [
    { title: "Первая тема" },
    { title: "Вторая тема" }
  ];
  const username = null;

  res.render("index", { username, topics });
};