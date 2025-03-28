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
          <Grid.Col span={8}><CardReport /></Grid.Col>
        </Grid>
      </Stack>
    </div>
  );
};

export default DashBoardPage;
