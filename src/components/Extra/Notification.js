import { Button, notification } from 'antd';

const openNotification = (title, description, type) => {
  notification.open({
    message: title,
    type: type,
    description:
      description,
  });
};

export default openNotification;