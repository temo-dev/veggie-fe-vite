import { Badge, Blockquote, Group, Stack, Tooltip, Text, Code, Divider } from '@mantine/core';
import { IconBellDollar } from '@tabler/icons-react';

interface PropInput {
  listPrice: any;
}

const ExplainZonePrice = (props: PropInput) => {
  const { listPrice } = props;
  return (
    <Blockquote color="orange" icon={<IconBellDollar size={30} />}>
      <Group>
        <Text>{`Giá Gross`}</Text>
        <Code block color="blue"></Code>
        <Text>{`Giá Net`}</Text>
        <Code block color="green"></Code>
        <Text>{`Tỷ Giá`}</Text>
        <Code block color="green"></Code>
      </Group>
      <Divider className="my-2" />
      <Stack>
        {listPrice.map((zone: any) => (
          <Group>
            <Text size="xs">{zone?.name_zone}</Text>
            <Text size="xs">{zone?.price_detail?.currency}</Text>
            <Code block color="blue">
              {zone?.price_detail?.price_gross}
            </Code>
            <Code block color="green">
              {zone?.price_detail?.price_net}
            </Code>
            <Text size="xs">Chuyển sang czk</Text>
            <Code block color="blue">
              {111}
            </Code>
            <Code block color="green">
              {111}
            </Code>
          </Group>
        ))}
      </Stack>
    </Blockquote>
  );
};

const ZonePrice = (props: PropInput) => {
  const { listPrice } = props;
  return (
    <div className="mt-3">
      <Tooltip label={<ExplainZonePrice listPrice={listPrice} />} offset={30} position="right">
        <Badge color={'green'} fullWidth>
          Zone Giá
        </Badge>
      </Tooltip>
    </div>
  );
};

export default ZonePrice;
