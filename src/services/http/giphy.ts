import { config } from "@/config";
import axios from "axios";

const GIPHY_URL = "https://api.giphy.com/v1/gifs";

class GiphyService {
  async search(query: string) {
    const response = await axios.get(`${GIPHY_URL}/search`, {
      params: { api_key: config.GIPHY_API_KEY, q: query },
    });
    return response;
  }

  async trending() {
    const response = await axios.get(`${GIPHY_URL}/trending`, {
      params: { api_key: config.GIPHY_API_KEY },
    });
    return response;
  }
}

export const giphyService = new GiphyService();
