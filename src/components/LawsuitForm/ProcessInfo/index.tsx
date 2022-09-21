import { Direction } from '@components/Direction';
import FormGroup from '@components/FormGroup';
import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { Controller, useFormContext } from 'react-hook-form';
import { Fieldset } from '../components/Fieldset';

export default function ProcessInfoForm() {
  const { control } = useFormContext();
  return (
    <Fieldset>
      <legend>1. Dados do processo</legend>
      <Direction>
        <FormGroup
          direction="horizontal"
          label={{
            forId: 'process-number',
            title: 'Número do processo',
          }}
        >
          <Input id="process-number" />
        </FormGroup>
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="uf"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'uf',
                title: 'Estado',
              }}
            >
              <Select
                options={[{ label: 'SP', value: 'SP' }]}
                placeholder="UF"
                id="uf"
                instanceId="uf"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="city"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'city',
                title: 'Cidade',
              }}
            >
              <Select
                options={[{ label: 'Americana', value: 'Americana' }]}
                placeholder="Cidade"
                id="city"
                instanceId="city"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="tribunal"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'tribunal',
                title: 'Tribunal',
              }}
            >
              <Select
                options={[{ label: 'Teste', value: 'Teste' }]}
                placeholder="Tribunal"
                id="tribunal"
                instanceId="tribunal"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="kind"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'kind',
                title: 'Espécie',
              }}
            >
              <Select
                options={[{ label: 'Ação', value: 'Ação' }]}
                placeholder="Espécie"
                id="kind"
                instanceId="kind"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="processGender"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'processGender',
                title: 'Gênero do Processo',
              }}
            >
              <Select
                options={[{ label: 'Americana', value: 'Americana' }]}
                placeholder="Gênero do Processo"
                id="processGender"
                instanceId="processGender"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

      <Direction className="wrapper--selects">
        <Controller
          name="actionPhase"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <FormGroup
              direction="horizontal"
              label={{
                forId: 'actionPhase',
                title: 'Fase de ação',
              }}
            >
              <Select
                options={[{ label: 'Americana', value: 'Americana' }]}
                placeholder="Fase de ação"
                id="actionPhase"
                instanceId="actionPhase"
                className="selects"
                {...field}
              />
            </FormGroup>
          )}
        />
      </Direction>

    </Fieldset>
  );
}
