import { Oval } from 'react-loader-spinner';

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <Oval
      height={120}
      width={120}
      color="#150882"
      visible={loading}
      ariaLabel="oval-loading"
      secondaryColor="#150882"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
