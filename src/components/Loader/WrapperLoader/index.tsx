import { Direction } from '@components/Direction';
import Loader from '..';

export default function WrapperLoader() {
  return (
    <Direction
      alignItems="center"
      justifyContent="center"
      style={{
        height: '60vh',
        minHeight: 332,
      }}
    >
      <Loader loading />
    </Direction>
  );
}
