import ExchangeChart from '@/components/Report/ExchangeChart';
import LineExChangeChart from '@/components/Report/LineExChangeChart';
import TotalCategoryPieChart from '@/components/Report/TotalCategoryPieChart';
import CardReport from '@/container/Card/CardReportTotal';
import { Grid, Stack } from '@mantine/core';

const DashBoardPage = () => {
  return (
    <div>
      <Stack>
        <Grid>
          <Grid.Col span={4}>
            <TotalCategoryPieChart />
          </Grid.Col>
          <Grid.Col span={4}>
          <LineExChangeChart/>
          </Grid.Col>
          <Grid.Col span={4}>
            <ExchangeChart/>
          </Grid.Col>
        </Grid>
        <CardReport />
      </Stack>
    </div>
  );
};

export default DashBoardPage;
