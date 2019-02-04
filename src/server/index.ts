import express from 'express';
import cookieParser from 'cookie-parser';
import { matchPath } from 'react-router-dom';
import TokenManager from './token';
import getRoot from './Root';

const app = express();
const port = 3000;
app.use(cookieParser());
app.use(express.static("public"));

app.get("/callback", (req, res) => {
  // github.com will hit "/callback" after user sign in using oauth, store token
  const token = req.query.code || "";
  if (token) {
    console.log("CALLBACK!!>>>", res)
    res.cookie("token", token)
    TokenManager.set(token);
    res.redirect('/user/wendy-c');
  }
});


app.get("*", (req, res) => {
  
  const routes = ["/", "/user/:user"];
  const match = routes.reduce((acc, route) => matchPath(req.url, { path: route, exact: true }) || acc, {})
  
  if (!match) {
    res.status(404).send("Page Not Found!");
    return;
  }

  if (req.cookies.token && req.url === "/") {
    TokenManager.set(req.cookies.token);
    res.redirect("/user/wendy-c");
    return;
  }

  const [html, styleTags] = getRoot(req.url);


  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta id="token" name="token" content=${TokenManager.get()}>
<meta name="author" content="">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
<title>PR Age Tracker</title>
${styleTags}
<style>
#app {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 14px;
  letter-spacing: .2px;
  color: "#181c1d";
}

a {
  text-decoration: none;
}
</style>
</head>
<body>
<div id="app">${html}</div>
</body>
</html>
`);
});

app.listen(port, () => {
  console.log(`[express] hosted at http://localhost:${port}`);
});
