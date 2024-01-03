/* eslint-disable @typescript-eslint/no-explicit-any */
import { giphyService } from "@/services/http/giphy";

export class GiphyUtils {
  static async getTrendingGifs(
    setGifs: any,
    setLoading: (arg: boolean) => void,
  ) {
    try {
      const response = await giphyService.trending();
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  static async searchGifs(
    q: string,
    setGifs: any,
    setLoading: (arg: boolean) => void,
  ) {
    if (q.length <= 1) {
      GiphyUtils.getTrendingGifs(setGifs, setLoading);
      return;
    }
    try {
      const response = await giphyService.search(q);
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
}
