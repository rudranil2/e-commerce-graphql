module.exports.Product = {
    category: (parent, args, { categories }) => {
        return categories.find(category => category.id === parent.categoryId);
    },
    reviews: ({ id }, args, { reviews }) => {
        return reviews.filter(review => review.productId === id);
    }
}