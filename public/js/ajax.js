import { API_URL } from "./config.js";

class CallRecipeApi {
  static timeOut(time) {
    return new Promise(function (_, reject) {
      setTimeout(() => {
        reject(
          new Error(`Request took too long! Timeout after ${time} second`)
        );
      }, time * 1000);
    });
  }

  static async withRecipeName(recipeName) {
    try {
      const response = await fetch(`${API_URL}/search?q=${recipeName}`);

      const res = await Promise.race([response, this.timeOut(5)]);
      const data = await res.json();
      if (response.ok === false) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async withRecipeId(recipeId) {
    try {
      const response = await fetch(`${API_URL}/get?rId=${recipeId}`);
      const res = await Promise.race([response, this.timeOut]);
      let data = res.json();
      return data;
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  }
}

export default CallRecipeApi;
