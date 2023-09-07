module.exports.Query = {
    products: (parent, { filter }, { products, reviews }) => {
        let filteredProducts = products;

        if(filter){
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
    },
    product: (parent, { id }, { products }) => {
        return products.find(el => el.id === id);
    },
    categories: (parent, args, { categories }) => categories,
    category: (parent, { id }, { categories }) => {
        return categories.find(el => el.id === id);
    }
}