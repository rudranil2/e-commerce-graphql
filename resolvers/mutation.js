const { v4: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

exports.Mutation = {
    addCategory: (parent, { input }, { categories }) => {

        const { name } = input;
        const category = {
            id: uuid(),
            name
        };

        categories.push(category);
        return category;
    },
    addProduct: (parent, { input }, { products }) => {

        const { name, description, quantity, price, image, onSale, categoryId } = input;
        const product = {
            id: uuid(),
            name,
            description, 
            quantity, 
            price, 
            image, 
            onSale, 
            categoryId
        };

        products.push(product);
        return product;
    },
    addReview: (parent, { input }, { reviews }) => {

        const { date, title, comment, rating, productId } = input;
        const review = {
            id: uuid(),
            date, 
            title, 
            comment, 
            rating, 
            productId
        };

        reviews.push(review);
        return review;
    },
    deleteCategory: (parent, { id }, { categories, products }) => {

        const deletedCategory = categories.find(c => c.id === id);
        if(deletedCategory){
            const idx = categories.indexOf(deletedCategory);
            categories.splice(idx, 1);
            products.forEach(el => 
                el.categoryId = el.categoryId === id? null : el.categoryId
            );
    
            return deletedCategory;
        }

        throw new GraphQLError(`Category not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    },
    deleteProduct: (parent, { id }, { reviews, products }) => {

        const deletedProduct = products.find(product => product.id === id);
        if(deletedProduct){
            const idx = products.indexOf(deletedProduct);
            products.splice(idx, 1);
            reviews = reviews.filter(el => el.productId !== deletedProduct.id);
    
            return deletedProduct;
        }

        throw new GraphQLError(`Product not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    },
    deleteReview: (parent, { id }, { reviews }) => {
        const deletedReview = reviews.find(review => review.id === id);
        if(deletedReview){
            const idx = reviews.indexOf(deletedReview);
            reviews.splice(idx, 1);  
            return deletedReview;
        }

        throw new GraphQLError(`Review not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    },
    updateCategory: (parent, { id, input }, { categories }) => {
        const categoryIdx = categories.findIndex(c => c.id === id);
        if(categoryIdx > -1){
            categories[categoryIdx] = {
                ...categories[categoryIdx],
                ...input
            };
    
            return categories[categoryIdx];
        }

        throw new GraphQLError(`Category not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    },
    updateProduct: (parent, { id, input }, { products, categories }) => {
        const idx = products.findIndex(p => p.id === id);
        if(idx > -1){

            if(input.categoryId){
                if(categories.findIndex(c => c.id === input.categoryId) < 0)
                    throw new GraphQLError(`CategoryId does not exist`, {
                        extensions: {
                        code: 'BAD_REQUEST',
                        },
                    });
            }

            products[idx] = {
                ...products[idx],
                ...input
            };
    
            return products[idx];
        }

        throw new GraphQLError(`Product not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    },
    updateReview: (parent, { id, input }, { reviews }) => {
        const idx = reviews.findIndex(p => p.id === id);
        if(idx > -1){
            reviews[idx] = {
                ...reviews[idx],
                ...input
            };
    
            return reviews[idx];
        }

        throw new GraphQLError(`Review not found`, {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
        });
    }
}