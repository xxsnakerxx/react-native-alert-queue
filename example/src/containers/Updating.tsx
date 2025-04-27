/* eslint-disable react-native/no-inline-styles */

import { alert } from 'react-native-alert-queue';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import { ActivityIndicator, Text, View } from 'react-native';

export const Updating = () => {
  return (
    <Section title="Updating">
      <Button
        text="Get alert data"
        onPress={async () => {
          alert.show({
            id: 'alert_id',
            title: 'Alert',
            message: 'This is the an alert',
            buttons: [
              {
                text: 'Show data',
                hideAlertOnPress: false,
                onPress: () => {
                  const alertData = alert.getAlertData('alert_id');

                  alert.update('alert_id', {
                    title: 'Alert data',
                    renderMessage: ({ style }) => {
                      return (
                        <Text style={[style, { textAlign: 'left' }]}>
                          {JSON.stringify(alertData, null, 2)}
                        </Text>
                      );
                    },
                  });
                },
              },
            ],
          });
        }}
      />
      <Button
        onPress={() => {
          alert.show({
            id: 'fetching-data',
            title: 'Fetching data...',
            isDismissible: true,
            renderMessage: () => {
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 20,
                  }}
                >
                  <ActivityIndicator size="large" color="black" />
                  <Text>The alert will be updated in 3 seconds</Text>
                </View>
              );
            },
            buttons: [
              {
                text: 'OK',
                disabled: true,
              },
            ],
          });

          setTimeout(() => {
            alert.update('fetching-data', {
              title: 'Data fetched!',
              message: 'Data fetched successfully!',
            });
          }, 3000);
        }}
        text="Update alert"
      />
      <Button
        onPress={async () => {
          const result = await alert.confirm({
            id: 'interactive-confirm',
            hideAlertOnButtonPress: false,
          });

          if (result) {
            alert.update('interactive-confirm', {
              title: 'Great!',
              message: 'You confirmed the alert!',
            });
          } else {
            alert.update('interactive-confirm', {
              title: 'Oops!',
              message: 'You rejected the alert!',
            });
          }
        }}
        text="Interactive confirm"
      />
    </Section>
  );
};
