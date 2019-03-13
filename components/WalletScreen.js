import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';
import Screen from './Screen';

const WalletScreen = () => {
	return (
		<Screen style={styles.walletCardWrap}>
			<View style={styles.card}>
				<Text>Cards</Text>
			</View>
		</Screen>
	);
};

WalletScreen.defaultProps = {
	wallets : []
};

const styles = StyleSheet.create({
	walletCardWrap : {
		...StyleSheet.absoluteFillObject,
		zIndex          : 1,
		backgroundColor : 'rgba(100, 100, 100, 0.8)'
	},
	card           : {
		alignItems      : 'center',
		justifyContent  : 'center',
		borderRadius    : 6,
		backgroundColor : '#fff',
		marginVertical  : 8,
		padding         : 24,
		shadowColor     : '#000',
		shadowOpacity   : 0.15,
		shadowRadius    : 10,
		shadowOffset    : { width: 0, height: 4 }
	}
});

export default withNavigation(WalletScreen);
