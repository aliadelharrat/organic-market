module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT_NUTRIMENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT_DESC%}/g, product.description);
  output = output.replace(/{%PRODUCT_ID%}/g, product.id);
  if (!product.organic) {
    output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, "hidden");
  }
  return output;
};
