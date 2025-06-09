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
  Pagination,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBasketPlus,
  IconChevronDown,
  IconChevronUp,
  IconCircuitResistor,
  IconShoppingBagPlus,
} from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import FormOrderPurchase from '@/components/Form/FormOrderPurchase';
import LineChartHistoryCifPrice from '@/components/Report/LineChartHistoryCifPrice';
import { usePurchaseState } from '@/utils/hooks/usePurchase';

interface PropsInterface {
  exchange: any;
  items: any;
}

const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const TableCif: React.FC<PropsInterface> = ({ exchange, items }) => {
  const [openedRows, setOpenedRows] = useState<Record<string, boolean>>({});
  const { addPurchase } = usePurchaseState();

  // toggle details row
  const toggleRow = (id: string) => {
    setOpenedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  //purchase product
  const handleAddPurchase = (product: any) => {
    addPurchase(product);
  };

  // render rows from accumulated items
  const rows = items
    .sort((a: any, b: any) => a?.price_base?.product_abbr - b?.price_base?.product_abbr)
    .map((item: any) => {
      const { price_base, price_cif } = item;
      const id = price_base?.product_k2_id;
      const opened = openedRows[id] || false;
      const boxBase = price_base?.units.find((u: any) => u.unit_name === 'box')?.quantity ?? 0;
      const boxQuantity = price_base?.stock / boxBase;
      const sortedPriceCif = price_cif.slice().sort((a: any, b: any) => a.cif_price - b.cif_price);
      const switchExchange = (value: number, currency: string) => {
        let price = 0;
        if (value !== null) {
          switch (currency.toLowerCase()) {
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
            case 'sek':
              price = value / exchange?.value_sek;
              break;
            default:
              price = value / exchange?.value_czk;
              break;
          }
        }
        return price;
      };
      const newCifPrice = sortedPriceCif.map((c: any) => {
        const pricePc = switchExchange(c.price_pc, c.shipping_currency);
        const deliveryPrice = c.price_pc
          ? switchExchange(c.shipping_pallet_price, c.shipping_pallet_currency) / c.box_pallet
          : 0;
        const totalBox = pricePc * boxBase + deliveryPrice;
        return {
          ...c,
          price_pc: pricePc,
          price_pc_box: pricePc * boxBase,
          cif_price: c.price_pc
            ? totalBox / boxBase
            : switchExchange(c.cif_price, c.shipping_currency),
          cif_price_box: c.price_box
            ? totalBox
            : switchExchange(c.cif_price_box, c.shipping_currency),
          delivery_price: deliveryPrice,
        };
      });
      return (
        <React.Fragment key={id}>
          <Stack pb={5}>
            <Grid p={5} mb={2} mt={2} style={{ minHeight: 80 }}>
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
                <Text fw={700}>{formatNumber(newCifPrice[0]?.box_pallet)}</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Text fw={700}>{convertTime(newCifPrice[0]?.effective_from)}</Text>
              </Grid.Col>
              <Grid.Col span={1}>
                <Group>
                  <Group>
                    {price_cif.length > 0 && (
                      <>
                        <ActionIcon variant="filled" onClick={() => handleAddPurchase(item)}>
                          <IconBasketPlus size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="filled"
                          onClick={() =>
                            modals.open({
                              title: (
                                <Title
                                  order={6}
                                >{`Theo Dõi Giá CIF Theo ${exchange?.base_currency.toUpperCase()}`}</Title>
                              ),
                              children: <LineChartHistoryCifPrice productId={id} />,
                              size: 'xl',
                            })
                          }
                        >
                          <IconCircuitResistor
                            style={{ width: '70%', height: '70%' }}
                            stroke={1.5}
                          />
                        </ActionIcon>
                      </>
                    )}
                  </Group>
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
                    <Text fw={500}>{formatNumber(c.box_pallet)}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}>
                    <Text fw={500}>{convertTime(c.effective_from)}</Text>
                  </Grid.Col>
                  <Grid.Col span={1}></Grid.Col>
                </Grid>
              ))}
            </Collapse>
          </Stack>
          <Divider />
        </React.Fragment>
      );
    });

  return (
    <Stack style={{ width: '100%', height: '100%' }}>
      <Stack className="sticky -top-10 bg-white">
        <Grid bg="green.8" c="white" p={5} mb={2}>
          <Grid.Col span={2}>
            <Text fw={700} size="xs">
              Mã Hàng
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Text fw={700} size="xs">
              Nhà Cung Cấp
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Giá Vận Chuyển
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Giá Nhập
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Giá Thùng
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Giá CIF
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Giá CIF Box
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Box Pallet
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Ngày Áp Dụng
            </Text>
          </Grid.Col>
          <Grid.Col span={1}>
            <Text fw={700} size="xs">
              Thao Tác
            </Text>
          </Grid.Col>
        </Grid>
      </Stack>
      <Stack>{rows}</Stack>
    </Stack>
  );
};

export default TableCif;
