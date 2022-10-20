import FormGroup from '@components/FormGroup';
import useLawsuitForm from '@components/LawsuitForm/hooks/useLawsuitForm';
import { UploadSimple } from 'phosphor-react';
import { forwardRef, InputHTMLAttributes } from 'react';
import { ContainerInputFile, Filename, Wrapper } from './styled';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  file: File | undefined,
  fileName?: string | null,
  label: string,
  error?: any,
}

const FieldFile = forwardRef(({
  file, fileName, label, error, ...registerField
}: IProps, ref) => {
  const { formGroupDirection } = useLawsuitForm();

  return (
    <Wrapper>
      <FormGroup
        direction={formGroupDirection}
        error={error}
        label={{
          forId: registerField.name as string,
          title: label,
        }}
      >
        <>
          <ContainerInputFile htmlFor={registerField.name}>
            <input
              {...registerField}
              ref={ref as never}
              type="file"
              accept="application/pdf"
              id={registerField.name}
              multiple={false}
            />
            <UploadSimple size={30} weight="bold" />
          </ContainerInputFile>
          {file?.name && (
            <Filename>
              <span>
                Arquivo escolhido:
                {' '}
              </span>
              {file?.name?.toLowerCase()}
            </Filename>
          )}

          {(fileName && !file?.name) && (
          <Filename>
            <span>
              Arquivo escolhido:
              {' '}
            </span>
            {fileName.toLowerCase()}
          </Filename>
          )}
        </>
      </FormGroup>
    </Wrapper>
  );
});

export default FieldFile;

FieldFile.defaultProps = {
  error: null,
  fileName: null,
};
