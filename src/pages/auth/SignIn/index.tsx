import React, {useState} from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title, Text,
} from '@mantine/core';
import classes from './index.module.css';
import * as yup from 'yup';
import {useForm, yupResolver} from "@mantine/form";
import useAuth from "@/utils/hooks/useAuth";

export default function SignInPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const {signIn} = useAuth()
  const schema = yup.object().shape({
    account: yup
      .string()
      .required('Please enter a name account'),
    password: yup
      .string()
      .required('Please enter a password')
  });

  const form = useForm({
    initialValues: {
      account: 'admin',
      password: 'admin',
    },
    validate: yupResolver(schema),
  });

  async function handleSubmit(values: { account: string, password: string }) {
    setLoading(true)
    try {
      console.log('values-1',values)
      const res = await signIn(values)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
              Welcome to Veggie System Application
            </Title>
            <TextInput {...form.getInputProps('account')} name={'account'} label="Account Name" withAsterisk
                      placeholder="admin" size="md"/>
            <PasswordInput {...form.getInputProps('password')} name={'password'} label="Password"
                          placeholder="admin" mt="md" size="md"/>
            <Button loading={loading} type={'submit'} fullWidth mt="xl" size="md">
              Login
            </Button>
          </Paper>
        </div>
      </form>
    </div>
  );
}
