import { alert } from 'react-native-alert-queue';
import { Button } from '../components/Button';
import { Section } from '../components/Section';

export const Basics = () => {
  return (
    <Section title="Basics">
      <Button
        onPress={() =>
          alert.show({
            title: 'Hello',
            message: 'I am an alert',
          })
        }
        text="Show Alert"
      />
      <Button
        onPress={() =>
          alert.show({
            title: 'Hello',
            message:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'.repeat(
                20
              ),
          })
        }
        text="Show Alert with long message"
      />
      <Button
        onPress={() => {
          alert.show({
            title: 'Alert 1',
            message: 'I am an alert 1',
          });
          alert.show({
            title: 'Alert 2',
            message: 'I am an alert 2',
            buttons: [
              {
                text: 'OK',
                onPress: () => {
                  alert.success({ message: 'You pressed OK button' });
                },
              },
              {
                text: 'Cancel',
                onPress: () => {
                  alert.success({
                    message: 'You pressed Cancel button',
                  });
                },
              },
            ],
          });
        }}
        text="Show 2 Alerts"
      />
      <Button
        onPress={() => {
          alert.success({
            message: 'I am a success alert',
          });
        }}
        text="Show Success Alert"
      />
      <Button
        onPress={() => {
          alert.error(new Error('I am an error alert'));
        }}
        text="Show Error Alert"
      />
      <Button
        onPress={async () => {
          const result = await alert.confirm({
            message: 'I am a confirm dialog',
          });

          if (result) {
            alert.success({
              message: 'You pressed yes',
            });
          } else {
            alert.error(new Error('You pressed no'));
          }
        }}
        text="Show Confirm"
      />
      <Button
        onPress={async () => {
          await alert.show({
            title: 'Lorem ipsum dolor sit amet',
            message: 'I am a dismissible alert',
            isDismissible: true,
            onDismiss: () => {
              alert.success({
                message: 'You dismissed the alert',
              });
            },
            buttons: [
              {
                text: 'OK',
                onPress: () => {
                  alert.success({
                    message: 'You pressed OK button',
                  });
                },
              },
            ],
          });
        }}
        text="Show Dismissible Alert"
      />
    </Section>
  );
};
