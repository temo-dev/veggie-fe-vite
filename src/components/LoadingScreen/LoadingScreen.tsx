import {Center, Loader, Stack} from "@mantine/core";
import classes from './LoadingScreen.module.css'

export default function LoadingScreen() {
  return (
    <div className={classes.loadingScreenBackground}>
       <Stack gap="md">
        <img alt={'Veggie Logo'} src={'/logo/logo-text-1.svg'}/>
        <Loader style={{alignSelf:'center'}} color="green" type="bars" className="mt-5"/>
      </Stack>
    </div>
  )
}
