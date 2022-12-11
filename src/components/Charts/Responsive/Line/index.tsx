/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import { Tooltip } from '@components/Charts/utils/tooltip';
import { ResponsiveLine } from '@nivo/line';
import { GraphLineType } from '@type/lib/nivo';
import { Box } from '@components/Charts/utils/Container';
import { CSSProperties } from 'styled-components';

interface ResponsiveLineCustomProps {
  data: { id: string, data: GraphLineType[] }[]
  _containerProps?: CSSProperties
}
export default function ResponsiveLineCustom({
  data,
  _containerProps = undefined,
}: ResponsiveLineCustomProps) {
  if (!data || data?.length <= 0) return null;

  return (
    <Box style={_containerProps}>
      <ResponsiveLine
        data={data}
        margin={{
          top: 50, right: 180, bottom: 50, left: 60,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={3}
        enablePoints={false}
        pointSize={5}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-14}
        enableArea
        areaBlendMode="color-dodge"
        areaOpacity={0.1}
        useMesh
        enableCrosshair
        colors={{ scheme: 'category10' }}
        tooltip={({ point: { data: graph, borderColor } }) => (
          <Tooltip.Container>
            <Tooltip.Bullet customColor={borderColor} />
            <span>
              {graph.xFormatted}: <strong>{graph.yFormatted}</strong>
            </span>
          </Tooltip.Container>
        )}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 94,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </Box>
  );
}
