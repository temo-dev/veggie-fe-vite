import { useAppSelector } from '@/store';
import { switchExchange } from '@/utils/switchExchange';
import {
  Grid,
  Group,
  Text,
  Image,
  NumberInput,
  Stack,
  ActionIcon,
  Input,
  Divider,
  InputWrapper,
} from '@mantine/core';
import { IconPencilX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

interface ProductRowProps {
  item: any;
  supplier: number | null;
  handlePurchase: (value: any[]) => void;
  productPurchase: any[];
}

const formatNumber = (num: number) => (typeof num === 'number' ? num.toFixed(2) : '-');

const changePriceCif = (c: any, exchange: any, boxBase: any) => {
  const pricePc = switchExchange(c?.price_pc, c?.shipping_currency, exchange);
  const deliveryPrice = c?.price_pc
    ? switchExchange(c?.shipping_pallet_price, c?.shipping_pallet_currency, exchange) /
      c?.box_pallet
    : 0;
  const totalBox = pricePc * boxBase + deliveryPrice;
  return {
    ...c,
    price_pc: pricePc,
    price_pc_box: pricePc * boxBase,
    cif_price: c?.price_pc
      ? totalBox / boxBase
      : switchExchange(c?.cif_price, c?.shipping_currency, exchange),
    cif_price_box: c?.price_box
      ? totalBox
      : switchExchange(c?.cif_price_box, c?.shipping_currency, exchange),
    delivery_price: deliveryPrice,
  };
};

const ProductRow = (props: ProductRowProps) => {
  const { item, supplier, handlePurchase, productPurchase } = props;
  const { exchange } = useAppSelector((state) => state.product.product);
  const { price_base, price_cif } = item;
  const boxBase = price_base?.units?.find((u: any) => u?.unit_name === 'box')?.quantity ?? 0;
  const priceCif = changePriceCif(
    price_cif.find((c: any) => c.supplier_k2_id === supplier),
    exchange,
    boxBase
  );
  const priceCifBox = priceCif?.cif_price_box || 0;
  const [quantityBuy, setQuanityBuy] = useState<number>(0);
  const [quantityGift, setQuanityGift] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(priceCifBox);
  const [quantityOrder, setQuantityOrder] = useState<number>(0);
  const id = price_base?.product_k2_id;
  const boxQuantity = price_base?.stock / boxBase;

  //calculate final price
  useEffect(() => {
    if (quantityBuy > 0) {
      setFinalPrice((priceCifBox * quantityBuy) / (quantityBuy + quantityGift));
    } else {
      setFinalPrice(priceCifBox);
    }
  }, [quantityBuy, quantityGift, priceCifBox]);

  useEffect(() => {
    if (quantityOrder > 0) {
      addProduct();
    }
  }, [quantityOrder, finalPrice]);
  //logic
  const addProduct = () => {
    if (productPurchase.find((p: any) => p.id === id)) {
      const updatedProduct = productPurchase.map((p: any) => {
        if (p.id === id) {
          return {
            ...p,
            quantity: quantityOrder,
            quantity_buy: quantityBuy,
            quantity_gift: quantityGift,
            price: finalPrice,
          };
        }
        return p;
      });
      handlePurchase(updatedProduct);
    } else {
      const newProduct = {
        id: id,
        abbr: price_base?.product_abbr,
        quantity: quantityOrder,
        quantity_buy: quantityBuy,
        quantity_gift: quantityGift,
        price: finalPrice,
      };
      handlePurchase([...productPurchase, newProduct]);
    }
  };
  //render
  return (
    <Stack key={id}>
      <Grid mb={1} key={id}>
        <Grid.Col span={2}>
          <Text fw={700} size="xs">
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
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput size="xs" value={formatNumber(priceCifBox)} min={0} disabled />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            size="xs"
            defaultValue={0}
            onChange={(value) => setQuanityBuy(Number(value))}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput
            size="xs"
            defaultValue={0}
            onChange={(value) => setQuanityGift(Number(value))}
            min={0}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Input size="xs" value={formatNumber(finalPrice)} disabled />
        </Grid.Col>
        <Grid.Col span={2}></Grid.Col>
      </Grid>
      <Group>
        <InputWrapper label="Số Lượng Đặt">
          <NumberInput
            size="xs"
            value={quantityOrder}
            min={0}
            onChange={(value) => setQuantityOrder(Number(value))}
            disabled={finalPrice == 0}
          />
        </InputWrapper>
        <InputWrapper label="Tổng Tiền Đặt">
          <Text
            size="md"
            c="green"
            fw={700}
          >{`${formatNumber(quantityOrder * finalPrice)} ${exchange?.base_currency?.toUpperCase()}`}</Text>
        </InputWrapper>
      </Group>
      <Divider mb={10} />
    </Stack>
  );
};

export default ProductRow;
