import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import { Grid, Stack } from '@mantine/core';

const DashBoardPage = () => {
  return (
    <div>
      <Stack>
        <Grid>
                  <Grid.Col span={4}>
                    <TotalCategoryPieChart />
                  </Grid.Col>
                  <Grid.Col span={4}>{/* <LineProductChart title="Giá Hàng Hóa Nhập" /> */}</Grid.Col>
                  <Grid.Col span={4}>{/* <LineProductChart title="Giá Hàng Hóa Nhập" /> */}</Grid.Col>
                </Grid>
      </Stack>
    </div>
  );
};

export default DashBoardPage;
