import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState(''); // State for phone number input
  const [otp, setOtp] = useState(''); // State for OTP input
  const [isOtpPage, setIsOtpPage] = useState(false); // State to track if OTP page is shown
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [otpErrorMessage, setOtpErrorMessage] = useState(''); // State for OTP error message
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me" toggle
  const [timer, setTimer] = useState(60); // Timer for OTP resend
  const [isTimerActive, setIsTimerActive] = useState(false); // Timer state to handle resend button

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false); // Resend OTP button is now active
    }

    return () => clearInterval(interval); // Cleanup the interval when the component is unmounted or timer is 0
  }, [isTimerActive, timer]);

  // Function to handle phone number input
  const handlePhoneNumberChange = (text) => {
    // Only allow digits in the input
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
  };

  // Function to handle OTP input
  const handleOtpChange = (text) => {
    setOtp(text);
  };

  // Function to handle form submission or validation for phone number
  const handlePhoneSubmit = () => {
    if (phoneNumber.length < 10) {
      setErrorMessage('Please fill complete number');
    } else {
      setErrorMessage('');
      setIsOtpPage(true); // Show OTP page if phone number is valid
      console.log('Phone number:', phoneNumber);
      // You would also send the phone number to the backend to send OTP
    }
  };

  // Function to verify OTP
  const handleOtpSubmit = () => {
    if (otp.length < 5) {
      setOtpErrorMessage('Please enter a valid OTP');
    } else {
      setOtpErrorMessage('');
      // Here, you would verify the OTP with the backend
      console.log('OTP submitted:', otp);
      // If OTP is valid, proceed with further actions (e.g., navigation to the main app screen)
    }
  };

  // Function to handle the "Wrong Number" button click
  const handleWrongNumber = () => {
    setIsOtpPage(false); // Go back to the phone number input page
    setPhoneNumber(''); // Reset phone number input
  };

  // Function to handle Resend OTP button click
  const handleResendOtp = () => {
    setTimer(60); // Reset timer
    setIsTimerActive(true); // Start the timer
    console.log('OTP resent to:', phoneNumber); // You would trigger the resend OTP action here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Logo</Text>

      {!isOtpPage ? (
        <>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputField}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric"
              maxLength={10} // Limit input to 10 digits
              placeholder="Enter phone number"
            />
          </View>

          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

          <View style={styles.rememberMeWrapper}>
            <Text style={styles.rememberMeText}>Remember Me</Text>
            <TouchableOpacity
              style={[styles.toggle, rememberMe && styles.toggleActive]}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.toggleCircle, rememberMe && styles.toggleCircleActive]} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handlePhoneSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleWrongNumber} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter Verification Code</Text>
          <Text style={styles.otpInfoText}>
            OTP is sent to phone number: {phoneNumber}
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.inputField}
              value={otp}
              onChangeText={handleOtpChange}
              keyboardType="numeric"
              maxLength={6} // OTP is usually 6 digits
              placeholder="Enter OTP"
            />
          </View>

          {otpErrorMessage ? <Text style={styles.errorMessage}>{otpErrorMessage}</Text> : null}

          <TouchableOpacity onPress={handleOtpSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleWrongNumber} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Wrong Number?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResendOtp}
            style={[styles.resendButton, !isTimerActive && styles.resendButtonActive]}
            disabled={isTimerActive}
          >
            <Text style={styles.resendButtonText}>
              {isTimerActive ? `Resend in ${timer}s` : 'Resend OTP'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#808080',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#C4C8C4',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    height: 45,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  rememberMeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0A0A0A',
    marginRight: 10,
  },
  toggle: {
    width: 50,
    height: 25,
    backgroundColor: '#E5E9E5',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 3,
  },
  toggleActive: {
    backgroundColor: '#249F58',
  },
  toggleCircle: {
    width: 18,
    height: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    position: 'absolute',
    left: 3,
  },
  toggleCircleActive: {
    left: 27,
  },
  submitButton: {
    backgroundColor: '#005153',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 37,
    marginBottom: 10,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  skipButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  skipButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#249F58',
    textDecorationLine: 'underline',
  },
  otpInfoText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#808080',
    textAlign: 'center',
    marginBottom: 20,
  },
  resendButton: {
    backgroundColor: '#E5E9E5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 37,
    marginTop: 10,
  },
  resendButtonActive: {
    backgroundColor: '#249F58',
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0A0A0A',
  },
});

export default LoginPage;
