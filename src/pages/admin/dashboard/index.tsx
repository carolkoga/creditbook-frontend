import ResponsiveLineCustom from '@components/Charts/Responsive/Line';
import { Stat } from '@components/pages/admin/Dashboard/Stat';
import { Section } from '@components/Section';
import { dashboardAdminServices, MonthsReportType } from '@services/creditbook/admin/dashboard';
import { useCallback, useEffect, useState } from 'react';

export default function DashboardPage() {
  const [monthsReports, setMonthsReports] = useState([] as MonthsReportType);
  const [stats, setStats] = useState({
    totalAnnouncementAsPremium: 0,
    totalAnnouncement: 0,
    totalUsersActive: 0,
  });

  const loadDashboardContent = useCallback(async () => {
    const panel = await dashboardAdminServices.panel();
    const months = await dashboardAdminServices.monthsReports();

    setStats(panel);
    setMonthsReports(months);
  }, []);

  useEffect(() => {
    loadDashboardContent();
  }, [loadDashboardContent]);

  return (
    <>
      <Section.Header>
        <Section.Title as="h1" textColor="dark">Dashboard</Section.Title>
      </Section.Header>

      <Section.Container>
        <Stat.List>
          <Stat.Container>
            <Stat.Text>{stats.totalAnnouncementAsPremium}</Stat.Text>
            <Stat.Label>Anúncios Premium</Stat.Label>
          </Stat.Container>

          <Stat.Container>
            <Stat.Text>{stats.totalAnnouncement}</Stat.Text>
            <Stat.Label>Total Anúncios</Stat.Label>
          </Stat.Container>

          <Stat.Container>
            <Stat.Text>{stats.totalUsersActive}</Stat.Text>
            <Stat.Label>Usuários Ativos</Stat.Label>
          </Stat.Container>
        </Stat.List>

      </Section.Container>

      {monthsReports.length > 0 && (
        <Section.Container>
          <ResponsiveLineCustom
            data={[{ id: 'Anúncios Cadastrados', data: monthsReports }]}
          />
        </Section.Container>
      )}

    </>
  );
}
