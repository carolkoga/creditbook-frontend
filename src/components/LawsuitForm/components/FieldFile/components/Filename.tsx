/* eslint-disable react/jsx-no-useless-fragment */
import { Filename } from '../styled';

/* eslint-disable react/jsx-no-undef */
interface FilenameProps {
  file: File | undefined,
  fileName: string | null,
}

export function FilenameComingAPI({ file, fileName }: FilenameProps) {
  const name = fileName?.toLowerCase()?.replace('https://squadi-creditbook.s3.amazonaws.com/', '');

  return (
    <>
      {(fileName && !file?.name) && (
        <Filename as="a" href={fileName} download={name}>
          <span>
            Arquivo escolhido:
            {' '}
          </span>
          {name}
        </Filename>
      )}
    </>
  );
}
