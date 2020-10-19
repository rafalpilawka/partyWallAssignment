import React, {ReactElement, ReactNode} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {styles} from 'src/components/Form/styles';

type TProps = {
  children?: ReactNode;
};

export const Form = ({children}: TProps): ReactElement => {
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.flex}
      behavior={Platform.select({ios: 'padding', android: undefined})}
      enabled
      keyboardVerticalOffset={Platform.select({ios: 0, android: undefined})}
      style={styles.spacing}>
      {children}
    </KeyboardAvoidingView>
  );
};
