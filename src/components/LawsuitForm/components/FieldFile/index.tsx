import FormGroup from '@components/FormGroup';
import { UploadSimple, X } from 'phosphor-react';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FilenameComingAPI } from './components/Filename';
import {
  ContainerInputFile, Filename, RemoveFileButton, Wrapper, WrapperFilename,
} from './styled';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  file: File | undefined,
  fileName?: string | null,
  label: string,
  error?: any,
  resetField?: () => void
}

const FieldFile = forwardRef(({
  file, fileName, label, error, resetField, ...registerField
}: IProps, ref) => (
  <Wrapper>
    <FormGroup
      direction="vertical"
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
        <WrapperFilename>
          <Filename>
            <span>
              Arquivo escolhido:
              {' '}
            </span>
            {file?.name?.toLowerCase()}

          </Filename>

          {resetField && (
          <RemoveFileButton type="button" onClick={resetField}>
            <X size={24} color="#FF2400" />
          </RemoveFileButton>
          )}
        </WrapperFilename>
        )}

        <FilenameComingAPI file={file} fileName={fileName ?? null} />
      </>
    </FormGroup>
  </Wrapper>
));

export default FieldFile;

FieldFile.defaultProps = {
  error: null,
  fileName: null,
};
