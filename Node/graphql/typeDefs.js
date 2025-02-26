const { gql } = require('graphql-tag');

module.exports = gql`
  type Recipe {
    name: String,
    description: String,
    createdAt: String,
    thumbsUp: Int,
  }

  input RecipeInput {
    name: String,
    description: String
  }

  type Query {
    recipe(ID: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]
    getRecipeByName(name: String!): [Recipe]
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(ID: ID!): Boolean
    editRecipe(ID: ID!, recipeInput: RecipeInput): Boolean
  }
`;
