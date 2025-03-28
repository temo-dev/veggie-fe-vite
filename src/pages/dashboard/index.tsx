import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import CardReport from '@/container/Card/CardReportTotal';
import { Grid, Stack } from '@mantine/core';

const DashBoardPage = () => {
  return (
    <div>
      <Stack>
      <CardReport/>
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
