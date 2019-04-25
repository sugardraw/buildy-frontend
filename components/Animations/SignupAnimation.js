import React from 'react';
import { View, StyleSheet, Text, Animated, AsyncStorage } from 'react-native';
import { Svg } from 'expo'; // Supported builtin module
const { Line, G, Path } = Svg;
import { Font } from 'expo';

export default class SignupAnimation extends React.Component {
	static navigationOptions = {
		headerMode        : 'none',
		navigationOptions : {
			headerVisible : false
		}
	};
	constructor() {
		super();
		this.state = {
			_lineOne    : new Animated.Value(5),
			_fontLoaded : false
		};
	}

	invokeAnimation = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(this.state._lineOne, {
					toValue  : 2,
					duration : 800
				}),
				Animated.timing(this.state._lineOne, {
					toValue  : 5,
					duration : 800
				})
			]),
			{
				iterations : 2
			}
		).start(async () => {
			let tokenStorage = await AsyncStorage.getItem('id_token');
			this.props.navigation.navigate('Welcome', {
				changeScreen : 1,
				id_token     : tokenStorage,
				avatar       : this.props.navigation.getParam('avatar')
			});
		});
	};

	async componentDidMount() {
		await Font.loadAsync({
			'Roboto-Medium' : require('../../assets/fonts/Roboto-Medium.ttf')
		});
		this.setState({ _fontLoaded: true });

		this.state._lineOne.addListener((progress) => {
			this._lineOne.setNativeProps({
				strokeWidth : progress.value.toString()
			});
		});
		this.invokeAnimation();
	}

	render() {
		return (
			<View style={styles.container}>
				<Svg
					height="25%"
					width="25%"
					viewBox="0 0 50 50"
					enableBackground="new 0 0 48.31 53.22"
					xmlSpace="preserve"
				>
					<G>
						<Path
							stroke="white"
							strokeWidth={2}
							strokeLinecap="round"
							ref={(ref) => (this._lineOne = ref)}
							fill="#85c4ea"
							d="M36.29,53.22c-0.47,0-0.94-0.16-1.31-0.48l-11.2-9.35H2.05C0.92,43.4,0,42.48,0,41.35V14.42
		c0-0.64,0.3-1.24,0.81-1.63L22.92,0.42c0.73-0.56,1.74-0.56,2.48,0L47.5,12.79c0.51,0.39,0.81,0.99,0.81,1.63v26.92
		c0,1.13-0.92,2.05-2.05,2.05h-7.93v7.78c0,0.79-0.46,1.52-1.18,1.85C36.88,53.16,36.58,53.22,36.29,53.22z M4.09,39.3h20.24
		c0.48,0,1.12,0.17,1.49,0.48l8.41,7.02v-5.45c0-1.13,0.92-2.05,2.05-2.05h7.93V15.44L24.33,4.62L4.09,15.44V39.3L4.09,39.3z"
						/>
					</G>
				</Svg>

				{this.state._fontLoaded ? (
					<Text
						style={{
							fontFamily     : 'Roboto-Medium',
							fontSize       : 26,
							color          : '#85c4ea',
							justifyContent : 'center',
							alignContent   : 'center'
						}}
					>
						YOU SIGNED UP
					</Text>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex           : 1,
		alignItems     : 'center',
		justifyContent : 'center',
		padding        : 10
	}
});
