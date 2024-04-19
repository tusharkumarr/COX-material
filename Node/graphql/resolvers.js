const Recipe=require('../models/Recipe');
module.exports={
    Query:{
        async recipe(_,{ID}){
            return await Recipe.findById(ID)
        },
        async getRecipes(_,{amount}){
            return await Recipe.find().sort({createdAt:-1}).limit(amount)
        },
        async getRecipeByName (_, { name }) {
          return await Recipe.find({ name });
        }
    },
    Mutation:{
        createRecipe: async (_, { recipeInput: { name, description } }) => {
            try {
            //   console.log(description); // For debugging purposes
              const createdRecipe = new Recipe({
                name: name,
                description: description,
                createdAt: new Date().toString(),
                thumbsUp: 0,
                thumbsDown: 0
              });
              console.log(createdRecipe); // For debugging purposes
              const res = await createdRecipe.save();
              return {
                id: res.id,
                ...res._doc
              };
            } catch (error) {
              // Handle any errors that occur during the creation process
              console.error("Error creating recipe:", error);
              throw new Error("Failed to create recipe");
            }
          },
        deleteRecipe: async(_,{ID})=>{
            const wasDeleted=(await Recipe.deleteOne({_id:ID})).deletedCount
            return wasDeleted;
        },
        editRecipe:async(_,{ID, recipeInput:{name,description}})=>{
            const wasEdited=(await Recipe.updateOne({_id:ID},{name:name,description:description})).modifiedCount;
            return wasEdited;
        }

    }
}