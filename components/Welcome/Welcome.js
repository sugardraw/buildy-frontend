import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, FlatList, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { getPosts } from '../../actions';
import Home from '../Home/Home';
/* import api from '../../api/api'; */

const mapStateToProps = (state) => {
	const { posts, userLoggedIn, loading, error, post, postLoading } = state.posts;

	return { posts, userLoggedIn, loading, error, post, postLoading };
};

const mapDispatchToProps = {
	dispatchGetPosts : getPosts
};

class Welcome extends Component {
	static navigationOptions = {
		title            : 'Home',
		headerStyle      : { backgroundColor: '#173746' },
		headerTintColor  : 'white',
		headerTitleStyle : { color: 'white' }
	};

	constructor(props) {
		super(props);
		state = {
			userLoggedIn : false
		};
	}

	componentDidMount() {
		this.props.dispatchGetPosts();

		console.log('welcome', this.props.dispatchGetPosts());
	}

	keyExtractor = (item, index) => String(item._id);
	renderItem = ({ item }) => {
		return (
			<TouchableWithoutFeedback>
				<Card title={item.name}>
					<Image style={{ width: 300, height: 300 }} source={{ uri: 'http:10.0.1.130:3001' + item.avatar }} />
					<View>
						<Text>{item.email}</Text>

						<Button
							backgroundColor="#03A9F4"
							buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
							title="READ MORE"
							onPress={() => this.props.navigation.navigate('Profile')}
						/>
					</View>
				</Card>
			</TouchableWithoutFeedback>
		);
	};

	render() {
		const error = this.props.error;
		if (this.props.userLoggedIn) {
			return <Home />;
		} else {
			if (error) {
				return <Text>{error}</Text>;
			} else {
				return (
					<View style={styles.container}>
						<FlatList
							contentContainerStyle={{ flexGrow: 1 }}
							data={this.props.posts}
							keyExtractor={this.keyExtractor}
							renderItem={this.renderItem}
						/>
					</View>
				);
			}
		}
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#DCDCDC'
	},
	card      : {
		backgroundColor   : '#fff',
		padding           : 8,
		margin            : 12,
		borderWidth       : 1,
		borderRadius      : 2,
		borderColor       : '#ddd',
		borderBottomWidth : 0,
		shadowColor       : '#000',
		shadowOffset      : { width: 0, height: 2 },
		shadowOpacity     : 0.1,
		shadowRadius      : 2
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
