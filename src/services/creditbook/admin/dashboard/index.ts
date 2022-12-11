import { HttpClient } from '../../http/index';

interface MonthsReportType {
  x: string,
  y: number,
}

interface DashboardResponse {
  monthsReport: MonthsReportType,
  totalAnnouncementAsPremium: number,
  totalAnnouncement: number,
  totalUsersActive: number
}

class DashboardAdminServices extends HttpClient {
  async monthsReports() {
    const response = await this.httpClient.get<DashboardResponse>('/dashboard');

    return response.data.monthsReport;
  }

  async panel() {
    const response = await this.httpClient.get<DashboardResponse>('/dashboard');

    return {
      totalAnnouncementAsPremium: response.data.totalAnnouncementAsPremium,
      totalAnnouncement: response.data.totalAnnouncement,
      totalUsersActive: response.data.totalUsersActive,
    };
  }
}

export const dashboardAdminServices = new DashboardAdminServices();
