import { useAppSelector } from '@/store';
import { Badge, Blockquote, Group, Stack, Tooltip, Text, Code, Divider } from '@mantine/core';
import { IconBellDollar } from '@tabler/icons-react';

interface PropInput {
  listPrice: any;
}

const ExplainZonePrice = (props: PropInput) => {
  const { exchange } = useAppSelector((state) => state.product.product);
  const { listPrice } = props;
  const rows = listPrice.map((zone: any) => {
    return (
      <Group>
        <Text size="xs">{zone?.name_zone}</Text>
        <Text size="xs">{zone?.price_detail?.currency}</Text>
        <Code block color="blue">
          {zone?.price_detail?.price_gross?.toFixed(2)}
        </Code>
        <Code block color="green">
          {zone?.price_detail?.price_net?.toFixed(2)}
        </Code>
        <Text size="xs">{`Chuyển sang ${exchange?.base_currency.toUpperCase()}`}</Text>
        <Code block color="blue">
        {zone?.price_detail?.currency == "EUR" ? (zone?.price_detail?.price_gross/exchange?.value_eur)?.toFixed(2) : (zone?.price_detail?.price_gross/exchange?.value_czk)?.toFixed(2)}
        </Code>
        <Code block color="green">
        {zone?.price_detail?.currency == "EUR" ? (zone?.price_detail?.price_net/exchange?.value_eur)?.toFixed(2) : (zone?.price_detail?.price_net/exchange?.value_czk)?.toFixed(2)}
        </Code>
      </Group>
    )
  })
  return (
    <Blockquote color="orange" icon={<IconBellDollar size={30} />}>
      <Group>
        <Text>{`Giá Gross`}</Text>
        <Code block color="blue"></Code>
        <Text>{`Giá Net`}</Text>
        <Code block color="green"></Code>
        <Text>{`Tỷ Giá`}</Text>
        <Code block color="white">
          {exchange?.base_currency.toUpperCase()}
        </Code>
      </Group>
      <Divider className="my-2" />
      <Stack>
        {rows}
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
