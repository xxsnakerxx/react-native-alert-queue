/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

import { alert } from 'react-native-alert-queue';
import { Button } from '../components/Button';
import { Section } from '../components/Section';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { DangerIcon } from '../components/icons/Danger';

export const Customizations = () => {
  return (
    <Section title="Customizations">
      <Button
        onPress={() =>
          alert.show({
            title: 'Hello',
            message: 'Message',
            icon: DangerIcon,
            beforeTitleSlot: () => (
              <Slot
                text="Before title slot"
                style={{
                  marginBottom: 10,
                }}
              />
            ),
            beforeMessageSlot: () => (
              <Slot
                text="Before message slot"
                style={{
                  marginBottom: 20,
                }}
              />
            ),
            beforeButtonsSlot: () => (
              <Slot
                text="Before buttons slot"
                style={{
                  marginBottom: 20,
                }}
              />
            ),
            afterButtonsSlot: () => <Slot text="After buttons slot" />,
          })
        }
        text="Slots"
      />
      <Button
        onPress={() =>
          alert.show({
            renderTitle: ({ style }) => (
              <Text style={[style, { color: 'red', fontSize: 28 }]}>
                Custom title
              </Text>
            ),
          })
        }
        text="Custom title"
      />
      <Button
        onPress={() =>
          alert.show({
            title: 'Custom message',
            renderMessage: ({ style }) => (
              <Text
                style={[
                  style,
                  {
                    color: 'red',
                    fontSize: 28,
                    lineHeight: 32,
                    textAlign: 'left',
                  },
                ]}
              >
                {'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'.repeat(
                  20
                )}
              </Text>
            ),
          })
        }
        text="Custom message"
      />
      <Button
        onPress={() =>
          alert.show({
            title: 'Custom icon',
            icon: DangerIcon,
            iconColor: 'red',
            iconSize: 150,
          })
        }
        text="Custom icon"
      />
      <Button
        onPress={() =>
          alert.show({
            title: 'Custom dismiss button',
            isDismissible: true,
            renderDismissButton: ({ onPress }) => (
              <Pressable
                onPress={onPress}
                style={{ position: 'absolute', right: 16, top: 16 }}
              >
                <Text style={{ color: 'red', fontSize: 16 }}>❌</Text>
              </Pressable>
            ),
          })
        }
        text="Custom dismiss button"
      />
    </Section>
  );
};

const Slot = ({
  text,
  style,
}: {
  text: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={StyleSheet.compose(styles.slot, style)}>
      <Text style={styles.slotText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slot: {
    backgroundColor: 'black',
    padding: 10,
  },
  slotText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
