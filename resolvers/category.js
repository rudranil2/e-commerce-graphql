module.exports.Category = {
    products: ({ id }, { filter }, { products, reviews }) => {

        const allProducts = products.filter(el => el.categoryId === id);
        let filteredProducts = allProducts;

        if(filter && filteredProducts.length){
            const { onSale, averageRating } = filter;

            if(onSale !== null && onSale !== undefined){
                filteredProducts = filteredProducts.filter(el => el.onSale === onSale);
            }

            if(averageRating && [1,2,3,4,5].includes(averageRating)){
                filteredProducts = filteredProducts.filter(p => {
                    let numOfProducts = 0;
                    const totalRating = reviews.reduce((acc, el) => {
                        if(el.productId === p.id){
                            numOfProducts++;
                            return acc + el.rating;
                        }
                        return acc;
                    }, 0);

                    return averageRating <= (totalRating / numOfProducts);
                });
            }
        }
        
        return filteredProducts;
    }
}