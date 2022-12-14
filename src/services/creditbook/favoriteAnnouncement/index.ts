import { HttpClient } from '../http';

const PREFIX = 'announcement/favorite';

interface FavoriteParams {
  userId: string,
  announcementId: string
}

class FavoriteAnnouncementService extends HttpClient {
  async favorite(options: FavoriteParams) {
    return this.httpClient.post(PREFIX, options);
  }

  async remove(id: string) {
    return this.httpClient.delete(`${PREFIX}/${id}`);
  }
}

export const favoriteAnnouncementService = new FavoriteAnnouncementService();
