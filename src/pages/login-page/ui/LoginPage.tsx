import { Button, Form, Input } from "antd"
import classes from './styles.module.scss';
import cn from 'classnames';
import { useEffect, useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN } from "../../../app/apollo/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [login, { error, loading }]  = useMutation(LOGIN);

  const handleFinish = (values: { login: string; password: string }) => {
    login({
      variables: {
        email: values.login,
        password: values.password
      },
      onCompleted: (data) => {
        localStorage.setItem('token', data.login ? data.login.token : '');
        navigate('/classes');
      }
    })
  }

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <div className={cn(classes.wrapper)}>
      <div className={cn(classes.container)}>
        <span className={cn(classes.logo)} />
        <Form
        className={cn(classes.form)}
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        >
          <p className={cn(classes.formName)}>Войдите в свой аккаунт</p>
          <Form.Item name='login' label="Войдите в свой аккаунт" rules={[{ required: true, message: 'Пожалуста, введите логин' }, { min: 3, message: 'Логин должен содержать не менее 3 символов' }, { type: 'email', message: 'Некорректный логин'}]}>
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item name='password' label="Пароль" rules={[{ required: true, message: 'Пожалуста, введите пароль' }, { min: 3, message: 'Пароль должен содержать не менее 8 символов' }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button loading={loading} disabled={!submittable} block htmlType="submit">Продолжить</Button>
            <p className={cn(classes.errorMessage)}>{error?.message}</p>
          </Form.Item>
          <p className={cn(classes.subscription)}>Не удается войти в систему? Бывает =)</p>
        </Form>
      </div>
    </div>
  )
}