const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

const port = 8000;

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/products.html`,
  "utf-8"
);

const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const tempProductCard = fs.readFileSync(
  `${__dirname}/templates/product-card.html`,
  "utf-8"
);

const data = fs.readFileSync(__dirname + "/data.json", "utf-8");
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

console.log(slugify("Fresh Avocados", { lower: true }));

const server = http.createServer(function (req, res) {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempProductCard, el))
      .join("");
    const output = tempOverview.replace(
      "{%PRODUCT_CARDS%}",
      cardsHTML.toString()
    );

    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);

    // Api page
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    console.log(productData);
    res.end(data);

    // Error page
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "adel-custom-header": "I am batman",
    });
    res.end("Page not found");
  }
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
