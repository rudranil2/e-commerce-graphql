const { gql } = require('apollo-server');

exports.typeDefs = gql`
    type Query {
        products(filter: ProductsFilterInput): [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }

    type Product {
        id: ID!,
        name: String!,
        description: String,
        quantity: Int,
        price: Float,
        image: String,
        onSale: Boolean,
        category: Category
        reviews: [Review!]!
    }

    type Category {
        id: ID!,
        name: String!
        products(filter: ProductsFilterInput): [Product!]!
    }

    type Review {
        id: ID!,
        date: String!,
        title: String!,
        comment: String!,
        rating: Int!
    }

    input ProductsFilterInput {
        onSale: Boolean
        averageRating: Int
    }

    type Mutation {
        addCategory(input: AddCategoryInput!): Category!
        addProduct(input: AddProductInput!): Product!
        addReview(input: AddReviewInput!): Review!
        deleteCategory(id: ID!): Category
        deleteProduct(id: ID!): Product
        deleteReview(id: ID!): Review
        updateCategory(id: ID!, input: AddCategoryInput): Category
        updateProduct(id: ID!, input: UpdateProductInput): Product
        updateReview(id: ID!, input: UpdateReviewInput): Review
    }

    input AddCategoryInput {
        name: String!
    }

    input AddProductInput {
        name: String!,
        description: String,
        quantity: Int,
        price: Float!,
        image: String,
        onSale: Boolean,
        categoryId: ID!
    }

    input AddReviewInput {
        date: String!,
        title: String!,
        comment: String!,
        rating: Int!,
        productId: ID!
    }

    input UpdateProductInput {
        name: String,
        description: String,
        quantity: Int,
        price: Float,
        image: String,
        onSale: Boolean,
        categoryId: ID
    }

    input UpdateReviewInput {
        title: String!,
        comment: String!,
        rating: Int!
    }
`