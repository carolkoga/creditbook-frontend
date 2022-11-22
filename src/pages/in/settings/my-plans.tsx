import NotFoundData from '@components/NotFoundData';
import { ListMyPlans } from '@components/pages/in/Settings/ListMyPlans';
import MyPlanCard from '@components/pages/in/Settings/MyPlanCard';
import { StructureSettings } from '@components/pages/in/Settings/StructureSettings';
import { Section } from '@components/Section';
import { lawsuitService } from '@services/creditbook/lawsuit';
import { AnnouncementPlanType } from '@type/creditbook/Lawsuits';
import { handleCatchErrorRequest } from '@utils/handleCatchErrorRequest';
import { useCallback, useEffect, useState } from 'react';

export default function MyPlans() {
  const [plans, setPlans] = useState([] as AnnouncementPlanType[]);

  const loadAnnouncements = useCallback(async () => {
    try {
      const response = await lawsuitService.listPlans();
      setPlans(response.data);
    } catch (error) {
      handleCatchErrorRequest(error as never);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <StructureSettings>
      <Section.Header>
        <Section.Title>Meus Planos</Section.Title>
      </Section.Header>

      <Section.Container>
        {plans?.length && plans.map((currentPlan) => (
          <ListMyPlans>
            <MyPlanCard plan={currentPlan} />
          </ListMyPlans>
        ))}

        {!plans?.length && (
          <NotFoundData
            title="Não há planos aprovados"
            type="link"
            labelButton="Analisar créditos"
            href="/in/buy-credits"
          />
        )}
      </Section.Container>
    </StructureSettings>
  );
}
