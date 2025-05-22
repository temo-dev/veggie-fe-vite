import React, { useEffect, useRef, useState } from 'react';
import { useFindProductsCif } from '@/services/react-query/cif/use-find-product-cif';
import { convertTime } from '@/utils/convertTime';
import {
  ActionIcon,
  Collapse,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconCircuitResistor,
  IconShoppingBagPlus,
} from '@tabler/icons-react';
import { useScrollIntoView, useWindowScroll } from '@mantine/hooks';

interface PropsInterface {
  exchange: any;
}

const ActionButtons = () => (
  <Group>
    <ActionIcon variant="filled">
      <IconShoppingBagPlus style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
    <ActionIcon variant="filled">
      <IconCircuitResistor style={{ width: '70%', height: '70%' }} stroke={1.5} />
    </ActionIcon>
  </Group>
);

const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const TableCif: React.FC<PropsInterface> = ({ exchange }) => {
  const PAGE_SIZE = 20; // items per fetch
  const [offset, setOffset] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [openedRows, setOpenedRows] = useState<Record<string, boolean>>({});
  const { data: result, status, isFetching } = useFindProductsCif('', offset);

  // on data load, append
  useEffect(() => {
    if (status === 'success' && result?.data) {
      const newData = result?.data;
      setItems((prev) => [...prev, ...newData]);
      // if fewer than page size, no more
      setHasMore(false);
    }
  }, [result, status]);

  // load more handler
  const fetchMore = () => {
    setOffset((prev) => prev + 1);
    setHasMore(true);
  };

  // toggle details row
  const toggleRow = (id: string) => {
    setOpenedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // render rows from accumulated items
  const rows = items.map((item: any) => {
    const { price_base, price_cif } = item;
    const id = price_base?.product_k2_id;
    const opened = openedRows[id] || false;
    const boxBase = price_base?.units.find((u: any) => u.unit_name === 'box')?.quantity ?? 0;
    const boxQuantity = price_base?.stock / boxBase;
    const sortedPriceCif = price_cif.slice().sort((a: any, b: any) => a.cif_price - b.cif_price);

    const switchExchange = (value: number, currency: string) => {
      let price = 0;
      switch (currency) {
        case 'czk':
          price = value / exchange?.value_czk;
          break;
        case 'usd':
          price = value / exchange?.value_usd;
          break;
        case 'eur':
          price = value / exchange?.value_eur;
          break;
        case 'thb':
          price = value / exchange?.value_th;
          break;
        case 'krw':
          price = value / exchange?.value_kr;
          break;
        default:
          price = value / exchange?.value_czk;
          break;
      }
      return price;
    };
    const newCifPrice = sortedPriceCif.map((c: any) => {
      const pricePc = switchExchange(c.price_pc, c.shipping_currency);
      const deliveryPrice =
        switchExchange(c.shipping_pallet_price, c.shipping_pallet_currency) / c.box_pallet;
      const totalBox = pricePc * boxBase + deliveryPrice;
      return {
        ...c,
        price_pc: pricePc,
        price_pc_box: pricePc * boxBase,
        cif_price: totalBox / boxBase,
        cif_price_box: totalBox,
        delivery_price: deliveryPrice,
      };
    });
    return (
      <React.Fragment key={id}>
        <Stack pb={5}>
          <Grid p={5} mb={2} mt={2}>
            <Grid.Col span={2}>
              <Group>
                <Image
                  src={price_base?.image_url || '/logo/logo-text-1.svg'}
                  w={50}
                  h={50}
                  radius="md"
                  fit="contain"
                />
                <Stack justify="center">
                  <Text fw={700}>{price_base?.product_abbr}</Text>
                  <Text
                    td={boxQuantity <= 0.9 ? 'line-through' : undefined}
                    c={boxQuantity <= 0.9 ? 'red' : undefined}
                  >{`${boxQuantity.toFixed(1)} thùng ${boxBase}`}</Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700}>{newCifPrice[0]?.supplier_name}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{formatNumber(newCifPrice[0]?.delivery_price)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{formatNumber(newCifPrice[0]?.price_pc)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{formatNumber(newCifPrice[0]?.price_pc_box)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{formatNumber(newCifPrice[0]?.cif_price)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{formatNumber(newCifPrice[0]?.cif_price_box)}</Text>
            </Grid.Col>
            <Grid.Col span={1}>
              <Text fw={700}>{convertTime(newCifPrice[0]?.effective_from)}</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Group>
                <ActionButtons />
                {newCifPrice.length > 1 && (
                  <ActionIcon variant="light" onClick={() => toggleRow(id)}>
                    {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                  </ActionIcon>
                )}
              </Group>
            </Grid.Col>
          </Grid>
          <Collapse in={opened}>
            {newCifPrice.slice(1).map((c: any, key: number) => (
              <Grid key={key}>
                <Grid.Col span={2} />
                <Grid.Col span={2}>
                  <Text fw={500}>{c.supplier_name}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{formatNumber(c.delivery_price)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{formatNumber(c.price_pc)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{formatNumber(c.price_pc_box)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{formatNumber(c.cif_price)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{formatNumber(c.cif_price_box)}</Text>
                </Grid.Col>
                <Grid.Col span={1}>
                  <Text fw={500}>{convertTime(c.effective_from)}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <ActionButtons />
                </Grid.Col>
              </Grid>
            ))}
          </Collapse>
        </Stack>
        <Divider />
      </React.Fragment>
    );
  });

  return (
    <div style={{ width: '100%', height: 800 }}>
      <ScrollArea onBottomReached={fetchMore} h={800} style={{ width: '100%', height: '100%' }}>
        <LoadingOverlay
          visible={hasMore}
          zIndex={1000}
          overlayProps={{ radius: 'md', blur: 2 }}
          loaderProps={{ color: 'green', type: 'bars' }}
        />
        <Grid bg="green.8" c="white" p={5} mb={2}>
          <Grid.Col span={2}>
            <Text fw={700}>Mã Hàng</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text fw={700}>Nhà Cung Cấp</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Giá Vận Chuyển</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Giá Nhập</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Giá Thùng</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Giá CIF</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Giá CIF Box</Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700}>Ngày Áp Dụng</Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text fw={700}>Thao Tác</Text>
          </Grid.Col>
        </Grid>
        {rows}
      </ScrollArea>
    </div>
  );
};

export default TableCif;
