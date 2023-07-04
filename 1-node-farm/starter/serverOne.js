const http = require('http');
const url = require('url');
const fs = require('fs');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  //console.log(url.parse(req.url, true));
  // const pathName = req.url;
  //const {query, pathName} = url.parse(req.url, true)
  //console.log(pathName);

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathName = parsedUrl.pathname;
  const query = parsedUrl.searchParams;

  const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
  console.log(slugs);

  //overview
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%productCards%}', cardsHTML);

    res.end(output);

    //Product
  } else if (pathName === '/product') {
    const productId = query.get('id');
    const product = dataObj.find((el) => el.id == productId);
    // console.log(product);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // res.end('This is product!')
  } else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1> Page not found </h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
